
import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    if (value === "AC") {
      setDisplay("");
      setResult("");
    } 
    else if (value === "DEL") {
      setDisplay(display.slice(0, -1));
    } 
    else if (value === "=") {
      calculate();
    } 
    else {
      setDisplay(display + value);
    }
  };

  const calculate = () => {
    try {
      let expression = display.replace(
        /(\d+\.?\d*)%/g,
        "($1/100)"
      );

      if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
        setResult("Error");
        return;
      }

      const answer = Function(
        '"use strict"; return (' + expression + ')'
      )();

      if (!Number.isFinite(answer)) {
        setResult("Error");
      } else {
        setResult(Number(answer.toFixed(8)).toString());
      }
    } catch {
      setResult("Error");
    }
  };

  const buttons = [
    "AC", "DEL", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "="
  ];

  return (
    <div className="main-container">
      <div className="calculator">

        <div className="header">
          <h2>NOVA</h2>
          <span>CALCULATOR</span>
        </div>

        <div className="display">
          <div className="expression">
            {display || "0"}
          </div>

          <div className="result">
            {result !== "" ? "= " + result : ""}
          </div>
        </div>

        <div className="buttons">
          {buttons.map((btn) => (
            <button
              key={btn}
              className={
                btn === "="
                  ? "equal"
                  : ["AC", "DEL"].includes(btn)
                  ? "special"
                  : ["%", "/", "*", "-", "+"].includes(btn)
                  ? "operator"
                  : btn === "0"
                  ? "zero"
                  : ""
              }
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>

        <p className="footer">
          React • Nova Calculator
        </p>

      </div>
    </div>
  );
}

export default App;