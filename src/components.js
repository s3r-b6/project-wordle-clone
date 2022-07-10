import React, { useEffect, useState } from 'react';

const Header = () => {
  return (
    <header className="appHeader">
      <h1> Wordle React App </h1>
    </header>
  );
};

const Footer = () => {
  return (
    <>
      <footer id="footer">
        <p>lorem ipsum</p>
      </footer>
    </>
  );
};

//number is the Tiles index; currentTile is the actual boards tile, and setCurrentTile is the state changer for the previous parameter.
const Tile = ({
  number,
  currentTile,
  currentWord,
  isGameOver,
  setGameOver,
}) => {
  const [inputtedWord, setInputtedWord] = useState([]);
  const [isRight, setRight] = useState([null, null, null, null, null]);
  const isCurrentTile = parseInt(number) === parseInt(currentTile);
  //on enter keypress the word is submitted if all requirements are met, so a tile gets filled and the next one should be activated

  useEffect(() => {
    if (!currentWord) return;
    if (isGameOver[0]) {
      setInputtedWord([]);
      return;
    }
    const handleKeyPress = (e) => {
      if (e.key === 'Backspace') {
        let deleteInput = inputtedWord;
        deleteInput.pop();
        setInputtedWord(deleteInput.slice());
      } else {
        if (e.key.length === 1 && /[A-Za-z]/.test(e.key)) {
          if (inputtedWord.length === 5)
            console.log('this keyPress does nothing!');
          else {
            let newInput = inputtedWord;
            newInput.push(e.key);
            setInputtedWord(newInput.slice());
            //console.log('triggered letter');
            //console.log(`current word: ${newInput}`);
            return;
          }
        } else if (e.key === 'Enter') {
          if (inputtedWord.length === 5) {
            testInput();
            console.log(
              'submitted word!',
              inputtedWord.toString().replaceAll(',', '')
            );

            function testInput() {
              let cleanString = inputtedWord.toString().replaceAll(',', '');
              let testRight = isRight;
              for (let i = 0; i < 5; i++) {
                console.log(testRight, currentWord);
                console.log(cleanString[i], currentWord[i]);
                testRight[i] = cleanString[i].localeCompare(currentWord[i]);
              }
              setRight(testRight.slice());
              let areAllRight = (el) => el === 0;
              if (isRight.every(areAllRight)) {
                setTimeout(() => {
                  setGameOver([true, 'winner']);
                  setRight([null, null, null, null, null]);
                  console.log('you win');
                }, 600);
              }
            }
          } else {
            console.log('this enter does nothing!');
          }
        }
      }
    };
    if (isCurrentTile) {
      window.addEventListener('keydown', handleKeyPress);
    } else {
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isGameOver, currentTile, currentWord]);

  return (
    <div className={`tile ${number}`}>
      <Grid inputtedWord={inputtedWord} isRight={isRight} number="0" />
      <Grid inputtedWord={inputtedWord} isRight={isRight} number="1" />
      <Grid inputtedWord={inputtedWord} isRight={isRight} number="2" />
      <Grid inputtedWord={inputtedWord} isRight={isRight} number="3" />
      <Grid inputtedWord={inputtedWord} isRight={isRight} number="4" />
    </div>
  );
};

const Grid = ({ number, isRight, inputtedWord }) => {
  return (
    <div
      style={
        isRight[parseInt(number)] !== null
          ? {
              backgroundColor: `${
                isRight[parseInt(number)] === 0 ? 'green' : 'orange'
              }`,
            }
          : null
      }
      className={`grid num${number}`}
    >
      {inputtedWord[parseInt(number)]}
    </div>
  );
};

export { Header, Footer, Tile };
