import './Letter.css';

interface LetterTypes {
  x: number;
  y: number;
  children: string;
}

function Letter(props: LetterTypes): JSX.Element {
  return (
    <div className="letter" style={{top: props.y, left: props.x}}>
      {props.children}
    </div>
  );
}

export default Letter;
