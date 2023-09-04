
interface StickmanTypes {
  x: number;
  y: number;
  color?: string;
  rotation?: number;
}

function Stickman(props: StickmanTypes): JSX.Element {
  const { x, y, color = "#ff0000", rotation = 0} = props;
  
  return (
    <div
      className="movable"
      style={{
        left: x,
        top: y,
        transform: `rotate(${rotation}deg)`
      }}
    >
      <svg width="104" height="254">
        <line x1="2" y1="252" x2="52" y2="177"    style={{stroke: color, strokeWidth: 2}} />
        <line x1="102" y1="252" x2="52" y2="177"  style={{stroke: color, strokeWidth: 2}} />
        <line x1="52" y1="177" x2="52" y2="82"    style={{stroke: color, strokeWidth: 2}} />
        <circle cx="52" cy="42" r="40" stroke={color} strokeWidth="2" fill="transparent" />
        <line x1="2" y1="167" x2="52" y2="92"     style={{stroke: color, strokeWidth: 2}} />
        <line x1="102" y1="167" x2="52" y2="92"   style={{stroke: color, strokeWidth: 2}} />
      </svg>
    </div>
  );
}

export default Stickman;
