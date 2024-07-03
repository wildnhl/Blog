export function Button(props) {
  const isBackground = props.background
    ? { background: '#E8E8E8', padding: '16px 30px' }
    : null;

  return (
    <button className="btn d-flex" style={isBackground}>
      <img style={{ width: '24px' }} src={props.imagePath} alt={props.alt} />
      {props.text ? <span className="ms-3">{props.text}</span> : ''}
    </button>
  );
}
