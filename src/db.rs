use mongodb::{options::ClientOptions, Client};

pub async fn get_db_conn() -> Result<Client, mongodb::error::Error> {
    let database_url = "mongodb+srv://urparvezali:MDBP%40sswors102938@cluster0.jfrvstu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    let opt = ClientOptions::parse(database_url).await.unwrap();
    Client::with_options(opt)
}
