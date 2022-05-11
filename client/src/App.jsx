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
import Home from "./Components/Home/Home";

const StateContext = createContext();

function App() {
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
		userID: "",
		userFavs: [],
	});

	return (
		<div className={Styles.app}>
				<StateContext.Provider value={{ word, states, setStates }}>
					<Routes>
						<Route path="/" element={<Home word={word} setWord={setWord} />} />
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
