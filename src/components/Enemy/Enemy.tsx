
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
      {level} {health}/{maxHealth}
    </div>
  );
}

export default Enemy;
