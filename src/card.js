import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

export default function AnswerCard(props) {
  const { zone, iv, rev, onRadioChange, radioValue } = props;
  return (
    <div style={{ margin: "15px 0" }}>
      <div style={{ fontSize: "40px" }}>{zone || "Not Found"}</div>
      <RadioGroup
        aria-label="position"
        name="position"
        value={radioValue}
        onChange={onRadioChange}
        row
      >
        <FormControlLabel
          value={"rev"}
          control={<Radio color="primary" />}
          label={`Rev $${rev || 0}`}
          labelPlacement="start"
        />
        <FormControlLabel
          value={"iv"}
          control={<Radio color="primary" />}
          label={`I.V $${iv || 0}`}
          labelPlacement="start"
        />
      </RadioGroup>
    </div>
  );
}
