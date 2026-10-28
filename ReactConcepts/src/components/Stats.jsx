export default function Stats({total, done, onClear}) {
  const percet = total === 0 ? 0: Math.round((done / total) * 100);
  
  return (
    <footer className="stats">
      <P>
        {done} of {total} done ({percent}%)
      </P>

      <div className="bar">
        <div className="fill" style={{width: `${percent}%`}}/>
      </div>
      {done > 0 && <button onClick={onClear}>Clear completed</button>}
    </footer>
  );
}