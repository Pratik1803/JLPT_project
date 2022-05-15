import React, { useState } from "react";
import Styles from "./Signup.module.scss";
import axios from "axios";
import { StateContext } from "../../App";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stack, Button, TextField } from "@mui/material";

function Signup() {
	const { states, setStates } = useContext(StateContext);
	const navigator = useNavigate();
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const addUser = async () => {
		try {
			if (user.password === user.confirmPassword) {
				const result = await axios({
					method: "post",
					url: "/create_user",
					data: user,
					withCredentials: true,
				});
				alert("User created successfully!");
					navigator(`/`);
					setUser({
						username: "",
						email: "",
						password: "",
						confirmPassword: "",
					});
					setStates((prev) => ({
						...prev,
						userId: result.data._id,
						userLoggedIn: true,
						userFavs: result.data.favs,
					}));
			} else {
				setUser((prev) => ({ ...prev, password: "", confirmPassword: "" }));
				alert("Passwords do not match!");
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className={Styles.signup}>
			<h1>Create an Account</h1>
			<Stack spacing={2}>
				<TextField
					variant="outlined"
					size="small"
					fullwidth
					autoFocus
					type="text"
					value={user.username}
					onChange={(e) => {
						setUser((prev) => ({ ...prev, username: e.target.value }));
					}}
					name=""
					id=""
					label="Username"
				/>
				<TextField
					variant="outlined"
					size="small"
					fullwidth
					type="email"
					name=""
					value={user.email}
					onChange={(e) => {
						setUser((prev) => ({ ...prev, email: e.target.value }));
					}}
					id=""
					label="Email"
				/>
				<TextField
					variant="outlined"
					size="small"
					fullwidth
					type="passowrd"
					value={user.password}
					onChange={(e) => {
						setUser((prev) => ({ ...prev, password: e.target.value }));
					}}
					name=""
					id=""
					label="Password"
				/>
				<TextField
					variant="outlined"
					size="small"
					fullwidth
					type="passowrd"
					value={user.confirmPassword}
					onChange={(e) => {
						setUser((prev) => ({ ...prev, confirmPassword: e.target.value }));
					}}
					name=""
					id=""
					label="Confirm Password"
				/>
				<div style={{ width: "100%", textAlign: "right" }}>
					<Button onClick={addUser}>Signup</Button>
				</div>
				<p>
					Already have an account?{" "}
					<Link to="/login">
						<strong>Login</strong>
					</Link>
				</p>
			</Stack>
		</div>
	);
}

export default Signup;
