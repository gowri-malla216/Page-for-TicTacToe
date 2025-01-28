import { useState } from "react"
import Board from "./components/Board"
import image from "./images/icon.jpg"

const App = () => {
  const [boards, setBoards] = useState([])
  const [score, setScore] = useState({'X':0, 'O':0, 'Tie':0})
  const isOverlap = (x,y) =>{
    const threshold = 180
    return boards.some((board) => {
      const dx = Math.abs(x-board.x)
      const dy = Math.abs(y-board.y)
      return dx<threshold && dy<threshold
    })
  }
  const handleBoard = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    if(!(isOverlap(x, y))) setBoards((prev) => [...prev, {id: Date.now(), x, y}])
  }

  const updateScore = (winner) =>{
    if(winner){
      setScore((prev) => ({
        ...prev,
        [winner]: prev[winner] + 1,
      }))
    }
  }
  const eraseBoards = () => {
    setBoards([]);
  }
  const resetGame = () => {
    setBoards([])
    setScore({ 'X': 0, 'O': 0, 'Tie': 0 })
  }

  return(
    <div className="h-screen w-screen bg-gray-200 relative overflow-hidden" onClick={handleBoard}>
    <div
        className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2"
        style={{ zIndex: 10 }}
      >
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl" onClick={(e)=>{e.stopPropagation()}}>
          <p className="outline-none rounded-full px-4 py-1 shadow-lg bg-white text-black">X: {score.X}</p>
          <p className="outline-none rounded-full px-4 py-1 shadow-lg bg-white text-black">O: {score.O}</p>
          <p className="outline-none rounded-full px-4 py-1 shadow-lg bg-white text-black">Ties: {score.Tie}</p>
          <button
          onClick={eraseBoards}
          className="px-4 py-1 rounded-lg shadow has-tooltip bg-white">
            <span class='tooltip rounded shadow-lg p-1 bg-gray-700 text-white -mt-8 -ml-15'>Archive all boards</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
              <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3Z" />
              <path fillRule="evenodd" d="M13 6H3v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6ZM5.72 7.47a.75.75 0 0 1 1.06 0L8 8.69l1.22-1.22a.75.75 0 1 1 1.06 1.06L9.06 9.75l1.22 1.22a.75.75 0 1 1-1.06 1.06L8 10.81l-1.22 1.22a.75.75 0 0 1-1.06-1.06l1.22-1.22-1.22-1.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </button>
          <button
          onClick={resetGame}
          className="px-4 py-1 rounded-lg shadow has-tooltip bg-white">
            <span class='tooltip rounded shadow-lg p-1 bg-gray-700 text-white -mt-8 -ml-10'>Reset Game</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M8 3.5c-.771 0-1.537.022-2.297.066a1.124 1.124 0 0 0-1.058 1.028l-.018.214a.75.75 0 1 1-1.495-.12l.018-.221a2.624 2.624 0 0 1 2.467-2.399 41.628 41.628 0 0 1 4.766 0 2.624 2.624 0 0 1 2.467 2.399c.056.662.097 1.329.122 2l.748-.748a.75.75 0 1 1 1.06 1.06l-2 2.001a.75.75 0 0 1-1.061 0l-2-1.999a.75.75 0 0 1 1.061-1.06l.689.688a39.89 39.89 0 0 0-.114-1.815 1.124 1.124 0 0 0-1.058-1.028A40.138 40.138 0 0 0 8 3.5ZM3.22 7.22a.75.75 0 0 1 1.061 0l2 2a.75.75 0 1 1-1.06 1.06l-.69-.69c.025.61.062 1.214.114 1.816.048.56.496.996 1.058 1.028a40.112 40.112 0 0 0 4.594 0 1.124 1.124 0 0 0 1.058-1.028 39.2 39.2 0 0 0 .018-.219.75.75 0 1 1 1.495.12l-.018.226a2.624 2.624 0 0 1-2.467 2.399 41.648 41.648 0 0 1-4.766 0 2.624 2.624 0 0 1-2.467-2.399 41.395 41.395 0 0 1-.122-2l-.748.748A.75.75 0 1 1 1.22 9.22l2-2Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      {boards.map((board) => (
        <Board key={board.id} x={board.x} y={board.y} updateScore = {updateScore}/>
      ))}
    </div>
  )
}

export default App;


