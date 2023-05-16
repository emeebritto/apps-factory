import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';


const Board = Styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 5px;
`;

const Cell = Styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.player === 'BLUE' ? 'blue' : props.player === 'RED' ? 'red' : '#00195B')};
  cursor: pointer;
`;

const Msg = Styled.p`
  color: #fff;
`

const Button = Styled.button`
  margin: 10px 0;
`

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('BLUE');
  const [winner, setWinner] = useState(null);


  const handleClick = index => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setPlayer(player === 'BLUE' ? 'RED' : 'BLUE');
  };

  const restart = () => {
    setBoard(Array(9).fill(null));
    setPlayer('BLUE');
    setWinner(null);
  };

  useEffect(() => {
    const checkWinner = () => {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (const [a, b, c] of lines) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
      return null;
    };
    
    setWinner(checkWinner());
  },[board])

  return (
    <div>
      <Board>
        {board.map((cell, index) => (
          <Cell key={index} player={cell} onClick={() => handleClick(index)} />
        ))}
      </Board>
      {winner && <Msg>{`Winner: ${winner}`}</Msg>}
      <Button onClick={restart}>Restart</Button>
    </div>
  );
};

export default TicTacToe;
