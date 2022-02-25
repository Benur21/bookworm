import Letter from '../Letter/Letter';

interface LetterSoupTypes {
  x: number;
  y: number;
  matrix: Array<Array<string>>;
  onLetterClick: Function;
}

function LetterSoup(props: LetterSoupTypes): JSX.Element {
  const { x, y, matrix, onLetterClick } = props;

  return (
    <div className="letter_soup" style={{ top: y, left: x }}>
      {matrix.map((line, lineIndex) =>
        line.map((letter, colIndex) => (
          <Letter
            x={60 * lineIndex + x}
            y={60 * colIndex + y}
            onClick={onLetterClick}
          >
            {letter}
          </Letter>
        ))
      )}
    </div>
  );
}

export default LetterSoup;
