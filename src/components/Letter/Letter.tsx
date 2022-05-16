import { LetterType } from "../../helpers/types";

interface LetterTypes {
  parentX: number;
  parentY: number;
  letter: LetterType;
  onClick?: Function;
}

function Letter(props: LetterTypes): JSX.Element {
  const { parentX, parentY, letter, onClick = () => {} } = props;
  
  const onLetterClickHandler = () => {
    onClick(letter.char, letter.left, letter.top);
  }
  
  return (
    <div
      className="letter"
      style={{
        top: parentY + 60 * letter.top,
        left: parentX + 60 * letter.left,
      }}
      onClick={onLetterClickHandler}
    >
      {letter.char}
    </div>
  );
}

export default Letter;
