
import { useCallback, useEffect, useState } from 'react';
import AttackButton from './components/AttackButton/AttackButton';
import LetterSoup from './components/LetterSoup/LetterSoup';
import Sequence from './components/Sequence/Sequence';
import clearAllTimeouts from './helpers/clearAllTimeouts';
import { letterSize, matrixSize } from './helpers/consts';
import getWords from './helpers/dictionaries';
import calcLetterSoupPos from './helpers/formulas/calcLetterSoupPos';
import normalize from './helpers/formulas/normalize';
import instaDelay from './helpers/instaDelay';
import repeat from './helpers/repeat';
import { CurrentSequence, LetterType } from './helpers/types';

function App(): JSX.Element {
  const [currValidWord, setCurrValidWord] = useState<string>('');
  const [dictWords, setDictWords] = useState<Array<string>>([]);
  const [sequence, setSequence] = useState<CurrentSequence>([]);
  const [matrix, setMatrix] = useState<Array<Array<string>>>([]);
  
  const runAtStart = async () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
  
    // make random matrix
    let new_matrix = [];
    for (let i = 0; i < matrixSize; i++) {
      let line : any = [];
      for (let j = 0; j < matrixSize; j++) {
        line.push(letters[Math.floor(Math.random() * letters.length)]);
      }
      new_matrix.push(line);
    }
    setMatrix(new_matrix);
    // setMatrix([
    //   ['a', 'a', 'b', 'o'],
    //   ['b', 'a', 'c', 'z'],
    //   ['m', 'e', 'u', 'a'],
    //   ['a', 'i', 'n', 'm'],
    // ]);
    
    console.time("loadingWords");
    setDictWords(await getWords());
    console.timeEnd("loadingWords");
  };

  /**
   * Verifies if the word in the sequence is valid or not.
   * If it's valid it will add an effect to the Sequence.
   */
  const checkWord = useCallback(async () => {
    // Figure out what's written in the sequence
    let currentWord = '';
    repeat(sequence.length, (i: number) => {
      currentWord += sequence[i].char;
    });

    // reset while processing
    setCurrValidWord('');
    
    // Find if the word is in the dictionary
    let valid = '';
    let i = 0;
    for (const word of dictWords) {
      if (normalize(currentWord) === normalize(word)) {
        valid = word;
      }
      if (i % 10000 === 0) {
        // give time to other threads every once in a while
        await instaDelay();
      }
      i++;
    }

    valid && console.log(valid);
    setCurrValidWord(valid);
  }, [sequence, dictWords]);
  
  useEffect(() => {
    runAtStart();

    return () => clearAllTimeouts();
  }, []);
  
  useEffect(() => {
    checkWord();

    return () => clearAllTimeouts();
  }, [sequence, checkWord]);
  
  const letterAddHandler = (new_letter: LetterType) => {
    // add letter to sequence
    setSequence(prevSequence => [...prevSequence, new_letter]);
    // remove letter from sequence
    setMatrix(prevMatrix =>
      prevMatrix.map((line, line_index) =>
        line.map((_, col_index) =>
          line_index === new_letter.left && col_index === new_letter.top
            ? ''
            : prevMatrix[line_index][col_index]
        )
      )
    );
  };

  const sequence_x = window.innerWidth/2 - sequence.length*letterSize/2;
  
  const letterRemoveHandler = (
    letter_to_remove: LetterType,
    x_coord: number
  ) => {
    // Calculate the coordinates of each letter in the sequence and remove the
    // one in the received coordinate (only x is needed)
    setSequence(prevSequence =>
      prevSequence.filter(
        (_, index) => sequence_x + letterSize * index !== x_coord
      )
    );
    
    // Add the letter back to the matrix
    setMatrix(prevMatrix => {
      const newMatrix = prevMatrix;
      newMatrix[letter_to_remove.left][letter_to_remove.top] = letter_to_remove.char;
      return newMatrix;
    });
  };

  return (
    <div className="App">
      <Sequence
        y={100}
        sequence={sequence}
        onLetterClick={letterRemoveHandler}
        valid={currValidWord}
      />
      <LetterSoup
        x={calcLetterSoupPos()}
        y={350}
        matrix={matrix}
        onLetterClick={letterAddHandler}
      />
      <AttackButton
        x={calcLetterSoupPos()}
        y={600}
      />
    </div>
  );
}

export default App;
