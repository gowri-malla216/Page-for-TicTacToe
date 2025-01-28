import React, {useState} from "react"
import Cell from "./Cell"

const Board = ({x, y, updateScore})=> {
    const [game, setGame] = useState(Array(9).fill(null))
    const [currentPlayer, setCurrentPlayer] = useState('X')
    const [winner, setWinner] = useState(null)
    const [winLine, setWinLine] = useState(Array(3).fill(null))
    const calculateWinner = (squares) => {
          const winLines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
          ]
          for(let i=0; i<winLines.length; i++){
            const [x, y, z] = winLines[i];
            if(squares[x] && squares[x] === squares[y] && squares[x] === squares[z] ){
                setWinLine([x, y, z])
              setWinner(squares[x])
              updateScore(squares[x])
              return;
            }
          }
          for(let i=0; i<squares.length;i++){
            if(squares[i] == null){
                return;
            }
          }
          setWinner('Tie')
          updateScore('Tie')
          return;
        }

    const handleClick = (index) =>{
        if(game[index] || winner) return;
        const newBoard = game.slice()
        newBoard[index] = currentPlayer
        setGame(newBoard)
        calculateWinner(newBoard)
        setCurrentPlayer(currentPlayer === 'X'?'O':'X')

    }
    return(
        <div
            className="absolute border-0"
            style={{
                left: `${x}px`,
                top: `${y}px`,
                width: '180px',
                height: '180px',
                position: 'absolute',
            }}
        >
            <div className="relative w-full h-full">
                <div className="realistic-line absolute top-0 left-1/3 w-[2px] h-full bg-black"></div>
                <div className="realistic-line absolute top-0 left-2/3 w-[2px] h-full bg-black"></div>

                <div className="realistic-line absolute left-0 top-1/3 h-[2px] w-full bg-black"></div>
                <div className="realistic-line absolute left-0 top-2/3 h-[2px] w-full bg-black"></div>

                {/* Cells */}
                <div className="grid grid-rows-3 grid-cols-3 w-full h-full">
                {game.map((cell, index) => (
                    <Cell
                    key={index}
                    index = {index}
                    value={cell}
                    winLine = {winLine}
                    onClick={() => handleClick(index)}
                    />
                ))}
                </div>
            </div>
                {winner ? (
                    <div className="mt-2 text-sm font-bold text-green-500">
                    {winner === 'Tie'? "It's a Tie!" : `${winner} Wins!`}
                    </div>
                ) : (
                    <div className="mt-2 text-sm font-medium">
                        Turn : {currentPlayer}
                    </div>
                )}
        </div>
    )
}

export default Board