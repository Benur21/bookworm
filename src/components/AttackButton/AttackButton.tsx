import i18n from "../../helpers/i18n";

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
      {i18n("btn.attack")}
    </button>
  );
}

export default AttackButton;
