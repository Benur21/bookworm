import Stickman from "../../assets/Stickman";
import i18n from "../../helpers/i18n";
import instaDelay from "../../helpers/instaDelay";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useEffect, useState } from 'react';

interface EnemyTypes {
  x: number;
  y: number;
  health: number;
  maxHealth?: number;
  level?: number;
  dead?: boolean;
}

function Enemy(props: EnemyTypes): JSX.Element {
  const {x, y, health, maxHealth = 100, level = 0, dead = false} = props;
  
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    setRotation(0);
    if (dead) {
      (async () => {
        for (let i = 0; i < 45; i++) {
          setRotation(prevRotation => prevRotation + 2);
          await instaDelay();
        }
      })();
    }
  }, [dead]);
  
  return (
    <div
      className={`enemy movable`}
      style={{
        left: x,
        top: y,
      }}
    >
      <ProgressBar x={0} y={0} maxVal={maxHealth} currentVal={health} />
      {/* <ProgressBar x={0} y={0} maxVal={100} currentVal={5} /> */}
      <br />
      <br />
      {i18n("label.level")}: {level}
      <Stickman x={100} y={40} rotation={rotation} />
    </div>
  );
}

export default Enemy;
