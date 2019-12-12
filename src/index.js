import React, { useState } from "react";
import ReactDOM from "react-dom";
import Input from "@material-ui/core/Input";
import zones from "./zones";

import "./styles.css";

function App() {
  const [answer, setAnswer] = useState("");

  const [inputVal, setVal] = useState("");
  const reg = /^\d+$/;

  const onInputChange = function(event) {
    const val = event.target.value;
    if (!val) {
      setVal("");
      return;
    }
    if (!reg.test(val)) return;
    setVal(val);
    calcAnswer(val);
  };

  const calcAnswer = function(val) {
    if (val.length !== 5) {
      setAnswer("");
      return;
    }
    if (zones.get(1).has(+val)) {
      setAnswer("Zone 1 | I.V $85 | Rev. $65");
    }
    if (zones.get(2).has(+val)) {
      setAnswer("Zone 2 | I.V $95 | Rev. $75");
    }
    if (zones.get(3).has(+val)) {
      setAnswer("Zone 3 | I.V $105 | Rev. $85");
    }
  };

  return (
    <div
      className="App"
      style={{
        marginTop: "40%"
      }}
    >
      <Input onChange={onInputChange} value={inputVal} />
      <section style={{ fontSize: "50px" }} id="answer">
        {answer}
      </section>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
