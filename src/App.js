import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [currentWord, setCurrentWord] = useState('');
  //2D array to handle lines
  const [newInput, setNewInput] = useState([
    Array(5),
    Array(5),
    Array(5),
    Array(5),
    Array(5),
    Array(5),
  ]);
  const [enabledTile, setEnabledTile] = useState(0);
  //const [isGameOver, setGameOver] = useState(false);

  useEffect(() => {
    getNewWord();

    async function getNewWord() {
      let wordList = await fetch(
        'https://random-word-api.herokuapp.com/word?length=5'
      );
      wordList = await wordList.json();
      let randomWord = await wordList[
        Math.floor(Math.random() * wordList.length)
      ];
      setCurrentWord(randomWord);
    }

    window.addEventListener('keypress', (e) => {
      handleKeyPress(e);
    });
  }, []);

  function Header() {
    return (
      <header className="App-header">
        <h1> Wordle React App </h1>
      </header>
    );
  }

  function Board() {
    function Tile(props) {
      return (
        <div className={`tile ${props.number}`}>
          <div className="grid">{newInput[parseInt(props.number)][0]}</div>
          <div className="grid">{newInput[parseInt(props.number)][1]}</div>
          <div className="grid">{newInput[parseInt(props.number)][2]}</div>
          <div className="grid">{newInput[parseInt(props.number)][3]}</div>
          <div className="grid">{newInput[parseInt(props.number)][4]}</div>
        </div>
      );
    }

    return (
      <>
        <Tile number="0" />
        <Tile number="1" />
        <Tile number="2" />
        <Tile number="3" />
        <Tile number="4" />
        <Tile number="5" />
      </>
    );
  }

  function handleKeyPress(e) {
    const isUndefined = (el) => el === undefined;

    if (/[A-Za-z]/.test(e.key)) {
      handleLetterPress(e);
    } else if (e.key === 'Enter') {
      handleEnterPress(e);
    }
    console.log('currentTile: ', enabledTile);

    function handleEnterPress(e) {
      if (newInput[enabledTile].findIndex(isUndefined) === -1) {
        let newEnabled = enabledTile;
        console.log('newTile: ', newEnabled);
        setEnabledTile(newEnabled + 1);
        console.log(enabledTile);
        //setGameOver(true)
      }
    }

    function handleLetterPress(e) {
      let handledInputItem = newInput[enabledTile];
      let newInputIndex = handledInputItem.findIndex(isUndefined);
      handledInputItem[newInputIndex] = e.key;

      let handledInput = newInput;
      handledInput[enabledTile] = handledInputItem;

      console.log('handledItem: ', handledInputItem);
      console.log('handledInput: ', handledInput);

      setNewInput(handledInput.slice());
      handledInputItem = Array(5);
      console.log('currentArray: ', newInput);
    }
  }

  return (
    <>
      <Header />
      <div style={{ textTransform: 'uppercase' }} className="App">
        {currentWord}
        <Board />
      </div>
    </>
  );
}

export default App;
