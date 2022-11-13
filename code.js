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
// Piece selection buttons
const gameChooseX = document.getElementById('chooseX')
const gameChooseO = document.getElementById('chooseO')



// Factory function for creating player objects.
const gamePlayer = (name, selection) => {
    return { name, selection }
}
// Testing factory func.
const dario = gamePlayer("Dario", "x")
console.log(dario)

// Create gamebord object. 

const gameBoard = (() => {
    
    // Defining the game board positions in object. 
    const gameBoardPositions = {
        rowOne:[0,0,0],
        rowTwo:[0,0,0],
        rowThree:[0,0,0]
    }
    
    // Define player status'
    let playerWins = false
    let cpuWins = false
    
    // Players choice value.
    let playerGamePiece = ""
    let cpuGamePiece = ""

    // Values of the game peices. 
    let cpuPieceVal = 2
    let playerPieceVal = 1

    // Allow for player to choose game piece.
    gameChooseO.addEventListener('click', () => {
        playerGamePiece = "O"
        cpuGamePiece = "X"
    })
    gameChooseX.addEventListener('click', () => {
        playerGamePiece = "X"
        cpuGamePiece = "O"
    })
    
    // EventListener for gameBoard elements.
    gameSquareTL.addEventListener('click', () => {
        gameSquareTL.innerHTML = `${playerGamePiece}`
        gameBoardPositions.rowOne[0] = playerPieceVal
    })
    gameSquareML.addEventListener('click', () => {
        gameSquareML.innerHTML = `${playerGamePiece}`
        gameBoardPositions.rowTwo[0] = playerPieceVal
    })
    gameSquareBL.addEventListener('click', () => {
        gameSquareBL.innerHTML = `${playerGamePiece}`
        gameBoardPositions.rowThree[0] = playerPieceVal
    })
    gameSquareTM.addEventListener('click', () => {
        gameSquareTM.innerHTML = `${playerGamePiece}`
        gameBoardPositions.rowOne[1] = playerPieceVal
    })
    gameSquareCM.addEventListener('click', () => {
        gameSquareCM.innerHTML = `${playerGamePiece}`
        gameBoardPositions.rowTwo[1] = playerPieceVal
    })
    gameSquareBM.addEventListener('click', () => {
        gameSquareBM.innerHTML = `${playerGamePiece}`
        gameBoardPositions.rowThree[1] = playerPieceVal
    })
    gameSquareTR.addEventListener('click', () => {
        gameSquareTR.innerHTML = `${playerGamePiece}`
        gameBoardPositions.rowOne[2] = playerPieceVal
    })
    gameSquareMR.addEventListener('click', () => {
        gameSquareMR.innerHTML = `${playerGamePiece}`
        gameBoardPositions.rowTwo[2] = playerPieceVal
    })
    gameSquareBR.addEventListener('click', () => {
        gameSquareBR.innerHTML = `${playerGamePiece}`
        gameBoardPositions.rowThree[2] = playerPieceVal
    })



    // Reset for gameboard
    const gameBoardReset = () => {
        // reset the dom elements.
        gameSquareBL.innerHTML = ""
        gameSquareBM.innerHTML = ""
        gameSquareBR.innerHTML = ""
        gameSquareCM.innerHTML = ""
        gameSquareML.innerHTML = ""
        gameSquareMR.innerHTML = ""
        gameSquareTL.innerHTML = ""
        gameSquareTM.innerHTML = ""
        gameSquareTR.innerHTML = ""
        // reset the object and arrays
        gameBoardPositions.rowOne = [0,0,0]
        gameBoardPositions.rowTwo = [0,0,0]
        gameBoardPositions.rowThree = [0,0,0]
        // reset flags for cpu and player win.
        playerWins = false
        cpuWins = false
        playerGamePiece = ""
        cpuGamePiece = ""
    }

    // Eventlistener for game reset button.
    gameResetButton.addEventListener('click', () => {
        gameBoardReset()
    })

    // When the player or computer picks a position,
    // This will update.
    // Then an evaluation will take place.
    // Once the game is won and event will be triggered to mod the dom.
    // Board Eval Logic, detects who won the game. 
    const gameEval = () => {
        // Horizontal Wins Player
        if (gameBoardPositions.rowOne == [1,1,1] || gameBoardPositions.rowTwo == [1,1,1] || gameBoardPositions.rowThree == [1,1,1] ) {
            playerWins = true
            cpuWins = false
        } else if (
            // Vertical Wins Player
            gameBoardPositions.rowOne[0] == 1 && gameBoardPositions.rowTwo[0] == 1 && gameBoardPositions.rowThree[0] == 1 ||
            gameBoardPositions.rowOne[1] == 1 && gameBoardPositions.rowTwo[1] == 1 && gameBoardPositions.rowThree[1] == 1 ||
            gameBoardPositions.rowOne[2] == 1 && gameBoardPositions.rowTwo[2] == 1 && gameBoardPositions.rowThree[2] == 1 ) {
                playerWins = true
                cpuWins = false
            } else if (
                // Cross Wins Player
                gameBoardPositions.rowOne[0] == 1 && gameBoardPositions.rowTwo[1] == 1 && gameBoardPositions.rowThree[2] == 1 ||
                gameBoardPositions.rowOne[2] == 1 && gameBoardPositions.rowTwo[1] == 1 && gameBoardPositions.rowThree[1] == 1
                ) {
                    playerWins = true
                    cpuWins = false
                } else if (
                    // Horizontal wins CPU
                    gameBoardPositions.rowOne == [2,2,2] ||
                    gameBoardPositions.rowTwo == [2,2,2] ||
                    gameBoardPositions.rowThree == [2,2,2]
                    ){
                        playerWins = false
                        cpuWins = true
                    } else if (
                        // Vertical Wins CPU
                        gameBoardPositions.rowOne[0] == 2 && gameBoardPositions.rowTwo[0] == 2 && gameBoardPositions.rowThree[0] == 2 ||
                        gameBoardPositions.rowOne[1] == 2 && gameBoardPositions.rowTwo[1] == 2 && gameBoardPositions.rowThree[1] == 2 ||
                        gameBoardPositions.rowOne[2] == 2 && gameBoardPositions.rowTwo[2] == 2 && gameBoardPositions.rowThree[2] == 2
                        ) {
                            playerWins = false
                            cpuWins = true
                        } else if (
                            // Cross Wins CPU
                            gameBoardPositions.rowOne[0] == 2 && gameBoardPositions.rowTwo[1] == 2 && gameBoardPositions.rowThree[2] == 2 ||
                            gameBoardPositions.rowOne[2] == 2 && gameBoardPositions.rowTwo[1] == 2 && gameBoardPositions.rowThree[1] == 2
                            ){
                                playerWins = false
                                cpuWins = true
                            } else {
                                console.log('Whelp, how the hell did we get here????')
                            }
    }
                        
    // CPU random play logic.
    const cpuRandomPlay = () => {
        
        const cpuEmptySpaces = {
            rowOne: gameBoardPositions.rowOne.map(isThisEmpty),
            rowTwo: gameBoardPositions.rowTwo.map(isThisEmpty),
            rowThree: gameBoardPositions.rowThree.map(isThisEmpty),
        }

        // Selects a random row from the empty space object.
        const gameRandomRow = (obj) => {
            const rows = Object.keys(obj)
            return rows[Math.floor(Math.random() * rows.length)]
        };
        //Select random place from the array or the row. 
        //Play the space if the it is free. 
        const gameRandomRowItem = () => {
            let randomRow = gameRandomRow(gameBoardPositions)
            if (gameBoardPositions.hasOwnProperty(randomRow)) {
                cpuSelection = gameBoardPositions[randomRow][Math.floor(Math.random() * gameBoardPositions[randomRow].length)]
                // console.log(cpuSelection)
            }
            while (cpuSelection != 0) {
                cpuSelection = gameBoardPositions[randomRow][Math.floor(Math.random() * gameBoardPositions[randomRow].length)]
                console.log(cpuSelection)
            }
            return cpuSelection
        }
        
        console.log(gameRandomRowItem())

        //Checks for empty board spaces
        //Returns array of true or false on locations.
        function isThisEmpty(num) {
            if (num == 0) {
                return true
            } else {
                return false
            }
        }
        
        
        // console.log(cpuEmptySpaces)        
    }
                        
                        
    return {
        gameBoardPositions,
        gameEval,
        cpuRandomPlay,
    }
})();

