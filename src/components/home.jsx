import { useEffect, useState } from "react";

export default function Home() {
    const [posts, setPost] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8000/posts")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network not ok");
                }
                return res.json();
            })
            .then((data) => {
                setPost(data);
            })
            .catch((error) => {
                console.log("Err fetching data", error);
            });
    }, []);

    const handleClick = (id) => {
        console.log(id);
    };
    return (
        <div className="posts">
            {posts.map((post) => (
                <div className="post" key={post.id}>
                    <h2>{post.user}</h2>
                    <p>{post.body}</p>
                    <button
                        className="heart"
                        onClick={() => handleClick(post.id)}
                    >
                        Love
                    </button>
                </div>
            ))}
        </div>
    );
}
