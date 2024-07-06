import { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        gender: "",
    });
    const [areavalue, setAreavalue] = useState("");
    const [loading, setLoading] = useState(true);
    let usr = document.cookie.split("=").at(1);
    useEffect(() => {
        fetch("http://localhost:8000/user/" + usr)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("jfldkj");
                }
                return response.json();
            })
            .then((data) => {
                setLoading(false);
                setUser(data);
            })
            .catch(() => {
                console.log("Data can't be fetched");
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (val) => {
        setAreavalue(val);
    };
    const handleClick = () => {
        fetch("http://localhost:8000/posts/add_post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: user.username, body: areavalue }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Post can't be added.");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="profile">
            {loading && <h1>Loading.....</h1>}
            <h2>{user.username}</h2>
            <p>email: {user.email}</p>
            <p>gender: {user.gender}</p>

            <textarea
                name=""
                id=""
                value={areavalue}
                onChange={(e) => {
                    handleChange(e.target.value);
                }}
                placeholder="Enter your feeling!"
            ></textarea>
            <br />
            <button className="btn btn-primary" onClick={handleClick}>
                Post
            </button>
        </div>
    );
}
