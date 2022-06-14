
interface AttackButtonTypes {
  x: number;
  y: number;
  active: boolean;
  onClick: Function;
}

function AttackButton(props: AttackButtonTypes): JSX.Element {
  const {x, y, active, onClick} = props;
  
  return (
    <button
      className={`attackButton movable ${active ? "" : "red"}`}
      style={{
        left: x,
        top: y,
      }}
      onClick={() => onClick()}
      disabled={!active}
    >
      Attack
    </button>
  );
}

export default AttackButton;
