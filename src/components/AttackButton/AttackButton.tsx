
interface AttackButtonTypes {
  x: number;
  y: number;
}

function AttackButton(props: AttackButtonTypes): JSX.Element {
  const {x, y} = props;
  
  return (
    <button
      className="attackButton"
      style={{
        left: x,
        top: y,
      }}
      // onClick={buttonClickHandler}
    >
      Attack
    </button>
  );
}

export default AttackButton;
