
import { useEffect, useState } from 'react';
import './App.css';
import Player from './components/Player/Player';
import instaDelay from './helpers/instaDelay';

let delay1 = "insta";
let delay2 = "insta";
let delay3 = "insta";
let delay4 = "insta";
let delay5 = "insta";
let delay6 = "insta";

function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [x2, setX2] = useState(0);
  const [y2, setY2] = useState(18);
  const [x3, setX3] = useState(0);
  const [y3, setY3] = useState(18*2);
  const [x4, setX4] = useState(0);
  const [y4, setY4] = useState(18*3);
  const [x5, setX5] = useState(0);
  const [y5, setY5] = useState(18*4);
  const [x6, setX6] = useState(0);
  const [y6, setY6] = useState(18*5);

  const runAtStart = async () => {
    for (let i = 0; i < 400; i++) {
      setX(x => x + 2);
      setY(y => y + 0);
      await instaDelay();
    }
  };

  const runAlsoAtStart2 = async () => {
    for (let i = 0; i < 400; i++) {
      setX2(x2 => x2 + 2);
      setY2(y2 => y2 + 0);
      await instaDelay();
    }
  }

  const runAlsoAtStart3 = async () => {
    for (let i = 0; i < 400; i++) {
      setX3(x3 => x3 + 2);
      setY3(y3 => y3 + 0);
      await instaDelay();
    }
  }

  const runAlsoAtStart4 = async () => {
    for (let i = 0; i < 400; i++) {
      setX4(x4 => x4 + 2);
      setY4(y4 => y4 + 0);
      await instaDelay();
    }
  }

  const runAlsoAtStart5 = async () => {
    for (let i = 0; i < 400; i++) {
      setX5(x5 => x5 + 2);
      setY5(y5 => y5 + 0);
      await instaDelay();
    }
  }

  const runAlsoAtStart6 = async () => {
    for (let i = 0; i < 400; i++) {
      setX6(x6 => x6 + 2);
      setY6(y6 => y6 + 0);
      await instaDelay();
    }
  }

  useEffect(() => {
    runAtStart();
    runAlsoAtStart2();
    runAlsoAtStart3();
    runAlsoAtStart4();
    runAlsoAtStart5();
    runAlsoAtStart6();

    return () => {for (let i = 0; i <= setTimeout(()=>{}, 0); i++) clearTimeout(i)};
  }, []);

  return (
    <div className="App">
      <Player x={x} y={y}>delay {delay1}</Player>
      <Player x={x2} y={y2}>delay {delay2}</Player>
      <Player x={x3} y={y3}>delay {delay3}</Player>
      <Player x={x4} y={y4}>delay {delay4}</Player>
      <Player x={x5} y={y5}>delay {delay5}</Player>
      <Player x={x6} y={y6}>delay {delay6}</Player>
    </div>
  );
}

export default App;
