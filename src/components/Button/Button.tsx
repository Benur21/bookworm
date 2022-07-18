interface ButtonTypes {
  x: number;
  y: number;
  className?: string;
  active?: boolean;
  onClick: Function;
  children?: React.ReactNode;
}

function Button(props: ButtonTypes): JSX.Element {
  const { x, y, className = '', active = true, onClick, children = '' } = props;

  return (
    <button
      className={`movable ${active ? '' : 'red'} ${className}`}
      style={{
        left: x,
        top: y,
      }}
      onClick={() => onClick()}
      disabled={!active}
    >
      {children}
    </button>
  );
}

export default Button;
