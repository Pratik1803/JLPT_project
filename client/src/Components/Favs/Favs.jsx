import React, { useEffect, useState } from "react";
import Styles from "./Favs.module.scss";
import { StateContext } from "../../App";
import { useContext } from "react";
import axios from "axios";

function Favs() {
	const [loading, setLoading] = useState(false);
	const auth = async () => {
		setLoading(true);
		try {
			const result = await axios({
				method:"get",
				url:"/auth",
				withCredentials:true,
			});
			console.log(result);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	useEffect(() => {
		auth();
	}, []);

	const { states, setStates } = useContext(StateContext);
	return <div className={Styles.favs}>{loading?"Loading":<p>{`[${states.userFavs}]`}</p>}</div>;
}

export default Favs;
