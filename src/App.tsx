
import { useEffect, useState } from 'react';
import LetterSoup from './components/LetterSoup/LetterSoup';
import Sequence from './components/Sequence/Sequence';
import { letterSize } from './helpers/consts';
import { CurrentSequence, LetterType } from './helpers/types';

function App(): JSX.Element {
  const [sequence, setSequence] = useState<CurrentSequence>([]);
  const [matrix, setMatrix] = useState<Array<Array<string>>>([]);
  
  const runAtStart = async () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
  
    let new_matrix = [];
    for (let i = 0; i < 4; i++) {
      let line : any = [];
      for (let j = 0; j < 4; j++) {
        line.push(letters[Math.floor(Math.random()*26)]);
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
    setSequence(prevSequence => [...prevSequence, new_letter]);
  };

  const sequence_x = window.innerWidth/2 - sequence.length*letterSize/2;
  
  const letterRemoveHandler = (
    letter_to_remove: string, // I seriously don't need this?!? O_O 
    x_coord: number
  ) => {
    // Calculate the coordinates of each letter in the sequence and remove the
    // one in the received coordinate (only x is needed)
    setSequence(prevSequence =>
      prevSequence.filter(
        (_, index) => sequence_x + letterSize * index !== x_coord
      )
    );
  };

  return (
    <div className="App">
      <Sequence y={100} sequence={sequence} onLetterClick={letterRemoveHandler}/>
      <LetterSoup
        x={window.innerWidth / 2 - 230 / 2}
        y={400}
        matrix={matrix}
        onLetterClick={letterAddHandler}
      />
      adsad
    </div>
  );
}

export default App;
