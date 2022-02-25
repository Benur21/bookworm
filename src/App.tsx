
import { useEffect, useState } from 'react';
import LetterSoup from './components/LetterSoup/LetterSoup';
import Sequence from './components/Sequence/Sequence';

function App(): JSX.Element {
  const [sequence, setSequence] = useState("");
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
  
  const letterClickHandler = (new_letter: string) => {
    setSequence(prevSequence => prevSequence + new_letter);
  };

  const letterRemoveHandler = (new_letter: string) => {
    setSequence(prevSequence => "");
  };

  return (
    <div className="App">
      <Sequence y={100} sequence={sequence} onLetterClick={letterRemoveHandler}/>
      <LetterSoup
        x={window.innerWidth / 2 - 230 / 2}
        y={400}
        matrix={matrix}
        onLetterClick={letterClickHandler}
      />
      adsad
    </div>
  );
}

export default App;
