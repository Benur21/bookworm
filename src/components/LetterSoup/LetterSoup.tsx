import Letter from '../Letter/Letter';
import './LetterSoup.css';

interface LetterSoupTypes {
  x: number;
  y: number;
  matrix: Array<Array<string>>;
}

function LetterSoup(props: LetterSoupTypes): JSX.Element {
  const { x, y, matrix } = props;

  return (
    <div className="letter_soup" style={{ top: y, left: x }}>
      {matrix.map((line, lineIndex) =>
        line.map((letter, colIndex) => (
          <Letter x={50 * lineIndex + x} y={50 * colIndex + y}>
            {letter}
          </Letter>
        ))
      )}
    </div>
  );
}

export default LetterSoup;
