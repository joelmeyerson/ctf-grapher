import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

// voltage marks
const marks = [
  {
    value: 100000,
    label: "100",
  },
  {
    value: 120000,
    label: "120",
  },
  {
    value: 200000,
    label: "200",
  },
  {
    value: 300000,
    label: "300",
  },
];

// marks for voltage
function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

// component for controlling voltage
export default function ControlVoltage(props) {

  // update voltage state
  function updateVoltage(voltage) {
    props.setVoltage(voltage);
  }

  return (
    <div>
      <Typography id="discrete-slider-restrict" gutterBottom>
        Voltage (kV)
      </Typography>
      <Slider
        defaultValue={300000}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={updateVoltage}
        aria-labelledby="discrete-slider-restrict"
        step={null}
        valueLabelDisplay="off"
        marks={marks}
        min={100000}
        max={300000}
      />
    </div>
  );
}
