import React, { useState } from "react";
import { getCtfData } from "./Ctf.js";
import * as d3 from "d3";

// adapted from: https://github.com/jukuznets/d3-react-chart

// constants for graph setup
const margin = { top: 40, right: 10, bottom: 15, left: 10 };
const width = 800 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

export default function Graph(props) {
  const [activeIndex, setActiveIndex] = useState(null);

  // data array
  var data = getCtfData(props.voltage, props.defocus);

  // define x-axis range
  const minValueX = 0.0;
  const maxValueX = 0.4;

  // define y-axis range
  const minValueY = -1.0;
  const maxValueY = 1.0;

  // data accessor for spatial frequency values (maps sf to X axis)
  const getX = d3
    .scaleLinear()
    .domain([minValueX, maxValueX])
    .range([0, width]);

  // data accessor for contrast values (maps contrast to Y axis)
  const getY = d3
    .scaleLinear()
    .domain([minValueY - 0.1, maxValueY + 0.1])
    .range([height, 0]);

  // data accessor for spatial frequency axis position (x axis)
  const getAxisX = (ref) => {
    const axisX = d3.axisBottom(getX).tickSize(-width).tickPadding(7);
    d3.select(ref).call(axisX).style("font-size", "1em");
  };

  // data accessor for contrast axis position (y axis)
  const getAxisY = (ref) => {
    const axisY = d3.axisLeft(getY).tickSize(-width).tickPadding(7);
    d3.select(ref).call(axisY).style("font-size", "1em");
  };

  // defines line path for ctf graph
  const linePath = d3
    .line()
    .x((d) => getX(d.sf))
    .y((d) => getY(d.contrast))
    .curve(d3.curveMonotoneX)(data);

  // area under the curve
  const areaPath = d3
    .area()
    .x((d) => getX(d.sf))
    .y0((d) => getY(d.contrast))
    .y1(() => getY(minValueY - 0.1))
    .curve(d3.curveMonotoneX)(data);

  // function to detect mouse movement and update tooltip with ctf value
  const handleMouseMove = (e) => {
    const getDataIndex = d3.bisector(function (d) {
      return d.sf;
    }).left;
    const x0 = getX.invert(d3.pointer(e)[0]);
    const index = getDataIndex(data, x0); // index for data array with value at mouse
    setActiveIndex(index);
  };

  // function to handle when mouse leaves graph area
  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div>
      <svg
        width={width}
        height={height}
        // prettier-ignore
        viewBox={`0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* horizontal lines on graph */}
        <g className="axis" ref={getAxisY} />
        {/* vertical lines on graph  */}
        <g
          className="axis axis-x"
          ref={getAxisX}
          transform={`translate(0,${height})`}
        />
        {/* line at zero */}
        <line
          x1="0"
          y1={height / 2}
          x2={width}
          y2={height / 2}
          stroke={"red"}
          strokeWidth={2}
        />
        {/* line for the curve */}
        <path strokeWidth={2} fill="none" stroke={"black"} d={linePath} />
        {/* area under the curve */}
        <path fill={"color"} d={areaPath} opacity={0.4} />

        {/* y axis label */}
        <text
          transform={"rotate(-90)"}
          x={0 - height / 2}
          y={-70 - margin.left}
          text-anchor="middle"
          dy="1em"
          font-size="1.4em"
        >
          {"Contrast  "}
        </text>
        {/* x axis label */}
        <text
          x={width / 2}
          y={height + 50}
          text-anchor="middle"
          font-size="1.4em"
        >
          {"Spatial frequency (1/Å)"}
        </text>
        {/* draw annotation at mouse position */}
        {data.map((el, index) => {
          return (
            <g key={index}>
              <line
                x1={getX(el.sf)}
                y1="0"
                x2={getX(el.sf)}
                y2={height}
                stroke={index === activeIndex ? "black" : null}
                strokeWidth={index === activeIndex ? 2 : 0}
              />
              <circle
                cx={getX(el.sf)}
                cy={getY(el.contrast)}
                r={index === activeIndex ? 8 : 0}
                fill={"color"}
                strokeWidth={index === activeIndex ? 2 : 0}
                stroke="white"
                style={{ transition: "ease-out 0.05s" }}
              />
              <rect
                x={index < 350 ? getX(el.sf) + 12 : getX(el.sf) - 76}
                y={getY(el.contrast) < 40 ? getY(el.contrast) + 5 : getY(el.contrast) - 30}
                fill={(index === activeIndex && index !== 0) ? "white" : "none"}
                width="65"
                height="30"
                rx="5"
                stroke={(index === activeIndex && index !== 0) ? "black" : "none"}
                stroke-width="2"
              />
              <text
                fill="black"
                x={index < 350 ? getX(el.sf) + 20 : getX(el.sf) - 68}
                y={getY(el.contrast) < 40 ? getY(el.contrast) + 25 : getY(el.contrast) - 10}
                textAnchor="start"
              >
                {(index === activeIndex && index !== 0)
                  ? Math.round((1 / el.sf) * 100) / 100 + " Å"
                  : ""}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
