import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

export default function AnswerCard(props) {
  const { zone, ab, ac, onRadioChange, radioValue } = props;
  return (
    <div style={{ margin: "15px 0" }}>
      <div style={{ fontSize: "40px" }}>{zone || "Not Found"}</div>
      <RadioGroup
        name="position"
        value={radioValue}
        onChange={onRadioChange}
        row
      >
        <FormControlLabel
          value={"AC"}
          control={<Radio color="primary" />}
          label={`AC $${ac || 0}`}
          labelPlacement="start"
        />
        <FormControlLabel
          value={"AB"}
          control={<Radio color="primary" />}
          label={`AB $${ab || 0}`}
          labelPlacement="start"
        />
      </RadioGroup>
    </div>
  );
}
