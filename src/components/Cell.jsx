import React from "react";
import "../styles/Cell.css";

const Cell = ({ type }) => {
  let className = "cell";

  if (type === "S") className += " start";
  else if (type === "G") className += " goal";
  else if (type === "W" || type === "P") className += " white";
  else if (type === "B") className += " boundary"; // Add class for boundary cells

  return <div className={className}></div>;
};

export default Cell;
