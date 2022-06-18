
import { useCallback, useEffect, useState } from 'react';
import AttackButton from './components/AttackButton/AttackButton';
import Enemy from './components/Enemy/Enemy';
import LangSelector from './components/LangSelector/LangSelector';
import LetterSoup from './components/LetterSoup/LetterSoup';
import Sequence from './components/Sequence/Sequence';
import clearAllTimeouts from './helpers/clearAllTimeouts';
import { letterSize, matrixSize } from './helpers/consts';
import getWords from './helpers/dictionaries';
import calcLetterSoupPos from './helpers/formulas/calcLetterSoupPos';
import normalize from './helpers/formulas/normalize';
import generateRandomLetter from './helpers/generateRandomLetter';
import i18n from './helpers/i18n';
import repeat from './helpers/repeat';
import { CurrentSequence, DictWords, LetterType } from './helpers/types';

function App(): JSX.Element {
  const [currValidWord, setCurrValidWord] = useState<string>('');
  const [dictWords, setDictWords] = useState<DictWords>({});
  const [sequence, setSequence] = useState<CurrentSequence>([]);
  const [matrix, setMatrix] = useState<Array<Array<string>>>([]);
  
  const [enemyHealth, setEnemyHealth] = useState<number>(50);
  const [level, setLevel] = useState<number>(0);
  
  const runAtStart = async () => {
    // make random matrix
    // let new_matrix = [];
    // for (let i = 0; i < matrixSize; i++) {
    //   let line : any = [];
    //   for (let j = 0; j < matrixSize; j++) {
    //     line.push(letters[Math.floor(Math.random() * letters.length)]);
    //   }
    //   new_matrix.push(line);
    // }
    // setMatrix(new_matrix);
    setMatrix([
      ['a', 'a', 'b', 'o'],
      ['b', 'a', 'c', 'z'],
      ['m', 'e', 'u', 'a'],
      ['a', 'i', 'n', 'm'],
    ]);
    
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
    let valid = dictWords[normalize(currentWord)];

    valid && console.log(valid);
    setCurrValidWord(valid || '');
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
  
  const attack = () => {
    // Get attack value
    const attackValue = sequence.length;
    
    console.log(`attack damage: ${attackValue}`);
    
    setEnemyHealth(currentHealth => {
      if (currentHealth - attackValue <= 0) {
        setLevel(currentLevel => currentLevel + 1);
      }
      return (((currentHealth - attackValue + 50) % 50)) || 50;
    });
    
    // Remove used word
    setSequence([]);
    
    // Replace empty spots
    let new_matrix: any[] = [];
    repeat(matrixSize, (i: number) => {
      let line: any = [];
      repeat(matrixSize, (j: number) => {
        if (matrix[i][j] === '') {
          line.push(generateRandomLetter());
        } else {
          line.push(matrix[i][j]);
        }
      });
      new_matrix.push(line);
    });
    setMatrix(new_matrix);
  }
  
  const scramble = () => {
    setSequence([]);
    
    // make random matrix
    let new_matrix = [];
    for (let i = 0; i < matrixSize; i++) {
      let line : any = [];
      for (let j = 0; j < matrixSize; j++) {
        line.push(generateRandomLetter());
      }
      new_matrix.push(line);
    }
    setMatrix(new_matrix);
  }

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
        active={currValidWord.length > 0}
        onClick={attack}
      />
      <Enemy
        x={window.innerWidth * 0.78}
        y={70}
        health={enemyHealth}
        maxHealth={50}
        level={level}
      />
      <LangSelector x={50} y={50} />
      <button onClick={scramble}>{i18n('btn.scramble')}</button>
    </div>
  );
}

export default App;
