import calcLetterPos from '../../helpers/calcLetterPos';
import { letterSize } from '../../helpers/consts';
import Letter from '../Letter/Letter';

interface LetterSoupTypes {
  x: number;
  y: number;
  matrix: Array<Array<string>>;
  onLetterClick: Function;
}

function LetterSoup(props: LetterSoupTypes): JSX.Element {
  const { x, y, matrix, onLetterClick } = props;

  /*
   * Example matrix:
   * [ line1,
   *   line2,
   *   line3,
   *   line4 ]
   *   
   * Example line:
   * [col1, col2, col3, col4]
   */
  return (
    <div className="letter_soup" style={{ top: y, left: x }}>
      {matrix.map((line, lineIndex) =>
        line.map(
          (letter, colIndex) =>
            letter && (
              <Letter
                x={calcLetterPos(x, lineIndex)}
                y={calcLetterPos(y, colIndex)}
                letter={{
                  left: lineIndex,
                  top: colIndex,
                  char: letter,
                }}
                onClick={onLetterClick}
                key={lineIndex + ',' + colIndex}
              />
            )
        )
      )}
    </div>
  );
}

export default LetterSoup;
