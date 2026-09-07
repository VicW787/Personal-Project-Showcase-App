import { useId } from "react";
import { useState, useEffect } from "react";

function TextField({ label, name, value, onChange, hint, error, type = "text", inputRef }) {
  const id = useId();
 
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
 
      <div className={error ? "input-wrap has-error" : "input-wrap"}>
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          ref={inputRef}
          placeholder="Type here"
          aria-invalid={error ? "true" : "false"}
        />
        {error && <span className="error-icon" aria-hidden="true">!</span>}
      </div>
 
      {error ? (
        <p className="error-text" role="alert">{error}</p>
      ) : (
        hint && <p className="hint-text">{hint}</p>
      )}
    </div>
  );
}
 
export default TextField;