import React, { useEffect, useState } from 'react';

//number is the Tiles index; currentTile is the actual boards tile, and setCurrentTile is the state changer for the previous parameter.

const Tile = ({
  number,
  currentTile,
  currentWord,
  isGameOver,
  setGameOver,
}) => {
  //podríamos pasar el inputtedWord como prop: ({inputtedWord}) y que venga del padre como inputtedWords[index]

  const [inputtedWord, setInputtedWord] = useState([]);

  const [isRight, setRight] = useState([null, null, null, null, null]);
  const isCurrentTile = parseInt(number) === parseInt(currentTile);
  //on enter keypress the word is submitted if all requirements are met, so a tile gets filled and the next one should be activated

  useEffect(() => {
    if (!currentWord) return;
    if (isGameOver[0]) {
      setTimeout(() => {
        setRight([null, null, null, null, null]);
        setInputtedWord([]);
        return;
      }, 1600);
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
              if (testRight.every(areAllRight)) {
                setGameOver([true, 'winner']);
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

const Screen = ({ currentWord, isGameOver }) => {
  return isGameOver[0] ? (
    <h2>
      {isGameOver[1] === 'winner' ? 'Yes! ' : 'Sorry! '}The word was:{' '}
      {currentWord}!
    </h2>
  ) : null;
};

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
export { Header, Footer, Tile, Screen };
