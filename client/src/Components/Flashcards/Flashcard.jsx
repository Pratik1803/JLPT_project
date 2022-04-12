import React from 'react';
import Styles from "./Flashcard.module.scss";
import { useContext } from 'react';
import {StateContext} from '../../App';

function Flashcard() {
  const {word} = useContext(StateContext);
  return (
    <div className={Styles.flashcard} >
      <h1>{word.word}</h1>
    </div>
  )
}

export default Flashcard