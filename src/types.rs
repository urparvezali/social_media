use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct User {
    pub _id: String,
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
    pub _id: String,
    pub username: String,
    pub body: String,
    pub lovers: Vec<String>,
}
#[derive(Serialize, Deserialize, Debug)]
pub struct PostForm {
    pub username: String,
    pub body: String,
}
#[derive(Serialize, Deserialize, Debug)]
pub struct Loving {
    pub _id: String,
    pub lover: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Auth {
    pub username: String,
    pub password: String,
}
