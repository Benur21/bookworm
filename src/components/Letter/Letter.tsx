
interface LetterTypes {
  x: number;
  y: number;
  children: string;
  onClick?: Function;
}

function Letter(props: LetterTypes): JSX.Element {
  const { x, y, children, onClick = () => {} } = props;
  
  const onLetterClickHandler = () => {
    onClick(children);
  }
  
  return (
    <div
      className="letter"
      style={{ top: y, left: x }}
      onClick={onLetterClickHandler}
    >
      {children}
    </div>
  );
}

export default Letter;
