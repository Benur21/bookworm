import Letter from "../Letter/Letter";

interface SequenceTypes {
  y: number;
  sequence: string;
  onLetterClick: Function;
}

function Sequence(props: SequenceTypes): JSX.Element {
  const { y, sequence, onLetterClick } = props;
  
  const x = window.innerWidth/2 - sequence.length*60/2;
  
  return (
    <>
      {sequence.split('').map((letter, index) => (
        <Letter x={x + index * 60} y={y} onClick={onLetterClick}>
          {letter}
        </Letter>
      ))}
    </>
  );
}

export default Sequence;
