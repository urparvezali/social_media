import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hide, setHide] = useState("password");
    const [incorr, setIncorr] = useState(false);
    const navigate = useNavigate();

    const handleUsername = (value) => {
        setUsername(value);
    };

    const handlePassword = (value) => {
        if (value.length <= 20) setPassword(value);
    };

    const handleLogin = async () => {
        fetch("http://localhost:8000/user/get_auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    setIncorr(true);
                    throw new Error("Login failed");
                } else {
                    document.cookie = "username=" + username + ";";
                    setIncorr(false);
                    console.log("Logged in");
                    navigate("/");
                }
            })
            .catch((error) => {
                console.log("Login error", error);
                setIncorr(true);
            });
    };

    const handleCheckbox = () => {
        setHide((prevHide) => (prevHide === "password" ? "text" : "password"));
    };

    return (
        <div className="login">
            <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => handleUsername(e.target.value)}
            />
            <br />
            <input
                type={hide}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handlePassword(e.target.value)}
            />
            <br />
            <button onClick={handleLogin}>Login</button>
            <input type="checkbox" id="checkbox" onClick={handleCheckbox} />
            <i>Show</i>
            <br />
            <br />
            <a href="/signup">{"Don't have an account?"}</a>
            {incorr && <p>Login Incorrect</p>}
        </div>
    );
}
