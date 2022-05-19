
import { useEffect, useState } from 'react';
import AttackButton from './components/AttackButton/AttackButton';
import LetterSoup from './components/LetterSoup/LetterSoup';
import Sequence from './components/Sequence/Sequence';
import { letterSize, matrixSize } from './helpers/consts';
import calcLetterSoupPos from './helpers/formulas/calcLetterSoupPos';
import { CurrentSequence, LetterType } from './helpers/types';

function App(): JSX.Element {
  const [sequence, setSequence] = useState<CurrentSequence>([]);
  const [matrix, setMatrix] = useState<Array<Array<string>>>([]);
  
  const runAtStart = async () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
  
    let new_matrix = [];
    for (let i = 0; i < matrixSize; i++) {
      let line : any = [];
      for (let j = 0; j < matrixSize; j++) {
        line.push(letters[Math.floor(Math.random() * letters.length)]);
      }
      new_matrix.push(line);
    }
    setMatrix(new_matrix);
  };

  useEffect(() => {
    runAtStart();
    
    return () => {
      for (let i = 0; i <= Number(setTimeout(() => {}, 0)); i++) clearTimeout(i);
    };
  }, []);
  
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
