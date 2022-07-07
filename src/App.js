import React, { useEffect, useState } from 'react';
import './App.css';

function Header() {
  return (
    <header className="App-header">
      <h1> Wordle React App </h1>
    </header>
  );
}

function Board() {
  return (
    <>
      <Tile />
      <Tile />
      <Tile />
      <Tile />
      <Tile />
      <Tile />
    </>
  );
}

function Tile() {
  return (
    <div className="tile">
      <div className="grid"></div>
      <div className="grid"></div>
      <div className="grid"></div>
      <div className="grid"></div>
      <div className="grid"></div>
    </div>
  );
}

function App() {
  const [currentWord, setCurrentWord] = useState('');

  useEffect(() => {
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
    getNewWord();
    window.addEventListener('keypress', (e) => {
      handleKeyPress(e);
    });
  }, []);

  function handleKeyPress(e) {
    console.log(e.key);
  }

  return (
    <>
      <Header />
      <div className="App">
        {currentWord}
        <Board />
      </div>
    </>
  );
}

export default App;
