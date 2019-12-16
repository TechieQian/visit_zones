import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";

export default function History(props) {
  console.log(props.history);
  const acs = [0, 0, 0];
  const abs = [0, 0, 0];
  return (
    <div className="history">
      {props.history.map((item, idx) => {
        const { val, radioVal, inputVal, zone } = item;
        if (radioVal === "AC") {
          acs[zone - 1]++;
        } else abs[zone - 1]++;
        return (
          <div style={{ fontSize: "20px" }}>
            <IconButton>
              <CloseIcon onClick={() => props.deleteAmount(val, idx)} />
            </IconButton>
            {`${inputVal} ${zone} ${radioVal} $${val}`}
          </div>
        );
      })}
      <p />
      {acs.map((ac, i) => {
        if (!ac) return;
        return (
          <div style={{ fontSize: "18px" }}>
            &emsp;Zone {i + 1} AC x{ac} = ${ac * (65 + i * 10)}
          </div>
        );
      })}
      {abs.map((ab, i) => {
        if (!ab) return;
        return (
          <div style={{ fontSize: "18px" }}>
            &emsp;Zone {i + 1} AB x{ab} = ${ab * (85 + i * 10)}
          </div>
        );
      })}
      <p />
      <Button className="closeBtn" onClick={props.onClose}>
        关闭
      </Button>
    </div>
  );
}
