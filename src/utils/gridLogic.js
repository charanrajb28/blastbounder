export const generateGridMatrix = (rows, cols) => {
    // Create a grid with an additional layer of cells (empty cells marked as "E")
    const matrix = Array.from({ length: rows + 2 }, (_, row) =>
      Array.from({ length: cols + 2 }, (_, col) =>
        row === 0 || row === rows + 1 || col === 0 || col === cols + 1 ? "E" : "X"
      )
    );
  
    const maxIslandCells = Math.floor(rows * cols * 0.6);
    const minIslandCells = Math.floor(rows * cols * 0.4);
    let whiteCellCount = 0;
  
    const addWhiteCell = (row, col) => {
      if (matrix[row][col] === "X") {
        matrix[row][col] = "W";
        whiteCellCount++;
      }
    };
  
    const placeRandomIsland = (centerRow, centerCol, blockSize) => {
      const halfBlock = Math.floor(blockSize / 2);
      for (let r = -halfBlock; r <= halfBlock; r++) {
        for (let c = -halfBlock; c <= halfBlock; c++) {
          const rr = centerRow + r;
          const cc = centerCol + c;
          if (
            rr > 0 &&
            rr <= rows &&
            cc > 0 &&
            cc <= cols &&
            whiteCellCount < maxIslandCells
          ) {
            addWhiteCell(rr, cc);
          }
        }
      }
    };
  
    // Place islands randomly
    while (whiteCellCount < minIslandCells || whiteCellCount < maxIslandCells * 0.9) {
      const randomRow = Math.floor(Math.random() * rows) + 1; // +1 for inner grid
      const randomCol = Math.floor(Math.random() * cols) + 1; // +1 for inner grid
      const blockSize = Math.floor(Math.random() * 3) + 3; // 3x3 to 5x5
      placeRandomIsland(randomRow, randomCol, blockSize);
    }
  
    // Set start and goal positions within the inner grid
    const startRow = Math.floor(Math.random() * 3) + 1; // +1 for inner grid
    const startCol = Math.floor(Math.random() * 3) + 1;
    const goalRow = rows - 3 + Math.floor(Math.random() * 3) + 1; // +1 for inner grid
    const goalCol = cols - 3 + Math.floor(Math.random() * 3) + 1;
  
    matrix[startRow][startCol] = "S";
    matrix[goalRow][goalCol] = "G";
  
    return matrix;
  };
  
  export const createComplexPath = (matrix) => {
    const rows = matrix.length;
    const cols = matrix[0].length;
  
    const [startRow, startCol] = findCell(matrix, "S");
    const [goalRow, goalCol] = findCell(matrix, "G");
  
    let currentRow = startRow;
    let currentCol = startCol;
  
    while (currentRow !== goalRow || currentCol !== goalCol) {
      if (matrix[currentRow][currentCol] === "X") {
        matrix[currentRow][currentCol] = "P"; // Path cell
      }
  
      const canMoveDown = currentRow < goalRow;
      const canMoveRight = currentCol < goalCol;
  
      if (canMoveDown && canMoveRight) {
        if (Math.random() < 0.5) currentRow++;
        else currentCol++;
      } else if (canMoveDown) {
        currentRow++;
      } else if (canMoveRight) {
        currentCol++;
      }
    }
  
    surroundPathWithCells(matrix);
    markBoundaryAdjacentToIslands(matrix);
    return matrix;
  };
  
  const surroundPathWithCells = (matrix) => {
    const rows = matrix.length;
    const cols = matrix[0].length;
  
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1], // Adjacent cells
      [-1, -1], [-1, 1], [1, -1], [1, 1], // Diagonal cells
    ];
  
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (matrix[row][col] === "P") {
          directions.forEach(([dr, dc]) => {
            const newRow = row + dr;
            const newCol = col + dc;
  
            if (
              newRow >= 0 &&
              newRow < rows &&
              newCol >= 0 &&
              newCol < cols &&
              matrix[newRow][newCol] === "X"
            ) {
              matrix[newRow][newCol] = "W"; // Surround path with white cells
            }
          });
        }
      }
    }
  };
  
  const markBoundaryAdjacentToIslands = (matrix) => {
    const rows = matrix.length;
    const cols = matrix[0].length;
  
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1], [1,1],[1,-1],[-1,1],[-1,-1]// Adjacent cells
    ];
  
    for (let row = 1; row < rows - 1; row++) {
      for (let col = 1; col < cols - 1; col++) {
        if (matrix[row][col] === "W"||matrix[row][col] === "G"||matrix[row][col] === "S") {
          directions.forEach(([dr, dc]) => {
            const newRow = row + dr;
            const newCol = col + dc;
  
            if (matrix[newRow][newCol] === "E"||matrix[newRow][newCol] === "X") {
              matrix[newRow][newCol] = "B"; // Mark boundary adjacent to islands
            }
          });
        }
      }
    }
  };
  
  const findCell = (matrix, type) => {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === type) return [i, j];
      }
    }
    return [-1, -1];
  };
  