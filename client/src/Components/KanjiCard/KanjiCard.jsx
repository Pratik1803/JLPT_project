import React from 'react';
import Styles from "./KanjiCard.module.scss";
import { useContext } from 'react';
import {StateContext} from "../../App";

function KanjiCard() {
  const word = useContext(StateContext);
  return (
    <div className={Styles.kanji_card}>
      <h1>{word.word}</h1>
      <h3>({word.meaning})</h3>
      <div className={Styles.flexbox}>
        <div className={Styles.on_reading}>
          <h3>On-Reading</h3>
          <p><strong>Reading:</strong>{" "}{word.on_reading?.reading}</p>
          <p><strong>As in:</strong>{" "}{word.on_reading?.example?.eg}({word.on_reading?.example?.pronounciation})</p>
          <p><strong>Meaning:</strong>{" "}{word.on_reading?.example?.meaning}</p>
        </div>
        <div className={Styles.kun_reading}>
          <h3>Kun-Reading</h3>
          <p><strong>Reading:</strong>{" "}{word.kun_reading?.reading}</p>
          <p><strong>As in:</strong>{" "}{word.kun_reading?.example?.eg}({word.kun_reading?.example?.pronounciation})</p>
          <p><strong>Meaning:</strong>{" "}{word.kun_reading?.example?.meaning}</p>
        </div>
      </div>
    </div>
  )
}

export default KanjiCard