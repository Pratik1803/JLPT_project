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

	const [wordsSeq, setWordsSeq] = useState([]);
	const [ptr, setPtr] = useState(0);

	// function getNextWord() {
	// 	setShow(false);
	// 	if (loading) return;
	// 	const random = Math.floor(Math.random() * words.length);
	// 	if (word === words[random]) {
	// 		getNextWord();
	// 	} else {
	// 		setWord(words[random]);
	// 	}
	// };

	function getNextWord() {
		setShow(false);
		if (loading) return;
		const random = Math.floor(Math.random() * words.length);
		if (wordsSeq.length == -1) {
			setWord(words[random]);
			setWordsSeq((prev) => [...prev, random]);
		} else {
			if (word !== words[wordsSeq.length - 1]) {
				if (word === words[random]) {
					getNextWord();
				} else {
					setWord(words[random]);
					setWordsSeq((prev) => [...prev, random]);
					if (wordsSeq.length !== 0) {
						setPtr((prev) => prev + 1);
					}
				}
			} else {
				setWord(words[wordsSeq[wordsSeq.indexOf(words.indexOf(word)) + 1]]);
			}
		}
	}

	const getPrevWord = () => {
		setShow(false);
		if (loading || ptr == 0) return;
		if (wordsSeq.indexOf(words.indexOf(word)) > 0) {
			setWord(words[wordsSeq[wordsSeq.indexOf(words.indexOf(word)) - 1]]);
		}
	};

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
			if (result.data.auth) {
				setStates((prev) => ({
					...prev,
					userLoggedIn: true,
					userID: result.data.uid,
				}));
			}
			console.log(result.data);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	const logout = async () => {
		try {
			const result = await axios({
				method: "get",
				url: "/logout",
				withCredentials: true,
			});
			if (result.data.status == 200) {
				setStates((prev) => ({ ...prev, userLoggedIn: false }));
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
			<div className={Styles.op_btns}>
				{states.userLoggedIn ? (
					<>
						<button onClick={logout} className={Styles.login_btn}>
							Logout
						</button>
						<Link to={`/favs?user_id=${states.userId}`}>
							<button className={Styles.signup_btn}>Open Favs</button>
						</Link>
					</>
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
			</div>
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
						<button onClick={getPrevWord} style={{ marginRight: "20px" }}>
							Previous
						</button>
						<button onClick={getNextWord}>Next</button>
					</div>
				</>
			)}
			<Link to="/add">
				<button className={Styles.add_btn}>Add Kanji</button>
			</Link>
		</>
	);
}

export default Home;
