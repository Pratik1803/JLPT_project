import Styles from "./App.module.scss";
import { Routes, Route, Link } from "react-router-dom";
import Flashcard from "./Components/Flashcards/Flashcard";
import KanjiCard from "./Components/KanjiCard/KanjiCard";
import { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import AddPage from "./Components/AddPage/AddPage";
import axios from "axios";
import Login from "./Components/Login/Login";
import Signup from "./Components/SignUp/Signup";
import Favs from "./Components/Favs/Favs";

const StateContext = createContext();

function App() {
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);
	const [words, setWords] = useState([]);
	const [word, setWord] = useState({
		word: "",
		meaning: "",
		on_reading: {
			reading: "",
			example: {
				eg: "",
				meaning: "",
				pronounciation: "",
			},
		},
		kun_reading: {
			reading: "",
			example: {
				eg: " ",
				meaning: " ",
				pronounciation: "",
			},
		},
		level: "5",
	});
	const [states, setStates] = useState({
		userLoggedIn: false,
		userId: "",
		userFavs: [],
	});

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
				url: "/kanjis",
			});
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
			}
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	useEffect(() => {
		auth();
	}, []);

	return (
		<div className={Styles.app}>
			<StateContext.Provider value={{ word, states, setStates }}>
				<Routes>
					<Route
						path="/"
						element={
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
												<button style={{ marginLeft: "20px" }}>
													Add to Favs
												</button>
											) : null}
										</div>
									</>
								)}
								<Link to="/add">
									<button className={Styles.add_btn}>Add Kanji</button>
								</Link>
							</>
						}
					/>
					<Route
						path="/add"
						element={
							<>
								<AddPage />
							</>
						}
					/>
					<Route
						path="/login"
						element={
							<>
								<Login />
							</>
						}
					/>
					<Route
						path="/signup"
						element={
							<>
								<Signup />
							</>
						}
					/>
					<Route
						path="/favs"
						element={
							<>
								<Favs />
							</>
						}
					/>
				</Routes>
			</StateContext.Provider>
		</div>
	);
}

export default App;
export { StateContext };
