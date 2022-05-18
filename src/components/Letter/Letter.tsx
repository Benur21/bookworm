import { LetterType } from "../../helpers/types";

interface LetterTypes {
  x: number;
  y: number;
  letter: LetterType;
  onClick?: Function;
}

function Letter(props: LetterTypes): JSX.Element {
  const {
    x,
    y,
    letter,
    onClick = () => {},
  } = props;
  
  const onLetterClickHandler = () => {
    onClick(letter, x);
  }
  
  return (
    <div
      className="letter"
      style={{
        left: x,
        top: y,
      }}
      onClick={onLetterClickHandler}
    >
      {letter.char}
    </div>
  );
}

export default Letter;
