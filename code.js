// Factory function for creating player objects.
const gamePlayer = (name, selection) => {
    return { name, selection }
}
// Testing factory func.
const dario = gamePlayer("Dario", "x")
console.log(dario)

// Create gamebord object. 

const gameBoard = (() => {
    // Defining parts of the gameboard.
    const gameBoardDomElem = document.getElementById('gameboard')
    const gameSquareTL = document.getElementById('topleft')
    const gameSquareML = document.getElementById('midleft')
    const gameSquareBL = document.getElementById('bottomleft')
    const gameSquareTM = document.getElementById('topmid')
    const gameSquareCM = document.getElementById('centermid')
    const gameSquareBM = document.getElementById('bottommid')
    const gameSquareTR = document.getElementById('topright')
    const gameSquareMR = document.getElementById('midright')
    const gameSquareBR = document.getElementById('bottomright')
    
    
    // Defining the gameboard positions in object. 
    // When the player or computer picks a position,
    // This will update.
    // Then an evaluation will take place.
    // Once the game is won and event will be triggered to mod the dom.

    const gameBoardPositions = {
       rowOne:[0,0,0],
       rowTwo:[0,0,0],
       rowThree:[0,0,0]
    }
    let playerWins = false
    let cpuWins = false
    const gameEval = () => {
        // Horizontal wins Player
        return gameBoard.rowOne == [1,1,1] ? playerWins = true 
        : gameBoard.rowTwo == [1,1,1] ? playerWins = true
        : gameBoard.rowThree == [1,1,1] ? playerWins = true
        // Vertical Wins Player
        : gameBoard.rowOne[0] == 1 && gameBoard.rowTwo[0] == 1 && gameBoard.rowThree[0] == 1 ? playerWins = true
        : gameBoard.rowOne[1] == 1 && gameBoard.rowTwo[1] == 1 && gameBoard.rowThree[1] == 1 ? playerWins = true
        : gameBoard.rowOne[2] == 1 && gameBoard.rowTwo[2] == 1 && gameBoard.rowThree[2] == 1 ? playerWins = true
        // Cross Wins Player
        : gameBoard.rowOne[0] == 1 && gameBoard.rowTwo[1] == 1 && gameBoard.rowThree[2] == 1 ? playerWins = true 
        : gameBoard.rowOne[2] == 1 && gameBoard.rowTwo[1] == 1 && gameBoard.rowThree[1] == 1 ? playerWins = true 
        // Horizontal wins CPU
        : gameBoard.rowOne == [2,2,2] ? cpuWins = true 
        : gameBoard.rowTwo == [2,2,2] ? cpuWins = true
        : gameBoard.rowThree == [2,2,2] ? cpuWins = true
        // Vertical Wins CPU
        : gameBoard.rowOne[0] == 2 && gameBoard.rowTwo[0] == 2 && gameBoard.rowThree[0] == 2 ? cpuWins = true 
        : gameBoard.rowOne[1] == 2 && gameBoard.rowTwo[1] == 2 && gameBoard.rowThree[1] == 2 ? cpuWins = true
        : gameBoard.rowOne[2] == 2 && gameBoard.rowTwo[2] == 2 && gameBoard.rowThree[2] == 2 ? cpuWins = true
        // Cross Wins CPU
        : gameBoard.rowOne[0] == 2 && gameBoard.rowTwo[1] == 2 && gameBoard.rowThree[2] == 2 ? cpuWins = true 
        : gameBoard.rowOne[2] == 2 && gameBoard.rowTwo[1] == 2 && gameBoard.rowThree[1] == 2 ? cpuWins = true
    }
})();