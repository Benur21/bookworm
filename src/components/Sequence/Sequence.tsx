import { letterSize } from "../../helpers/consts";
import { CurrentSequence, LetterType } from "../../helpers/types";
import Letter from "../Letter/Letter";

interface SequenceTypes {
  y: number;
  sequence: CurrentSequence;
  valid: string; // '' if invalid, the valid word if valid
  onLetterClick: Function;
}

function Sequence(props: SequenceTypes): JSX.Element {
  const { y, sequence, valid, onLetterClick } = props;
  
  const x = window.innerWidth/2 - sequence.length*letterSize/2;
  
  let newSequence: CurrentSequence = [];
  if (valid) {
    sequence.forEach((letter, index)=>{
      const newLetter: LetterType = {...letter, char: valid[index]};
      newSequence.push(newLetter)
    })
  }
  
  return (
    <>
      {(valid ? newSequence : sequence).map((letter, index) => (
        <Letter
          x={x + letterSize * index}
          y={y}
          letter={letter}
          bright={valid.length > 0}
          onClick={onLetterClick}
          key={index}
        />
      ))}
    </>
  );
}

export default Sequence;
