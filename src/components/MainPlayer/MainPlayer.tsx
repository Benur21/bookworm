
interface MainPlayerTypes {
  x: number;
  y: number;
}

function MainPlayer(props: MainPlayerTypes): JSX.Element {
  const {x, y} = props;
  
  return (
    <div className="movable" style={{ left: x, top: y }}>
      <img
        src={require(`../../assets/girl_no_background.png`)}
        alt=""
        width={230}
      />
    </div>
  );
}

export default MainPlayer;
