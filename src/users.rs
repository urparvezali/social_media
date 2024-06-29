use std::sync::Arc;

use axum::{
    extract::{Path, State},
    Json,
};
use mongodb::{
    bson::{doc, oid::ObjectId},
    Database,
};
use tokio::sync::Mutex;

use crate::types::{User, UserForm};

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
        "_id": ObjectId::new(),
        "username": usr.username,
        "email": usr.email,
        "password": usr.password,
        "gender": usr.gender,
    };
    users.insert_one(usr_doc, None).await.unwrap();
}
