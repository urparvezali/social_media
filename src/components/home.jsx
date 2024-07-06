import { useEffect, useState } from "react";
import Login from "./login";
export default function Home() {
    const [posts, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    let lover = document.cookie.split("=").at(1);

    useEffect(() => {
        fetch("http://localhost:8000/posts/get_posts")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network not ok");
                }
                return res.json();
            })
            .then((data) => {
                setLoading(false);
                setPost(data);
            })
            .catch((error) => {
                console.log("Err fetching data", error);
            });
    }, []);

    const handleClick = (_id) => {
        fetch("http://localhost:8000/posts/enlove", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                _id,
                lover,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network err");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Like gone");
                console.log(data);
            })
            .catch((error) => {
                console.error("Err loving", error);
            });
    };
    return lover ? (
        <div className="posts ">
            {loading && <h1>Loading data......</h1>}
            {posts.map((post) => (
                <div className="post card card-body" key={post._id}>
                    <h4 className="card-title text-primary">{post.username}</h4>
                    <p className="card-text">{post.body}</p>
                    <button
                        className="heart btn btn-primary"
                        onClick={() => handleClick(post._id)}
                    >
                        Love
                    </button>
                </div>
            ))}
        </div>
    ) : (
        <Login />
    );
}
