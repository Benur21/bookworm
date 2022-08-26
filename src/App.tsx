
import { useCallback, useEffect, useState } from 'react';
import Button from './components/Button/Button';
import Enemy from './components/Enemy/Enemy';
import LangSelector from './components/LangSelector/LangSelector';
import LetterSoup from './components/LetterSoup/LetterSoup';
import Sequence from './components/Sequence/Sequence';
import clearAllTimeouts from './helpers/clearAllTimeouts';
import { letters, letterSize, matrixSize } from './helpers/consts';
import getWords from './helpers/dictionaries';
import calcLetterSoupPos from './helpers/formulas/calcLetterSoupPos';
import normalize from './helpers/formulas/normalize';
import generateRandomLetter from './helpers/generateRandomLetter';
import i18n from './helpers/i18n';
import repeat from './helpers/repeat';
import { CurrentSequence, DictWords, LetterType } from './helpers/types';
import { useUpdateEffect } from 'usehooks-ts'
import Letter from './components/Letter/Letter';
import instaDelay from './helpers/instaDelay';
import calcLetterPos from './helpers/formulas/calcLetterPos';
import { LoadingIcon } from './assets/LoadingIcon';
import Stickman from './assets/Stickman';

function App(): JSX.Element {
  const [currValidWord, setCurrValidWord] = useState<string>('');
  const [dictWords, setDictWords] = useState<DictWords>({});
  const [letterUsagePerc, setLetterUsagePerc] = useState<{
    [key: string]: number;
  }>({});
  const [sequence, setSequence] = useState<CurrentSequence>([]);
  const [matrix, setMatrix] = useState<Array<Array<string>>>([]);
  
  const [enemyHealth, setEnemyHealth] = useState(50);
  const [level, setLevel] = useState(0);
  
  const [animationLetterX, setAnimationLetterX] = useState(0);
  const [animationLetterY, setAnimationLetterY] = useState(0);
  const [animationLetterChar, setAnimationLetterChar] = useState('');
  const [animationLetterVisible, setAnimationLetterVisible] = useState(false);
    
  const [loading, setLoading] = useState(true);
  
  const runAtStart = async () => {
    // make random matrix
    // let new_matrix = [];
    // for (let i = 0; i < matrixSize; i++) {
    //   let line : any = [];
    //   for (let j = 0; j < matrixSize; j++) {
    //     line.push(letters[Math.floor(Math.random() * letters.length)]);
    //   }
    //   new_matrix.push(line);
    // }
    // setMatrix(new_matrix);
    
    // Build fixed matrix at the start so it's easier to test
    setMatrix([
      ['a', 'p', 'b', 'o'],
      ['b', 'a', 'c', 'z'],
      ['m', 'e', 'u', 'a'],
      ['r', 'y', 'n', 'm'],
    ]);
    
    setLoading(true);
    console.time("loadingWords");
    setDictWords(await getWords());
    console.timeEnd("loadingWords");
    setLoading(false);
  };

  /**
   * Verifies if the word in the sequence is valid or not.
   * If it's valid it will add an effect to the Sequence.
   */
  const checkWord = useCallback(async () => {
    // Figure out what's written in the sequence
    let currentWord = '';
    repeat(sequence.length, (i: number) => {
      currentWord += sequence[i].char;
    });

    // reset while processing
    setCurrValidWord('');
    
    // Find if the word is in the dictionary
    let valid = dictWords[normalize(currentWord)];

    valid && console.log(valid);
    setCurrValidWord(valid || '');
  }, [sequence, dictWords]);
  
  useEffect(() => {
    runAtStart();

    return () => clearAllTimeouts();
  }, []);
  
  useEffect(() => {
    checkWord();

    return () => clearAllTimeouts();
  }, [sequence, checkWord]);
  
  useUpdateEffect(() => {
    // heavy job
    setLoading(true);
    const dictWordsString = Object.keys(dictWords).join("");
    
    let letterUsage: {[key: string]: number} = {};
    let total: number = 0;
    repeat(letters.length, (i: number) => {
      letterUsage[letters[i]] = dictWordsString.split(letters[i]).length - 1;
      total += dictWordsString.split(letters[i]).length - 1;
    });
    
    let letterUsagePerc = letterUsage;
    for (const letter in letterUsagePerc) {
      if (Object.prototype.hasOwnProperty.call(letterUsagePerc, letter)) {
        const count = letterUsagePerc[letter];
        letterUsagePerc[letter] = count/total*100;
      }
    }
    console.groupCollapsed("~ letterUsage");
    console.table(letterUsage);
    console.groupEnd();
    console.groupCollapsed("~ letterUsagePerc");
    console.table(letterUsagePerc);
    console.groupEnd();
    console.log("~ total letters", total);
    setLetterUsagePerc(letterUsagePerc);
    setLoading(false);

    return () => clearAllTimeouts();
  }, [dictWords]);
  
  const letterAddHandler = async (new_letter: LetterType) => {
    // remove letter from sequence
    setMatrix(prevMatrix =>
      prevMatrix.map((line, line_index) =>
        line.map((_, col_index) =>
          line_index === new_letter.left && col_index === new_letter.top
            ? ''
            : prevMatrix[line_index][col_index]
        )
      )
    );
    
    // animate
    const sequenceX =
      window.innerWidth / 2 - ((sequence.length + 1) * letterSize) / 2;
    
    const startPosX = calcLetterPos(calcLetterSoupPos().x, new_letter.left);
    const startPosY = calcLetterPos(calcLetterSoupPos().y, new_letter.top);
    const finalPosX = sequenceX + letterSize * sequence.length;
    const finalPosY = 100;
    const animationDuration = 500; // milliseconds
    
    setAnimationLetterX(startPosX);
    setAnimationLetterY(startPosY);
    setAnimationLetterChar(new_letter.char);
    setAnimationLetterVisible(true);
    
    const frameMs = 20;
    
    const distanceX = finalPosX - startPosX;
    const distanceY = finalPosY - startPosY;
    const n = Math.floor(animationDuration / frameMs);
    const incrX = (distanceX * frameMs) / animationDuration;
    const incrY = (distanceY * frameMs) / animationDuration;
    for (let i = 0; i < n; i++) {
      setAnimationLetterX(x => x + incrX);
      setAnimationLetterY(y => y + incrY);
      await instaDelay();
    }
    setAnimationLetterVisible(false);
    
    // add letter to sequence
    setSequence(prevSequence => [...prevSequence, new_letter]);
  };

  const sequence_x = window.innerWidth/2 - sequence.length*letterSize/2;
  
  const letterRemoveHandler = (
    letter_to_remove: LetterType,
    x_coord: number
  ) => {
    // Calculate the coordinates of each letter in the sequence and remove the
    // one in the received coordinate (only x is needed)
    setSequence(prevSequence =>
      prevSequence.filter(
        (_, index) => sequence_x + letterSize * index !== x_coord
      )
    );
    
    // Add the letter back to the matrix
    setMatrix(prevMatrix => {
      const newMatrix = prevMatrix;
      newMatrix[letter_to_remove.left][letter_to_remove.top] = letter_to_remove.char;
      return newMatrix;
    });
  };
  
  const attack = () => {
    // Get attack value
    const attackValue = sequence.length;
    
    console.log(`attack damage: ${attackValue}`);
    
    setEnemyHealth(currentHealth => {
      if (currentHealth - attackValue <= 0) {
        setLevel(currentLevel => currentLevel + 1);
      }
      return (((currentHealth - attackValue + 50) % 50)) || 50;
    });
    
    // Remove used word
    setSequence([]);
    
    // Replace empty spots
    let new_matrix: any[] = [];
    repeat(matrixSize, (i: number) => {
      let line: any = [];
      repeat(matrixSize, (j: number) => {
        if (matrix[i][j] === '') {
          line.push(generateRandomLetter(letterUsagePerc));
        } else {
          line.push(matrix[i][j]);
        }
      });
      new_matrix.push(line);
    });
    setMatrix(new_matrix);
  }
  
  const scramble = () => {
    setSequence([]);
    
    // make random matrix
    let new_matrix = [];
    for (let i = 0; i < matrixSize; i++) {
      let line : any = [];
      for (let j = 0; j < matrixSize; j++) {
        line.push(generateRandomLetter(letterUsagePerc));
      }
      new_matrix.push(line);
    }
    setMatrix(new_matrix);
  }

  return loading ? (
    <>
      <LoadingIcon />
      <div className="centered">{i18n("label.loading")}</div>
    </>
  ) : (
    <div className="App">
      <Button
        x={150}
        y={window.innerHeight - 70}
        className="scrambleButton"
        onClick={scramble}
      >
        {i18n('btn.scramble')}
      </Button>
      <Sequence
        y={100}
        sequence={sequence}
        onLetterClick={letterRemoveHandler}
        valid={currValidWord}
      />
      <LetterSoup
        x={calcLetterSoupPos().x}
        y={calcLetterSoupPos().y}
        matrix={matrix}
        onLetterClick={letterAddHandler}
      />
      <Button
        x={calcLetterSoupPos().x}
        y={window.innerHeight - 70}
        className="attackButton"
        active={currValidWord.length > 0}
        onClick={attack}
      >
        {i18n('btn.attack')}
      </Button>
      <Enemy
        x={window.innerWidth * 0.7071}
        y={50}
        health={enemyHealth}
        maxHealth={50}
        level={level}
      />
      <LangSelector x={50} y={50} />
      {animationLetterVisible && (
        <Letter
          x={animationLetterX}
          y={animationLetterY}
          letter={{ char: animationLetterChar, left: -1, top: -1 }}
        />
      )}
      <Stickman x={200} y={100} color="blue" />
    </div>
  );
}

export default App;
