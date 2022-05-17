
import { useEffect, useState } from 'react';
import LetterSoup from './components/LetterSoup/LetterSoup';
import Sequence from './components/Sequence/Sequence';
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
  
  useEffect(() => {
    console.log(sequence);
  }, [sequence]);
  
  const letterAddHandler = (new_letter: LetterType) => {
    setSequence(prevSequence => [...prevSequence, new_letter]);
  };

  const letterRemoveHandler = (letter_to_remove: string) => {
    console.log("~ letter_to_remove", letter_to_remove);
    // setSequence(prevSequence => prevSequence);
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
