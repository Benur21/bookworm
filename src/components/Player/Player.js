import './player.css';

function Player(props) {
  return (
    <div className="player" style={{top: props.y, left: props.x}}>
      {props.children}
    </div>
  );
}

export default Player;
