import Stickman from "../../assets/Stickman";
import i18n from "../../helpers/i18n";
import ProgressBar from "../ProgressBar/ProgressBar";

interface EnemyTypes {
  x: number;
  y: number;
  health: number;
  maxHealth?: number;
  level?: number;
}

function Enemy(props: EnemyTypes): JSX.Element {
  const {x, y, health, maxHealth = 100, level = 0} = props;
  
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
      <Stickman x={100} y={40} />
    </div>
  );
}

export default Enemy;
