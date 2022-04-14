import React, { useState } from "react";
import Styles from "./AddPage.module.scss";
import axios from "axios";

function AddPage() {
    const [loading, setLoading] = useState(false);
    const [level, setLevel] = useState(5);
	const [word, setWord] = useState("");
    const [meaning, setMeaning] = useState("");
    //For On-Readings
    const [onReading, setOnReading] = useState("");
    const [onEgWord, setOnEgWord] = useState("");
    const [onEgMeaning, setOnEgMeaning] = useState("");
    const [onEgPronounciation, setOnEgPronounciation] = useState("");
    //For Kun-Readings
    const [kunReading, setKunReading] = useState("");
    const [kunEgWord, setKunEgWord] = useState("");
    const [kunEgMeaning, setKunEgMeaning] = useState("");
    const [kunEgPronounciation, setKunEgPronounciation] = useState("");

    async function submit(){
        try {
            setLoading(true);
            const result = await axios({
                method:"post",
                url:"/add_kanji",
                data:{
                    word,
                    meaning,
                    on_reading: {
                        reading:onReading,
                        example: {
                            eg: onEgWord,
                            meaning: onEgMeaning,
                            pronounciation: onEgPronounciation,
                        },
                    },
                    kun_reading: {
                        reading: kunReading,
                        example: {
                            eg: kunEgWord,
                            meaning: kunEgMeaning,
                            pronounciation: kunEgPronounciation,
                        },
                    },
                    level,
                }
            });
            setWord("");
            setMeaning("");
            setOnReading("");
            setOnEgWord("");
            setOnEgMeaning("");
            setOnEgPronounciation("");
            setKunReading("");
            setKunEgWord("");
            setKunEgMeaning("");
            setKunEgPronounciation("");
            setLoading(false);
        } catch (error) {
            console.log(error);
        };
    };

	return (
		<div className={Styles.add_page}>
			<h1>Add Kanji</h1>
			<br />
			<div className={Styles.wrapper}>
                <input type="number" value={level} onChange={(e)=>{
                    setLevel(e.target.value)
                }} />
				<input value={word} onChange={(e)=>{setWord(e.target.value)}} type="text" placeholder="Kanji" />
				<input value={meaning} onChange={(e)=>{setMeaning(e.target.value)}} type="text" placeholder="Meaning" />
				<br />
				<h3>On-Readings</h3>
				<input value={onReading} onChange={(e)=>{setOnReading(e.target.value)}} type="text" placeholder="Reading" />
				<p>Example:</p>
				<input value={onEgWord} onChange={(e)=>{setOnEgWord(e.target.value)}} type="text" placeholder="Example" />
				<input value={onEgMeaning} onChange={(e)=>{setOnEgMeaning(e.target.value)}} type="text" placeholder="Example Meaning" />
				<input value={onEgPronounciation} onChange={(e)=>{setOnEgPronounciation(e.target.value)}} type="text" placeholder="Pronounciation" />
				<br />
				<h3>Kun-Readings</h3>
				<input value={kunReading} onChange={(e)=>{setKunReading(e.target.value)}} type="text" placeholder="Reading" />
				<p>Example:</p>
				<input value={kunEgWord} onChange={(e)=>{setKunEgWord(e.target.value)}} type="text" placeholder="Example" />
				<input value={kunEgMeaning} onChange={(e)=>{setKunEgMeaning(e.target.value)}} type="text" placeholder="Example Meaning" />
				<input value={kunEgPronounciation} onChange={(e)=>{setKunEgPronounciation(e.target.value)}} type="text" placeholder="Pronounciation" />
				<br />
				<button onClick={submit}>{loading?"loading":"Add"}</button>
			</div>
		</div>
	);
}

export default AddPage;
