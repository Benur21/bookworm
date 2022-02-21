
import { useEffect, useState } from 'react';
import './App.css';
import Player from './components/Player/Player';
import delay from './helpers/delay';
import instaDelay from './helpers/instaDelay';

let delay1 = 11;
let delay2 = "insta";

function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [x2, setX2] = useState(0);
  const [y2, setY2] = useState(18);
  const [test, setTest] = useState([]);

  const runAtStart = async () => {
    for (let i = 0; i < 400; i++) {
      setX(x => x + 2);
      setY(y => y + 0);
      console.log("1");
      // setTest(prevTest => [...prevTest, "1"]);
      await delay(delay1);
    }
  };

  const runAlsoAtStart = async () => {
    for (let i = 0; i < 400; i++) {
      setX2(x2 => x2 + 2);
      setY2(y2 => y2 + 0);
      console.log("2");
      // setTest(prevTest => [...prevTest, "2"]);
      await instaDelay();
    }
  }

  useEffect(() => {
    runAtStart();
    runAlsoAtStart();

    return () => {for (let i = 0; i <= setTimeout(()=>{}, 0); i++) clearTimeout(i)};
  }, []);

  return (
    <div className="App">
      <Player x={x} y={y}>delay {delay1}</Player>
      <Player x={x2} y={y2}>delay {delay2}</Player>
    </div>
  );
}

export default App;
