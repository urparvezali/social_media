use std::sync::Arc;

use axum::{
    extract::{Path, State},
    response::IntoResponse,
    Json,
};
use mongodb::{
    bson::{doc, oid::ObjectId},
    Database,
};
use tokio::sync::Mutex;

use crate::types::{Auth, User, UserForm};

pub async fn get_user(
    State(db): State<Arc<Mutex<Database>>>,
    Path(username): Path<String>,
) -> Json<User> {
    let filter = doc! {"username": username.clone()};
    let users = db.lock().await.collection("users");
    let cur = users.find_one(filter, None).await.unwrap();
    Json(cur.unwrap())
}

pub async fn add_user(State(db): State<Arc<Mutex<Database>>>, Json(usr): Json<UserForm>) {
    let users = db.lock().await.collection("users");
    let usr_doc = doc! {
        "_id": ObjectId::new().to_hex(),
        "username": usr.username,
        "email": usr.email,
        "password": usr.password,
        "gender": usr.gender,
    };
    users.insert_one(usr_doc, None).await.unwrap();
}

pub async fn get_auth(
    State(db): State<Arc<Mutex<Database>>>,
    Json(auth): Json<Auth>,
) -> impl IntoResponse {
    let filt = doc! {
        "username": auth.username,
        "password": auth.password,
    };

    let users = db.lock().await.collection("users");
    let res = users.find_one(filt, None).await.unwrap();
    if res.is_none() {
        return "".to_string();
    }
    res.unwrap()
}
