use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct User {
    pub _id: ObjectId,
    pub username: String,
    pub email: String,
    pub password: String,
    pub gender: String,
}
#[derive(Serialize, Deserialize, Debug)]
pub struct UserForm {
    pub username: String,
    pub email: String,
    pub password: String,
    pub gender: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Post {
    pub _id: ObjectId,
    pub user: String,
    pub body: String,
    pub lovers: Vec<String>,
}
#[derive(Serialize, Deserialize, Debug)]
pub struct PostForm {
    pub user: String,
    pub body: String,
}
#[derive(Serialize, Deserialize, Debug)]
pub struct Loving {
    pub post_id: ObjectId,
    pub lover: String,
}
