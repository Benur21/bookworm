import { CurrentSequence } from "../../helpers/types";
import Letter from "../Letter/Letter";

interface SequenceTypes {
  y: number;
  sequence: CurrentSequence;
  onLetterClick: Function;
}

function Sequence(props: SequenceTypes): JSX.Element {
  const { y, sequence, onLetterClick } = props;
  
  const x = window.innerWidth/2 - sequence.length*60/2;
  
  return (
    <>
      {sequence.map((letter, index) => (
        <Letter
          x={x + 60 * index}
          y={y}
          letter={letter}
          onClick={onLetterClick}
          key={index}
        />
      ))}
    </>
  );
}

export default Sequence;
