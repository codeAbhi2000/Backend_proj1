import React from "react";
import CountUp from "react-countup";

export default function Counter({ number}) {
  return (
    <div className="number">
      <CountUp duration={2} end={number} />
      
    </div>
  );
}