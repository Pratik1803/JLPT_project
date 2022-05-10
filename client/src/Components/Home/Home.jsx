import React, { useEffect, useState } from "react";
import Styles from "../../App.module.scss";
import { useContext } from "react";
import { StateContext } from "../../App";
import KanjiCard from "../KanjiCard/KanjiCard";
import Flashcard from "../Flashcards/Flashcard";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home({ setWord, word }) {
	const navigator = useNavigate();
	const { states, setStates } = useContext(StateContext);
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [words, setWords] = useState([]);

	function generateRandomWord() {
		setShow(false);
		if (loading) return;
		const random = Math.floor(Math.random() * words.length);
		if (word === words[random]) {
			generateRandomWord();
		} else {
			setWord(words[random]);
		}
	}

	const getData = async () => {
		try {
			const result = await axios({
				method: "get",
				url: "/kanjis?level=5",
			});
			console.log(result);
			setWords(result.data);
			setWord(result.data[0]);
		} catch (error) {
			console.log(error);
		}
	};

	const auth = async () => {
		setLoading(true);
		try {
			const result = await axios({
				method: "get",
				url: "/auth",
				withCredentials: true,
			});
			if (result.data) {
				setStates((prev) => ({ ...prev, userLoggedIn: true }));
				getData();
			} else {
				navigator("/login");
			}
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	const logout = async () => {
		try {
			const result = await axios({
				method: "get",
				url: "http://localhost:8000/logout",
				withCredentials: true,
			});
			if(result.data){
				navigator("/login");
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		auth();
		getData();
	}, []);

	return (
		<>
			{/* <select name="level" id="" defaultValue={5}>
									<option value="5">5</option>
									<option value="5">4</option>
									<option value="5">3</option>
									<option value="5">2</option>
									<option value="5">1</option>
								</select> */}
			{states.userLoggedIn ? (
				<Link to={`/favs?user_id=${states.userId}`}>
					<button className={Styles.signup_btn}>Open Favs</button>
				</Link>
			) : (
				<>
					<Link to="/login">
						<button className={Styles.login_btn}>Login</button>
					</Link>
					<Link to="/signup">
						<button className={Styles.signup_btn}>Sign Up</button>
					</Link>
				</>
			)}
			{loading ? (
				<p>Loading</p>
			) : (
				<>
					<div
						onClick={() => {
							setShow(!show);
						}}
						style={{ cursor: "pointer" }}
					>
						{show ? <KanjiCard /> : <Flashcard />}
					</div>
					<br />
					<div className={Styles.action_btns}>
						<button onClick={generateRandomWord}>Next</button>
						{states.userLoggedIn ? (
							<button style={{ marginLeft: "20px" }}>Add to Favs</button>
						) : null}
					</div>
				</>
			)}
			<Link to="/add">
				<button className={Styles.add_btn}>Add Kanji</button>
			</Link>
			{/* <button onClick={logout} className={Styles.logOut_btn}>Logout</button> */}
		</>
	);
}

export default Home;
