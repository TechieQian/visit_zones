import React, { useState } from "react";
import ReactDOM from "react-dom";
import Input from "@material-ui/core/Input";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";

import zones from "./zones";

import "./styles.css";

function App() {
  const [answer, setAnswer] = useState("");
  const [radioVal, setRadio] = useState("iv");
  const [ivVal, setIv] = useState();
  const [revVal, setRev] = useState();
  const [totalAmount, setTotal] = useState(0);
  const [inputVal, setVal] = useState("");
  const [amountCount, setAmountCount] = useState(0);
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

  const onRadioChange = function(event) {
    setRadio(event.target.value);
  };
  const calcAnswer = function(val) {
    if (val.length !== 5) {
      setAnswer("");
      return;
    }
    if (zones.get(1).has(+val)) {
      setAnswer("Zone 1");
      setRev(65);
      setIv(85);
    }
    if (zones.get(2).has(+val)) {
      setAnswer("Zone 2");
      setRev(75);
      setIv(95);
    }
    if (zones.get(3).has(+val)) {
      setAnswer("Zone 3");
      setRev(85);
      setIv(105);
    }
  };

  const reset = function() {
    setVal("");
    setIv();
    setRev();
    setAnswer("");
  };

  const buttonClick = function() {
    const val = radioVal === "iv" ? ivVal : revVal;
    setTotal(totalAmount + val);
    setAmountCount(amountCount + 1);
    reset();
  };

  const onClear = function() {
    setTotal(0);
    setAmountCount(0);
  };
  return (
    <div
      className="App"
      style={{
        marginTop: "40vh"
      }}
    >
      <Input onChange={onInputChange} value={inputVal} />
      <label>I.V ${ivVal} </label>
      <Radio onChange={onRadioChange} value="iv" checked={radioVal === "iv"} />
      <label>Rev. ${revVal} </label>
      <Radio
        onChange={onRadioChange}
        value="rev"
        checked={radioVal === "rev"}
      />
      <section style={{ fontSize: "50px" }} id="answer">
        {answer}
      </section>
      <Button
        style={{ marginRight: "5px" }}
        disabled={answer === ""}
        onClick={buttonClick}
        variant="contained"
        color="primary"
      >
        Ok
      </Button>
      <Button onClick={onClear} variant="contained" color="secondary">
        Clear
      </Button>
      <section style={{ marginTop: "15px", fontSize: "40px" }}>
        ${totalAmount} ({amountCount})
      </section>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
