import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { Typography } from "@material-ui/core";

type OfficesRadioProps = {
  currentOffice: string;
  updateMapCenter: any;
};

export default function OfficesRadio(props: OfficesRadioProps) {
  return (
    <FormControl component="fieldset">
      <Typography>Offices</Typography>
      <RadioGroup
        name="offices"
        value={props.currentOffice}
        onChange={(event) => props.updateMapCenter(event?.target.value)}
      >
        <FormControlLabel
          value="singapore"
          control={<Radio />}
          label="Singapore"
        />
        <FormControlLabel value="london" control={<Radio />} label="London" />
      </RadioGroup>
    </FormControl>
  );
}
