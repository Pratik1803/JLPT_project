import React, { useEffect, useState } from "react";
import Styles from "./Login.module.scss";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { StateContext } from "../../App";
import { useContext } from "react";
import { Button, Stack, TextField } from "@mui/material";

function Login() {
	const { states, setStates } = useContext(StateContext);
	const navigator = useNavigate();
	const [user, setUser] = useState({
		username: "",
		password: "",
	});

	const loginUser = async () => {
		try {
			const result = await axios({
				method: "post",
				url: "/login_user",
				data: user,
			});
			if (!result.data.auth) {
				alert("Login failed!");
			} else {
				alert("login Successful!");
				setStates((prev) => ({
					...prev,
					userId: result.data._id,
					userLoggedIn: true,
					userFavs: result.data.favs,
				}));
				navigator(`/`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={Styles.login}>
			<h1>Login</h1>
			<Stack spacing={2} alignItems={"center"} width={"100%"}>
				<TextField
					size="small"
					variant="outlined"
					autoFocus
					fullWidth
					type="text"
					value={user.username}
					onChange={(e) => {
						setUser((prev) => ({ ...prev, username: e.target.value }));
					}}
					label="Username"
				/>
				<TextField
					size="small"
					variant="outlined"
					type="password"
					label="Password"
					fullWidth
					value={user.password}
					onChange={(e) => {
						setUser((prev) => ({ ...prev, password: e.target.value }));
					}}
					name=""
					id=""
				/>
				<div style={{ width: "100%", textAlign: "right" }}>
					<Button onClick={loginUser}>Login</Button>
				</div>
				<p>
					Don't have an account? <Link to="/signup"><strong>Sign Up</strong></Link>
				</p>
			</Stack>
		</div>
	);
}

export default Login;
