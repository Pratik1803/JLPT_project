import React from "react";
import Styles from "./Favs.module.scss";
import { StateContext } from "../../App";
import { useContext } from "react";
import axios from "axios";

function Favs() {
	const { states, setStates } = useContext(StateContext);
	return <div className={Styles.favs}>Favs</div>
}

export default Favs;
