import { useState } from 'react';

export const useGame = () => {
  const [turnColor, setTurnColor] = useState(1);
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, 0],
    [1, -1],
  ];
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const onClick = (x: number, y: number) => {
    console.log(x, y);
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));

    let k = false;
    if (board[y][x] === 0) {
      for (const [y2, x2] of directions) {
        if (
          board[y + y2] !== undefined &&
          board[y + y2][x + x2] !== undefined &&
          board[y + y2][x + x2] === 3 - turnColor //逆の色の石が付近に置けるかどうか
        ) {
          for (let i = 1; i < 8; i++) {
            if (
              board[y + y2 * i] !== undefined &&
              board[y + y2 * i][x + x2 * i] !== undefined &&
              board[y + y2 * i][x + x2 * i] === turnColor //升目の端から端まで
            ) {
              let a = 0;
              for (let i2 = 1; i2 <= i; i2++) {
                if (board[y + y2 * i2][x + x2 * i2] !== 0) {
                  a++; //???
                }
              }
              if (a === i) {
                newBoard[y][x] = turnColor;
                k = true;
                for (let i2 = 1; i2 < i; i2++) {
                  newBoard[y + y2 * i2][x + x2 * i2] = turnColor;
                }
              }
              break;
            }
          }
        }
      }
      if (k) {
        setTurnColor(3 - turnColor);
        setBoard(newBoard);
      }
    }
  };
  return { board, onClick };
};
