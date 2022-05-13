import React, { useEffect, useState } from "react";
import Styles from "../../App.module.scss";
import { useContext } from "react";
import { StateContext } from "../../App";
import KanjiCard from "../KanjiCard/KanjiCard";
import Flashcard from "../Flashcards/Flashcard";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Stack, Button } from "@mui/material";
import LoadingButton from "../../utils/LoadingButton";
import arrToObjConv from "../../helpers/arrToObjConv";

function Home({ setWord, word }) {
	const navigator = useNavigate();
	const [level, setLevel] = useState(5);
	const { states, setStates } = useContext(StateContext);
	const [loading, setLoading] = useState(false);
	const [favsLoading, setFavsLoadng] = useState(false);
	const [show, setShow] = useState(false);
	const [showFavs, setShowFavs] = useState(false);
	const [words, setWords] = useState([]);

	const [wordsSeq, setWordsSeq] = useState([]);

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
					// if (wordsSeq.length !== 0) {
					// 	setPtr((prev) => prev + 1);
					// }
				}
			} else {
				setWord(words[wordsSeq[wordsSeq.indexOf(words.indexOf(word)) + 1]]);
			}
		}
	}

	const getPrevWord = () => {
		setShow(false);
		if (loading) return;
		if (wordsSeq.indexOf(words.indexOf(word)) > 0) {
			setWord(words[wordsSeq[wordsSeq.indexOf(words.indexOf(word)) - 1]]);
		}
	};

	const getData = async () => {
		setLoading(true);
		try {
			const result = await axios({
				method: "get",
				url: `/kanjis?level=${level}`,
			});
			console.log(result);
			setWords(result.data);
			setWord(result.data[0]);
			setWordsSeq([]);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	const auth = async () => {
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
					userFavs: result.data.favs,
				}));
			}
			console.log(result.data);
		} catch (error) {
			console.log(error);
		}
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

	const addDeleteFromFavs = async () => {
		setFavsLoadng(true);
		const favWordObj = arrToObjConv(states.userFavs);
		try {
			const result = await axios({
				method: "patch",
				url: "/favs",
				data: {
					word: word.word,
					userID: states.userID,
					action: word.word in favWordObj ? "delete" : "add",
				},
			});
			if (word.word in favWordObj) {
				console.log("remove");
				setStates((prev) => ({
					...prev,
					userFavs: states.userFavs.filter((ele) => ele !== word.word),
				}));
			} else {
				setStates((prev) => ({
					...prev,
					userFavs: [...states.userFavs, word.word],
				}));
			}
		} catch (error) {
			console.log(error);
		}
		setFavsLoadng(false);
	};

	const toggleFavs = async () => {
		try {
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		auth();
	}, []);

	useEffect(() => {
		getData();
	}, [level]);

	return (
		<>
			<h1>JLPT-Kanjis</h1>
			<Stack>
				<p>Select Level:</p>
				<select
					name="level"
					id=""
					defaultValue={level}
					onChange={(e) => {
						setLevel(e.target.value);
					}}
				>
					<option value="5">5</option>
					<option value="4">4</option>
					<option value="3">3</option>
					<option value="2">2</option>
					<option value="1">1</option>
				</select>
			</Stack>
			<div className={Styles.op_btns}>
				{states.userLoggedIn ? (
					<>
						<Button onClick={logout} className={Styles.login_btn}>
							Logout
						</Button>
						<Link to={`/favs?user_id=${states.userId}`}>
							<Button className={Styles.signup_btn}>Open Favs</Button>
						</Link>
					</>
				) : (
					<>
						<Link to="/login">
							<Button className={Styles.login_btn}>Login</Button>
						</Link>
						<Link to="/signup">
							<Button className={Styles.signup_btn}>Sign Up</Button>
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
						<Stack direction={"row"} spacing={2}>
							{states.userLoggedIn && (
								<LoadingButton
									func={addDeleteFromFavs}
									innerText={
										word.word in arrToObjConv(states.userFavs)
											? "Remove from Favs"
											: "Add to Favs"
									}
									loadingState={favsLoading}
								/>
							)}
							<Button onClick={getPrevWord}>Previous</Button>
							<Button onClick={getNextWord}>Next</Button>
						</Stack>
					</div>
				</>
			)}
			{states.userID === "627e1957180dd53773615c17" && (
				<Link to="/add">
					<Button className={Styles.add_btn}>Add Kanji</Button>
				</Link>
			)}
		</>
	);
}

export default Home;
