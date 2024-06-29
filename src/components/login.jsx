import { useState } from "react";
// import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hide, setHide] = useState("password");
    // const navigate = useNavigate();
    const handleUsername = (value) => {
        setUsername(value);
    };
    const handlePassword = (value) => {
        if (value.length <= 20) setPassword(value);
    };
    const handleLogin = () => {
        // Implement your authentication logic here

		console.log('clicked');
        // navigate("/dashboard");
    };
    const handleCheckbox = () => {
        if (hide === "password") setHide("text");
        else setHide("password");
    };
    return (
        <div className="login">
            <input
                type="text"
                name=""
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => handleUsername(e.target.value)}
            />{" "}
            <br />
            <input
                type={hide}
                name=""
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handlePassword(e.target.value)}
            />{" "}
            <br />
            <button onClick={handleLogin}>Login</button>
            <input
                type="checkbox"
                name=""
                id="checkbox"
                onClick={handleCheckbox}
            />
            <i>Show</i>
            <br />
			<br />
            <a href="/signup">{"Don't have an account?"}</a>
        </div>
    );
}
