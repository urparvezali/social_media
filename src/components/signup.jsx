import { useState } from "react";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const handleUsernameChange = (val) => {
        setUsername(val);
    };
    const handleEmailChange = (val) => {
        setEmail(val);
    };
    const handlePasswordChange = (val) => {
        setPassword(val);
    };
    const handleGenderChange = (val) => {
        setGender(val);
    };
    const handleSubmit = () => {
        fetch("http://localhost:8000/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password, gender }),
        })
            .then((response) => {
				if (!response.ok) {
                    throw new Error("Conflict/InternalServerError");
                } else {
                    console.log("User added!");
                }
            })
            .fetch((error) => {
                console.log(error);
            })
    };
    return (
        <div className="container">
            <br />
            <br />
            <br />
            <br />
            <input
                className="mb-3 form-control"
                type="text"
                name=""
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                    handleUsernameChange(e.target.value);
                }}
            />
            <input
                type="email"
                className="mb-3 form-control"
                name=""
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                    handleEmailChange(e.target.value);
                }}
            />
            <input
                type="password"
                className="mb-3 form-control"
                name=""
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                    handlePasswordChange(e.target.value);
                }}
            />
            <label htmlFor="genderlabel form-label">Gender </label>
            <select
                className="form-select"
                aria-level={gender}
                name=""
                id="gender"
                value={gender}
                onChange={(e) => {
                    handleGenderChange(e.target.value);
                }}
            >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <label className="form-label" htmlFor="birthdaylabel">
                Birthday{" "}
            </label>

            <input
                className="mb-3 form-control"
                type="date"
                name=""
                id="birthday"
            />
            <button className="btn btn-primary" onClick={handleSubmit}>
                Signup
            </button>
        </div>
    );
}
