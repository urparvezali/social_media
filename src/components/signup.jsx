export default function Signup() {
	console.log(document.cookie.split('=').at(1));
    return (
        <div className="signup">
            <input type="text" name="" id="username" placeholder="Username" />
            <br />
            <input type="email" name="" id="email" placeholder="Email" />
            <br />
            <input
                type="password"
                name=""
                id="password"
                placeholder="Password"
            />
            <br />
            <label htmlFor="genderlabel">Gender </label>
            <select name="" id="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <br />
            <label htmlFor="birthdaylabel">Birthday </label>
            <input type="date" name="" id="birthday" />
            <br />
            <button>Signup</button>
        </div>
    );
}
