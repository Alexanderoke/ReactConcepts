import { useState, useRef, useEffect } from "react";

export default function TaskForm ({onAdd}) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  useEffect(() =>{
    inputRef.current.focus();
  }, []);
  
  function handleSubmit(event) {
    event.preventDefault();
    const clean =text.trim();
    if (clean ==="") return;
    onAdd(clean);
    setText("");
    inputRef.current.focus();
  }

  return (
    <form className="form"  onSubmit={handleSubmit}>
      <input
      ref={inputRef}
      value={text}
      onChange={(event)=>setText(event.target.value)}
      />
      <button type="submit" >Add</button>
    </form>
  );
}