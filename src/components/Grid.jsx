import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { generateGridMatrix, createComplexPath } from "./gridLogic";
import "../styles/Grid.css";

const Grid = ({ rows, cols }) => {
  const [matrix, setMatrix] = useState([]);
  const [cells, setCells] = useState([]);

  useEffect(() => {
    const initialMatrix = generateGridMatrix(rows, cols);
    const updatedMatrix = createComplexPath(initialMatrix);
    setMatrix(updatedMatrix);

    const flatCells = updatedMatrix.flatMap((row, rowIndex) =>
      row.map((cell, colIndex) => ({
        key: `${rowIndex}-${colIndex}`,
        type: cell,
      }))
    );
    setCells(flatCells);
  }, [rows, cols]);

  const outerGridSize = {
    rows: rows + 2,
    cols: cols + 2,
  };

  return (
      <div
        className="grid"
        style={{
          gridTemplateRows: `repeat(${rows +2}, 70px)`,
          gridTemplateColumns: `repeat(${cols +2}, 70px)`,
        }}
      >
        {cells.map((cell) => (
          <Cell key={cell.key} type={cell.type} />
        ))}
      </div>
  );
};

export default Grid;
