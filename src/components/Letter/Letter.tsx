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
      className="letterBorder"
      style={{
        left: x,
        top: y,
      }}
      onClick={onLetterClickHandler}
    >
      <div className="letter">
        {letter.char}
      </div>
    </div>
  );
}

export default Letter;
