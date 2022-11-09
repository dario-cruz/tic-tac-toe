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
    const gameResetButton = document.getElementById('resetgame')
    
    // Eventlistners for gameBoard elements.
    gameSquareTL.addEventListener('click', () => {
        gameSquareTL.innerHTML = 'X'
    })
    gameSquareML.addEventListener('click', () => {
        gameSquareML.innerHTML = 'X'
    })
    
    // Defining the gameboard positions in object. 
    const gameBoardPositions = {
        rowOne:[0,0,0],
        rowTwo:[0,0,0],
        rowThree:[0,0,0]
    }

    // Define player status'
    let playerWins = false
    let cpuWins = false

    // Reset for gameboard
    const gameBoardReset = () => {
        // reset the dom elemts
        gameSquareBL.innerHTML = ''
        gameSquareBM.innerHTML = ''
        gameSquareBR.innerHTML = ''
        gameSquareCM.innerHTML = ''
        gameSquareML.innerHTML = ''
        gameSquareMR.innerHTML = ''
        gameSquareTL.innerHTML = ''
        gameSquareTM.innerHTML = ''
        gameSquareTR.innerHTML = ''
        // reset the object and arrays
        gameBoardPositions.rowOne = [0,0,0]
        gameBoardPositions.rowTwo = [0,0,0]
        gameBoardPositions.rowThree = [0,0,0]
        // reset flags for cpu and player win.
        playerWins = false
        cpuWins = false
    }
    // Eventlistener for game reset button.
    gameResetButton.addEventListener('click', gameBoardReset())

    // When the player or computer picks a position,
    // This will update.
    // Then an evaluation will take place.
    // Once the game is won and event will be triggered to mod the dom.


    
    // Board Eval Logic, detects who won the game. 
    const gameEval = () => {
        // Horizontal Wins Player
        if (gameBoard.rowOne == [1,1,1] || gameBoard.rowTwo == [1,1,1] || gameBoard.rowThree == [1,1,1] ) {
            playerWins = true
            cpuWins = false
        } else if (
            // Vertical Wins Player
            gameBoard.rowOne[0] == 1 && gameBoard.rowTwo[0] == 1 && gameBoard.rowThree[0] == 1 ||
            gameBoard.rowOne[1] == 1 && gameBoard.rowTwo[1] == 1 && gameBoard.rowThree[1] == 1 ||
            gameBoard.rowOne[2] == 1 && gameBoard.rowTwo[2] == 1 && gameBoard.rowThree[2] == 1 ) {
                playerWins = true
            } else if (
                // Cross Wins Player
                gameBoard.rowOne[0] == 1 && gameBoard.rowTwo[1] == 1 && gameBoard.rowThree[2] == 1 ||
                gameBoard.rowOne[2] == 1 && gameBoard.rowTwo[1] == 1 && gameBoard.rowThree[1] == 1
                ) {
                    playerWins = true
                    cpuWins = false
                } else if (
                    // Horizontal wins CPU
                    gameBoard.rowOne == [2,2,2] ||
                    gameBoard.rowTwo == [2,2,2] ||
                    gameBoard.rowThree == [2,2,2]
                    ){
                        cpuWins = true
                        playerWins = false
                    } else if (
                        // Vertical Wins CPU
                        gameBoard.rowOne[0] == 2 && gameBoard.rowTwo[0] == 2 && gameBoard.rowThree[0] == 2 ||
                        gameBoard.rowOne[1] == 2 && gameBoard.rowTwo[1] == 2 && gameBoard.rowThree[1] == 2 ||
                        gameBoard.rowOne[2] == 2 && gameBoard.rowTwo[2] == 2 && gameBoard.rowThree[2] == 2
                    ) {
                        cpuWins = true
                        playerWins = false
                    } else if (
                        // Cross Wins CPU
                        gameBoard.rowOne[0] == 2 && gameBoard.rowTwo[1] == 2 && gameBoard.rowThree[2] == 2 ||
                        gameBoard.rowOne[2] == 2 && gameBoard.rowTwo[1] == 2 && gameBoard.rowThree[1] == 2
                    ){
                        cpuWins = true
                        playerWins = false
                    } else {
                        console.log('Whelp, how the hell did we get here????')
                    }
    }
    return {
        gameEval,
    }
})();