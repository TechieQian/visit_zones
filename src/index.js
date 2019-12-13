import React, { useState } from "react";
import ReactDOM from "react-dom";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import zones from "./zones";
import AnswerCard from "./card";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import Modal from "@material-ui/core/Modal";
import History from "./history";

import "./styles.css";

function App() {
  const [answer, setAnswer] = useState("");
  const [radioVal, setRadio] = useState("iv");
  const [ivVal, setIv] = useState();
  const [revVal, setRev] = useState();
  const [totalAmount, setTotal] = useState(0);
  const [inputVal, setVal] = useState("");
  const [amountCount, setAmountCount] = useState(0);
  const [count, setCount] = useState(1);
  const [history, setHistory] = useState([]);
  const [open, setOpen] = useState(false);

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
    setCount(1);
  };

  const buttonClick = function() {
    const val = radioVal === "iv" ? ivVal : revVal;
    let _hist = history;
    setTotal(totalAmount + count * val);
    setAmountCount(amountCount + 1);
    for (let i = 0; i < count; i++) {
      let historyItem = {
        answer,
        radioVal,
        val,
        inputVal
      };
      _hist.push(historyItem);
    }
    setHistory(_hist);
    reset();
  };

  const removeAmount = (val, idx) => {
    setTotal(totalAmount - val);
    setHistory(history.slice(0, idx).concat(history.slice(idx + 1)));
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClear = function() {
    setTotal(0);
    setAmountCount(0);
    setHistory([]);
  };
  return (
    <div
      className="App"
      style={{
        marginTop: "10vh"
      }}
    >
      <div className="input">
        <Input onChange={onInputChange} value={inputVal} />
        <div className="iconbar">
          <IconButton onClick={() => setCount(count + 1)}>
            <Add />
          </IconButton>
          <IconButton onClick={() => setCount(count - 1)}>
            <Remove />
          </IconButton>
          <span>x{count}</span>
        </div>
      </div>

      <AnswerCard
        rev={revVal}
        iv={ivVal}
        zone={answer}
        radioValue={radioVal}
        onRadioChange={onRadioChange}
      />

      <Button
        style={{ marginRight: "5px" }}
        disabled={answer === ""}
        onClick={buttonClick}
        variant="contained"
        color="primary"
      >
        输入
      </Button>
      <Button onClick={onClear} variant="contained" color="secondary">
        清除
      </Button>

      <section style={{ margin: "15px 0", fontSize: "40px" }}>
        <span>${totalAmount}</span>
        <Button
          style={{ marginLeft: "15px" }}
          variant="outlined"
          color="primary"
          onClick={handleOpen}
          disabled={history.length < 1}
        >
          历史 ({history.length})
        </Button>
      </section>
      <Modal style={{ overflow: "scroll" }} open={open} onClose={handleClose}>
        <History history={history} deleteAmount={removeAmount} />
      </Modal>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
