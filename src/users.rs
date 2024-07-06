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
use serde_json::json;
use tokio::sync::Mutex;

use crate::types::{Auth, UserForm};

pub async fn get_user_info(
    State(db): State<Arc<Mutex<Database>>>,
    Path(username): Path<String>,
) -> impl IntoResponse {
    let filter = doc! {"username": username.clone()};
    let users: Collection<Document> = db.lock().await.collection("users");
    match users.find_one(filter, None).await {
        Ok(Some(usr)) => (StatusCode::OK, Json(json!(usr))),
        Ok(None) => (
            StatusCode::NOT_FOUND,
            Json(json!({"error":"User not found"})),
        ),
        Err(_) => (
            StatusCode::BAD_REQUEST,
            Json(json!({"error":"Can't request user data"})),
        ),
    }
}

pub async fn add_user(
    State(db): State<Arc<Mutex<Database>>>,
    Json(usr): Json<UserForm>,
) -> impl IntoResponse {
    let users = db.lock().await.collection("users");
    let usr_doc = doc! {
        "_id": ObjectId::new().to_hex(),
        "username": usr.username.clone(),
        "email": usr.email,
        "password": usr.password,
        "gender": usr.gender,
    };
    match users.find_one(doc! {"username":usr.username}, None).await {
        Ok(Some(_)) => StatusCode::CONFLICT,
        Ok(None) => match users.insert_one(usr_doc, None).await {
            Ok(_) => StatusCode::OK,
            Err(_) => StatusCode::INTERNAL_SERVER_ERROR,
        },
        Err(_) => StatusCode::INTERNAL_SERVER_ERROR,
    }
}

pub async fn get_auth(
    State(db): State<Arc<Mutex<Database>>>,
    Json(auth): Json<Auth>,
) -> StatusCode {
    let filt = doc! {
        "username": auth.username,
        "password": auth.password,
    };

    let users: Collection<Document> = db.lock().await.collection("users");
    match users.find_one(filt, None).await {
        Ok(Some(_)) => StatusCode::OK,
        Ok(None) => StatusCode::NOT_FOUND,
        Err(_) => StatusCode::BAD_REQUEST,
    }
}
// pub async fn get_auth(
//     State(db): State<Arc<Mutex<Database>>>,
//     Json(auth): Json<Auth>,
// ) -> impl IntoResponse {
//     let filt = doc! {
//         "username": auth.username,
//         "password": auth.password,
//     };

//     let users = db.lock().await.collection("users");
//     match users.find_one(filt, None).await {
//         Ok(opt) => {
//             match opt {
//                 Some(doc) => {
//                     // Deserialize BSON to User
//                     match bson::from_document::<User>(doc) {
//                         Ok(user) => Json(json!(user)),
//                         Err(_) => Json(json!({"error": "Failed to deserialize user"})),
//                     }
//                 }
//                 None => Json(json!({"error": "User not found"})),
//             }
//         }
//         Err(e) => Json(json!({"error": e.to_string()})),
//     }
// }
