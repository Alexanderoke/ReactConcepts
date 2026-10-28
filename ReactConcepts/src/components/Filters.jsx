const OPTIONS = [
  { value: "all", label: "All"},
  {value: "active", label: "Active"},
  {value: "done", label: "Done"},
];

export default function Filters({current, onChange}){
  return(
    <div className="filters">
      {OPTIONS.map((option) =>(
        <button
        key={option.value}
        className={current === option.value ? "chip selected" : "chip"}
        onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}