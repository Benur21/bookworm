interface ProgressBarTypes {
  x: number;
  y: number;
  minVal?: number;
  maxVal: number;
  currentVal: number;
}

function ProgressBar(props: ProgressBarTypes): JSX.Element {
  const {x, y, minVal = 0, maxVal, currentVal} = props;
  
  return (
    <div
      className={`progress-bar movable`}
      style={{
        left: x,
        top: y,
        width: '310px',
        height: '30px',
        padding: '2px',
        backgroundColor: 'red',
      }}
    >
      <div
        style={{
          width: `${(currentVal / maxVal) * 100}%`,
          height: '100%',
          whiteSpace: 'nowrap',
          backgroundColor: 'green',
        }}
      >
        {' '}
      </div>
      <div
        style={{
          position: 'absolute',
          top: "50%",
          left: "50%",
          transform: 'translate(-50%, -50%)',
        }}
      >
        {currentVal} / {maxVal}
      </div>
    </div>
  );
}

export default ProgressBar;
