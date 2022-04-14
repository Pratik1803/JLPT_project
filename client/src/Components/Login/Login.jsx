import React, { useState } from "react";
import Styles from "./Login.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {StateContext} from '../../App';
import { useContext } from "react";

function Login() {
	const {states, setStates} = useContext(StateContext);
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
			if(!result.data){
				alert("Login failed!")
			}else{
				alert("login Successful!");
				setStates((prev)=>({...prev, userId: result.data._id, userLoggedIn:true, userFavs:result.data.favs}));
				navigator(`/?user_id=${result.data._id}`);
			};
		} catch (error) {
			console.log(error);
		};
	};
	return (
		<div className={Styles.login}>
			<h1>Login</h1>
			<input
				autoFocus
				type="text"
				value={user.username}
				onChange={(e) => {
					setUser((prev) => ({ ...prev, username: e.target.value }));
				}}
				placeholder="username"
			/>
			<input
				type="password"
				value={user.password}
				onChange={(e) => {
					setUser((prev) => ({ ...prev, password: e.target.value }));
				}}
				name=""
				id=""
			/>
			<br />
			<button onClick={loginUser}>Login</button>
		</div>
	);
}

export default Login;
