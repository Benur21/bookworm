
import { useEffect } from 'react';
import './App.css';
import LetterSoup from './components/LetterSoup/LetterSoup';

function App(): JSX.Element {
  const runAtStart = async () => {
    
  };

  useEffect(() => {
    runAtStart();

    return () => {
      for (let i = 0; i <= Number(setTimeout(() => {}, 0)); i++) clearTimeout(i);
    };
  }, []);

  return (
    <div className="App">
      <LetterSoup x={200} y={300} matrix={[["a", "b", "c"],["d", "e", "f"]]} />
      adsad
    </div>
  );
}

export default App;
