export default function Button({ children, onClickFunction }) {
  return (
    <button onClick={onClickFunction} className="button">
      {children}
    </button>
  );
}
