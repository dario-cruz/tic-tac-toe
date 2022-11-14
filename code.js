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
// Game status area, will tell the user who won or if the game is a tie.
const gameStatus = document.getElementById('condition')


// Factory function for creating player objects.
const gamePlayer = (name, selection) => {
    return { name, selection }
}
// Testing factory func.
const dario = gamePlayer("Dario", "x")
console.log(dario)

// Create gameboard object. 

const gameBoard = (() => {
    
    // Defining the game board positions in array.
    // Changed to array as could not get object to work. 
    // Need to investigate further. 
    let gameBoardPositions = ["", "", "", "", "", "", "", "", ""]
    
    // Define player status'
    let playerWins = false
    let cpuWins = false
    
    // Players choice value.
    let playerGamePiece = ""
    let cpuGamePiece = ""

    // Values of the game pieces. 
    // let cpuPieceVal = 2
    // let playerPieceVal = 1

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
        gameBoardPositions[0] = `${playerGamePiece}`
    })
    gameSquareML.addEventListener('click', () => {
        gameSquareML.innerHTML = `${playerGamePiece}`
        gameBoardPositions[3] = `${playerGamePiece}`
    })
    gameSquareBL.addEventListener('click', () => {
        gameSquareBL.innerHTML = `${playerGamePiece}`
        gameBoardPositions[6] = `${playerGamePiece}`
    })
    gameSquareTM.addEventListener('click', () => {
        gameSquareTM.innerHTML = `${playerGamePiece}`
        gameBoardPositions[1] = `${playerGamePiece}`
    })
    gameSquareCM.addEventListener('click', () => {
        gameSquareCM.innerHTML = `${playerGamePiece}`
        gameBoardPositions[4] = `${playerGamePiece}`
    })
    gameSquareBM.addEventListener('click', () => {
        gameSquareBM.innerHTML = `${playerGamePiece}`
        gameBoardPositions[7] = `${playerGamePiece}`
    })
    gameSquareTR.addEventListener('click', () => {
        gameSquareTR.innerHTML = `${playerGamePiece}`
        gameBoardPositions[2] = `${playerGamePiece}`
    })
    gameSquareMR.addEventListener('click', () => {
        gameSquareMR.innerHTML = `${playerGamePiece}`
        gameBoardPositions[5] = `${playerGamePiece}`
    })
    gameSquareBR.addEventListener('click', () => {
        gameSquareBR.innerHTML = `${playerGamePiece}`
        gameBoardPositions[8] = `${playerGamePiece}`
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
        gameBoardPositions = ["", "", "", "", "", "", "", "", ""]
        // reset flags for cpu and player win.
        playerWins = false
        cpuWins = false
        playerGamePiece = ""
        cpuGamePiece = ""
        gameStatus.innerHTML = "Please choose a game piece."
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
        if(playerGamePiece == "" && cpuGamePiece == "") {
            // If the player hasn't made a selection. 
            gameStatus.innerHTML = "Hey man, select a game piece"
        } else if (gameBoardPositions[0] == playerGamePiece && gameBoardPositions[1] == playerGamePiece && gameBoardPositions[2] == playerGamePiece ||
            // Horizontal Wins Player
            gameBoardPositions[3] == playerGamePiece && gameBoardPositions[4] == playerGamePiece && gameBoardPositions[5] == playerGamePiece ||
            gameBoardPositions[6] == playerGamePiece && gameBoardPositions[7] == playerGamePiece && gameBoardPositions[8] == playerGamePiece) {
            playerWins = true
            cpuWins = false
            gameStatus.innerHTML = "The Player Wins! 😁"
        } else if (
            // Vertical Wins Player
            gameBoardPositions[0] == playerGamePiece && gameBoardPositions[3] == playerGamePiece && gameBoardPositions[6] == playerGamePiece ||
            gameBoardPositions[1] == playerGamePiece && gameBoardPositions[4] == playerGamePiece && gameBoardPositions[7] == playerGamePiece ||
            gameBoardPositions[2] == playerGamePiece && gameBoardPositions[5] == playerGamePiece && gameBoardPositions[8] == playerGamePiece) {
            playerWins = true
            cpuWins = false
            gameStatus.innerHTML = "The Player Wins! 😁"
        } else if (
            // Cross Wins Player
            gameBoardPositions[0] == playerGamePiece && gameBoardPositions[4] == playerGamePiece && gameBoardPositions[8] == playerGamePiece ||
            gameBoardPositions[2] == playerGamePiece && gameBoardPositions[4] == playerGamePiece && gameBoardPositions[6] == playerGamePiece) {
                playerWins = true
                cpuWins = false
                gameStatus.innerHTML = "The Player Wins! 😁"
        } else if (
            // Horizontal wins CPU
            gameBoardPositions[0] == cpuGamePiece && gameBoardPositions[1] == cpuGamePiece && gameBoardPositions[2] == cpuGamePiece ||
            gameBoardPositions[3] == cpuGamePiece && gameBoardPositions[4] == cpuGamePiece && gameBoardPositions[5] == cpuGamePiece ||
            gameBoardPositions[6] == cpuGamePiece && gameBoardPositions[7] == cpuGamePiece && gameBoardPositions[8] == cpuGamePiece) {
                playerWins = false
                cpuWins = true
                gameStatus.innerHTML = "The CPU Wins.... 😵"
        } else if (
            // Vertical Wins CPU
            gameBoardPositions[0] == cpuGamePiece && gameBoardPositions[3] == cpuGamePiece && gameBoardPositions[6] == cpuGamePiece ||
            gameBoardPositions[1] == cpuGamePiece && gameBoardPositions[4] == cpuGamePiece && gameBoardPositions[7] == cpuGamePiece ||
            gameBoardPositions[2] == cpuGamePiece && gameBoardPositions[5] == cpuGamePiece && gameBoardPositions[8] == cpuGamePiece) {
                playerWins = false
                cpuWins = true
                gameStatus.innerHTML = "The CPU Wins.... 😵"    
        } else if (
            // Cross Wins CPU
            gameBoardPositions[0] == cpuGamePiece && gameBoardPositions[4] == cpuGamePiece && gameBoardPositions[8] == cpuGamePiece ||
            gameBoardPositions[2] == cpuGamePiece && gameBoardPositions[4] == cpuGamePiece && gameBoardPositions[6] == cpuGamePiece) {
                playerWins = false
                cpuWins = true
                gameStatus.innerHTML = "The CPU Wins.... 😵"
        } else {
                gameStatus.innerHTML = "The game is a tie nobody wins. 😖"
        }
    }
    
    // Condition checking for if a person wins the game.
    const checkWinner = () => {
        if (playerWins == true) {

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

            if (gameBoardPositions[randomRow][Math.floor(Math.random() * gameBoardPositions[randomRow].length)] == 0) {
                gameBoardPositions[randomRow][Math.floor(Math.random() * gameBoardPositions[randomRow].length)] = 2

            }

        }
        
        gameRandomRowItem()

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



// Does not seam to be away to choose random object prop and then make random selection of array on
// said prop. Will need to change all obj out to array and go forward with that.
