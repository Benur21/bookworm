import normalize from "../../helpers/formulas/normalize";
import { LetterType } from "../../helpers/types";

interface LetterTypes {
  x: number;
  y: number;
  letter: LetterType;
  bright?: boolean;
  onClick?: Function;
}

function Letter(props: LetterTypes): JSX.Element {
  const {
    x,
    y,
    letter,
    bright = false,
    onClick = () => {},
  } = props;
  
  const onLetterClickHandler = () => {
    onClick({...letter, char: normalize(letter.char)}, x);
  }
  
  return (
    <div
      className={`letterBorder ${bright ? 'bright' : ''}`}
      style={{
        left: x,
        top: y,
      }}
      onClick={onLetterClickHandler}
    >
      <div className={`letter ${bright ? 'bright' : ''}`}>{letter.char}</div>
    </div>
  );
}

export default Letter;
