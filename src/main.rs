pub mod db;
pub mod posts;
pub mod types;
pub mod users;

use std::sync::Arc;

use axum::{
    routing::{get, post},
    serve, Router,
};
use tokio::{net::TcpListener, sync::Mutex};
use tower_http::cors::{Any, CorsLayer};

use db::get_db_conn;
use posts::{add_post, dislove, enlove, get_posts};
use users::{add_user, get_user};

#[tokio::main]
async fn main() {
    let db = get_db_conn().await.unwrap().database("testing");
    let shared_state = Arc::new(Mutex::new(db));

    let app = Router::new()
        .route("/posts/add_post", post(add_post))
        .route("/posts/get_posts", get(get_posts))
        .route("/user", post(add_user))
        .route("/user/:username", get(get_user))
        .route("/posts/enlove", post(enlove))
        .route("/posts/dislove", post(dislove))
        .layer(
            CorsLayer::new()
                .allow_headers(Any)
                .allow_methods(Any)
                .allow_origin(Any),
        )
        .with_state(shared_state);

    let tcp = TcpListener::bind("0.0.0.0:8000").await.unwrap();
    serve(tcp, app.into_make_service()).await.unwrap();
}
