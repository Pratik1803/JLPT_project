import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setStates }) {
	const [user, setUser] = useState({
		username: "",
		password: "",
	});

	const submit = async () => {
		try {
			const result = await axios({
				method: "post",
				url: "/login_user",
				data: user,
			});
			if (result.data.status == 200) {
				setStates((prev) => ({ ...prev, userLoggedIn: true }));
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<label htmlFor="">LogIn</label>
			<br />
			<input
				type={"text"}
				value={user.username}
				onChange={(e) => {
					setUser((prev) => ({ ...prev, username: e.target.value }));
				}}
				placeholder="username"
				name="username"
			/>
			<input
				type={"password"}
				value={user.password}
				onChange={(e) => {
					setUser((prev) => ({ ...prev, password: e.target.value }));
				}}
				placeholder="username"
				name="username"
			/>
			{/* <input
				value={user.email}
				onChange={(e) => {
					setUser((prev) => ({ ...prev, email: e.target.value }));
				}}
				type={"email"}
				placeholder="email"
				name="email"
			/> */}
			<button onClick={submit}>Submit</button>
			<br />
			<NavLink to="/signup">Sign Up</NavLink>
		</>
	);
}

export default Login;
