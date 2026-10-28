export default function Stats({total, done, onClear}) {
  const percent = total === 0 ? 0: Math.round((done / total) * 100);
  
  return (
    <footer className="stats">
      <p>
        {done} of {total} done ({percent}%)
      </p>

      <div className="bar">
        <div className="fill" style={{width: `${percent}%`}}/>
      </div>
      {done > 0 && <button onClick={onClear}>Clear completed</button>}
    </footer>
  );
}