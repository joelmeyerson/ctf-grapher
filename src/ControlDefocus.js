import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

// component for controlling defocus
export default function Controls(props) {

  // update defocus state
  function updateDefocus(e, defocus) {
    defocus *= 1e4;
    props.setDefocus(defocus);
  }

  return (
    <div>
      <Typography id="input-slider" gutterBottom>
        Defocus (μm)
      </Typography>
      <Slider
        value={props.defocus / 1e4}
        onChange={updateDefocus}
        aria-labelledby="input-slider"
        min={0.5}
        max={5}
        step={0.1}
      />
      <Typography id="discrete-slider-restrict" gutterBottom>
        {props.defocus / 1e4}
      </Typography>
    </div>
  );
}
