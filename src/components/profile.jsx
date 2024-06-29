import { useState } from "react";

export default function Profile() {
    let user = {
        username: "urparvezali",
        email: "urparvezali@gmail.com",
        gender: "male",
    };
	let x=document.cookie.split(':').at(1);
    const [areavalue, setAreavalue] = useState("");

    const handleChange = (val) => {
        setAreavalue(val);
    };
    const handleClick = () => {
        fetch("http://localhost:8000/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ }),
        });
    };

    return (
        <div className="profile">
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
            <button onClick={handleClick}>Post</button>
        </div>
    );
}
