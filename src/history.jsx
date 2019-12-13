import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";

export default function History(props) {
  return (
    <div className="history">
      {props.history.map((item, idx) => {
        const { val, radioVal, inputVal, answer } = item;
        return (
          <div style={{ fontSize: "20px" }}>
            <IconButton>
              <CloseIcon onClick={() => props.deleteAmount(val, idx)} />
            </IconButton>
            {`${inputVal} ${answer} ${radioVal} $${val}`}
          </div>
        );
      })}
      <Button className="closeBtn" onClick={props.onClose}>
        关闭
      </Button>
    </div>
  );
}
