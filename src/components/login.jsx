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
                console.log(error);
                setIncorr(true);
            });
    };

    const handleCheckbox = () => {
        setHide((prevHide) => (prevHide === "password" ? "text" : "password"));
    };

    return (
        <div className="login container">
            <input
                type="text"
                className="mb-3 form-control"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => handleUsername(e.target.value)}
            />
            <input
                type={hide}
                className="mb-3 form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handlePassword(e.target.value)}
            />
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="checkbox"
                    onClick={handleCheckbox}
                />
                <label className="form-check-label" htmlFor="checkbox">
                    Show
                </label>
            </div>
            <button className="mb-3 btn btn-primary" onClick={handleLogin}>
                Login
            </button>
            <br />
            <a href="/signup">{"Don't have an account?"}</a>
            {incorr && <p>Login Incorrect</p>}
        </div>
    );
}
