import Styles from "./App.module.scss";
import { Routes, Route, Link } from "react-router-dom";
import Flashcard from "./Components/Flashcards/Flashcard";
import KanjiCard from "./Components/KanjiCard/KanjiCard";
import { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import AddPage from "./Components/AddPage/AddPage";
import axios from "axios";

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
			setLoading(true);
			const result = await axios({
				method: "get",
				url: "/kanjis",
			});
			setWords(result.data);
			setWord(result.data[0]);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<div className={Styles.app}>
			<StateContext.Provider value={word}>
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
										<button onClick={generateRandomWord}>Next</button>
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
				</Routes>
			</StateContext.Provider>
		</div>
	);
}

export default App;
export { StateContext };
