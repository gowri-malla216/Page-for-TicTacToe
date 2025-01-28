import React from 'react'

const Cell = ({index, value, onClick, winLine}) => {
    const isWinningCell = winLine.includes(index)
    const className = `cell flex items-center justify-center text-2xl font-bold cursor-pointer ${isWinningCell? 'bg-green-400 rounded-4xl' : 'hover:bg-gray-300'}`
    return(
        <div className={className}
             onClick={onClick}>
            {value}
        </div>
    )
}



export default Cell