import React, { useEffect, useState } from 'react';
import { Header, Footer, Tile, Screen } from './components';
import './App.css';

const Board = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [currentTile, setCurrentTile] = useState(0);
  const [isGameOver, setGameOver] = useState([false, undefined]);

  useEffect(() => {
    if (!currentWord) getWord();
    if (isGameOver[0]) {
      if (isGameOver[1] === 'winner') console.log('you win');
      else if (isGameOver[1] === 'loser') console.log('you lose');
      setTimeout(() => {
        setGameOver([false, undefined]);
        setCurrentWord('');
      }, 2000);
    }

    async function getWord() {
      let fetchedWord = await fetch(
        'https://random-word-api.herokuapp.com/word?length=5'
      );
      fetchedWord = await fetchedWord.json();
      setCurrentWord(await fetchedWord[0]);
    }
  }, [isGameOver, currentWord]);

  //the idea is to be able to read and to write to the currentTile marker to be able to attach and disattach the key listeners for each tile when needed
  return (
    <>
      <p>placeholder: {currentWord}</p>
      <Screen currentWord={currentWord} isGameOver={isGameOver} />
      <Tile
        currentWord={currentWord}
        currentTile={currentTile}
        setGameOver={setGameOver}
        isGameOver={isGameOver}
        number="0"
      />

      <Tile
        currentWord={currentWord}
        currentTile={currentTile}
        isGameOver={isGameOver}
        setGameOver={setGameOver}
        number="1"
      />

      <Tile
        currentWord={currentWord}
        currentTile={currentTile}
        isGameOver={isGameOver}
        setGameOver={setGameOver}
        number="2"
      />
      <Tile
        currentWord={currentWord}
        currentTile={currentTile}
        isGameOver={isGameOver}
        setGameOver={setGameOver}
        number="3"
      />
      <Tile
        currentWord={currentWord}
        currentTile={currentTile}
        isGameOver={isGameOver}
        setGameOver={setGameOver}
        number="4"
      />
      <Tile
        currentWord={currentWord}
        currentTile={currentTile}
        isGameOver={isGameOver}
        setGameOver={setGameOver}
        number="5"
      />
    </>
  );
};

export default function App() {
  return (
    <>
      <Header />
      <div style={{ textTransform: 'uppercase' }} className="App">
        <Board />
      </div>
      <Footer />
    </>
  );
}
