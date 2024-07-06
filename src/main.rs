use std::sync::Arc;
use axum::{
    routing::{get, post},
    serve, Router,
};
use tokio::{net::TcpListener, sync::Mutex};
use tower_http::cors::{Any, CorsLayer};

pub mod db;
pub mod posts;
pub mod types;
pub mod users;

use db::get_db_conn;
use posts::{add_post, dislove, enlove, get_posts, get_user_posts};
use users::{add_user, get_auth, get_user_info};

#[tokio::main]
async fn main() {
    let db = get_db_conn().await.unwrap().database("testing");
    let shared_state = Arc::new(Mutex::new(db));

    let app: Router = Router::new()
        .route("/user", post(add_user))
        .route("/user/:username", get(get_user_info))
        .route("/user/get_auth", post(get_auth))
        .route("/posts/add_post", post(add_post))
        .route("/posts/get_posts", get(get_posts))
		.route("/posts/get_posts/:username", get(get_user_posts))
        .route("/posts/enlove", post(enlove))
        .route("/posts/dislove", post(dislove))
        .layer(
            CorsLayer::new()
                .allow_headers(Any)
                .allow_methods(Any)
                .allow_origin(Any)
                .allow_private_network(true),
        )
        .with_state(shared_state);
    let mut port = 8000;
    let mut tcp_res = TcpListener::bind("0.0.0.0:8000").await;
    while let Err(_) = tcp_res {
        port += 10;
        tcp_res = TcpListener::bind(format!("0.0.0.0:{}", port).as_str()).await;
        if port > 10000 {
            panic!("TCP can't be initialized");
        }
    }
    println!("Server started at localhost:{}...", port);
    serve(tcp_res.unwrap(), app.into_make_service())
        .await
        .unwrap();
}
