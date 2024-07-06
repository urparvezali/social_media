use std::sync::Arc;

use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use mongodb::{
    bson::{doc, oid::ObjectId, Document},
    Collection, Database,
};
use tokio::sync::Mutex;

use crate::types::{Loving, Post, PostForm};

pub async fn get_posts(State(db): State<Arc<Mutex<Database>>>) -> Json<Vec<Post>> {
    let posts = db.lock().await.collection("posts");
    let mut c = posts.find(None, None).await.unwrap();
    let mut vec = Vec::new();

    while c.advance().await.unwrap() {
        let x = c.deserialize_current().unwrap();
        vec.push(x);
    }
    Json(vec)
}
pub async fn get_user_posts(
    State(db): State<Arc<Mutex<Database>>>,
    Path(username): Path<String>,
) -> Json<Vec<Post>> {
    let posts = db.lock().await.collection("posts");
    let filt = doc! {"username":username};
    let mut c = posts.find(filt, None).await.unwrap();
    let mut vec = Vec::new();

    while c.advance().await.unwrap() {
        let x = c.deserialize_current().unwrap();
        vec.push(x);
    }
    Json(vec)
}

pub async fn add_post(
    State(db): State<Arc<Mutex<Database>>>,
    Json(pst): Json<PostForm>,
) -> impl IntoResponse {
    let docu = doc! {
        "_id": ObjectId::new().to_hex(),
        "username": pst.username,
        "body": pst.body,
        "lovers": Vec::<String>::new(),
    };
    let posts = db.lock().await.collection("posts");
    match posts.insert_one(docu, None).await {
        Ok(_) => StatusCode::OK,
        Err(_) => StatusCode::BAD_REQUEST,
    }
}

pub async fn enlove(State(db): State<Arc<Mutex<Database>>>, Json(lvng): Json<Loving>) {
    let filt = doc! {
        "_id": lvng._id,
    };
    let val = doc! {
        "$push": {"lovers": lvng.lover}
    };
    let posts: Collection<Document> = db.lock().await.collection("posts");
    posts.update_one(filt, val, None).await.unwrap();
}

pub async fn dislove(State(db): State<Arc<Mutex<Database>>>, Json(lvng): Json<Loving>) {
    let posts: Collection<Document> = db.lock().await.collection("posts");
    let filt = doc! {"_id": lvng._id,};
    let val = doc! {
        "$pull": {
            "lovers": lvng.lover
        },
    };
    posts.update_one(filt, val, None).await.unwrap();
}
