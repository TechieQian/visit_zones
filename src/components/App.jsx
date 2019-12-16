import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Card from "./card";
import calculateZone from "./calculation";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import Modal from "@material-ui/core/Modal";
import History from "./history";
import { connect } from "react-redux";
import { setZone } from "../store/actions";

import "../styles.css";

function App(props) {
  const [radioVal, setRadio] = useState("AC");
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
    if (!reg.test(val) || val.length > 5) return;
    setVal(val);
    calczone(val);
  };

  const onRadioChange = function(event) {
    setRadio(event.target.value);
  };

  const calczone = function(val) {
    let zoneInfo;
    if ((zoneInfo = calculateZone(val) || val.length !== 5)) {
      let { zone, ab, ac } = zoneInfo;
      props.dispatchZone({ zone, ab, ac });
    } else {
      setZone("");
      return;
    }
  };

  const reset = function() {
    props.dispatchZone({ zone: "", ab: 0, ac: 0 });
    setVal("");
    setCount(1);
  };

  const buttonClick = function() {
    const { ab, ac } = props.zoneState;
    const val = radioVal === "AB" ? ab : ac;
    let _hist = history;
    setTotal(totalAmount + count * val);
    setAmountCount(amountCount + 1);
    for (let i = 0; i < count; i++) {
      let historyItem = {
        zone,
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

  const { zone, ab, ac } = props.zoneState;

  return (
    <div
      className="App"
      style={{
        marginTop: "15vh"
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
          <span style={{ marginLeft: "15px" }}>x{count}</span>
        </div>
      </div>

      <Card
        ac={ac}
        ab={ab}
        zone={zone}
        radioValue={radioVal}
        onRadioChange={onRadioChange}
      />

      <Button
        style={{ marginRight: "5px" }}
        disabled={!zone}
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
        <div>
          <History
            history={history}
            deleteAmount={removeAmount}
            onClose={handleClose}
          />
        </div>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => ({
  zoneState: state
});

const mapDispatchToProps = dispatch => {
  return {
    dispatchZone: obj => dispatch(setZone(obj))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
