
interface LetterTypes {
  parentX: number;
  parentY: number;
  x: number;
  y: number;
  children: string;
  onClick?: Function;
}

function Letter(props: LetterTypes): JSX.Element {
  const { parentX, parentY, x, y, children, onClick = () => {} } = props;
  
  const onLetterClickHandler = () => {
    onClick(children, x, y);
  }
  
  return (
    <div
      className="letter"
      style={{ top: parentY + 60*y, left: parentX + 60*x }}
      onClick={onLetterClickHandler}
    >
      {children}
    </div>
  );
}

export default Letter;
