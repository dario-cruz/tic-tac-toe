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
// Buttons
const gameResetButton = document.getElementById('resetgame')
const gameResetScore = document.getElementById('resetscore')
const gameNewGame = document.getElementById('newgame')
// Game status area, will tell the user who won or if the game is a tie.
const gameStatus = document.getElementById('condition')
// Score Board Areas.
const playerOneText = document.getElementById('player_one_text')
const playerTwoText = document.getElementById('player_two_text')
const gameSquares = document.querySelectorAll('.square')


// Factory function for creating player objects.
const gamePlayer = (name, selection) => {
    return { name, selection }
}

// Modal for player selection.
const startModal = document.getElementById('start_modal')
const modalBtn = document.getElementById('submit_button')
window.addEventListener('load', () => {
    startModal.style.display = "block"
})
window.addEventListener('click', () => {
    if (event.target == startModal) {
        startModal.style.display = "none"
    }
})

// Define Empty player objs.
// Will get filled by form element.
let playerOne = {}
let playerTwo = {}

// Override form behavior can capture data.
const gameForm = document.getElementById('game_data')
gameForm.addEventListener('submit', () => {
    // Stop page reload.
    event.preventDefault()

    // Extract form data.
    const formData = new FormData(gameForm)
    // Close modal.
    startModal.style.display = "none"
    // Create empty obj and convert from weird FD obj to usable one.
    const formDataObj = {}
    formData.forEach((value,key) => (formDataObj[key] = value))
    console.log(formDataObj)
    // Create player objects from processed data. 
    playerOne = gamePlayer(formDataObj.player_one_name, formDataObj.player_one_select)
    playerTwo = gamePlayer(formDataObj.player_two_name, formDataObj.player_two_select)

    IsItPlayerOneTurn = true
    gameBoard.gameScore()
    // gameBoard.initGame()
    gameStatus.innerHTML = `${playerOne.name}` + " It's your turn"
    return {
        // Return all needed vals and keep the rest private. 
        playerOne,
        playerTwo,
    }
})
// Player Win status.
let IsItPlayerOneTurn = false
let IsItPlayerTwoTurn = false

// Game functionality in Module pattern and IIFE. 
const gameBoard = (() => {
    
    // Defining the game board positions in array.
    // Changed to array as could not get object to work. 
    // Need to investigate further. 
    let gameBoardPositions = ["", "", "", "", "", "", "", "", ""]
    
    let playerOneWins = false
    let playerTwoWins = false
    
    console.log(gameSquares)
    // Create event listeners for the start of the game.
    const initGame = (() => {
        // Define player status'
        gameSquares.forEach((i) => {
            i.addEventListener('click', () => {
                let squareCell
                let squareCellRaw = i.getAttribute('cell')
                squareCell = Number(squareCellRaw)
                console.log(squareCell)
                console.log(IsItPlayerOneTurn)
                console.log(IsItPlayerTwoTurn)
                if(IsItPlayerOneTurn == true && gameBoardPositions[squareCell] == "") {
                    i.innerHTML = playerOne.selection
                    gameBoardPositions[squareCell] = playerOne.selection
                    console.log(gameBoardPositions)
                    IsItPlayerOneTurn = false
                    IsItPlayerTwoTurn = true
                    gameStatus.innerHTML = `${playerTwo.name}` + " It's your turn"
                    gameEval()
                } else if (IsItPlayerTwoTurn == true && gameBoardPositions[squareCell] == "") {
                    i.innerHTML = playerTwo.selection
                    gameBoardPositions[squareCell] = playerTwo.selection
                    IsItPlayerOneTurn = true
                    IsItPlayerTwoTurn = false
                    gameStatus.innerHTML = `${playerOne.name}` + " It's your turn"
                    gameEval()
                } else {
                    // alert('??')
                }
                console.log(i)
            })
        })
    })()    
    
    // Reset for game board.
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
        playerOneWins = false
        playerTwoWins = false
        playerOne = {}
        playerTwo = {}
        gameStatus.innerHTML = "Please choose a game piece."
        startModal.style.display = "block"
        
    }

    // Start new game with same player names and pieces.
    const newGame = () => {
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
        playerOneWins = false
        playerTwoWins = false
        IsItPlayerOneTurn = true
        IsItPlayerTwoTurn = false
        gameStatus.innerHTML = "Okay new game: " + `${playerOne.name}` + " It's your turn"
    }

    // Connecting function to newGame button.
    gameNewGame.addEventListener('click', () => {
        newGame()
    })
    
    // Eventlistener for game reset button.
    gameResetButton.addEventListener('click', () => {
        gameBoardReset()
    })

    // Player win tally. 
    let playerOneWinCount = 0
    let playerTwoWinCount = 0
    
    const gameScore = () => {
        playerOneText.innerText = `${playerOne.name}` + " Score: " + `${playerOneWinCount}`
        playerTwoText.innerText = `${playerTwo.name}` + " Score: " + `${playerTwoWinCount}`
       
        if(playerOneWins == true) {
            ++playerOneWinCount
            console.log(playerOneWinCount) 
            playerOneText.innerText = `${playerOne.name}` + " Score: " + `${playerOneWinCount}`
        } else if (playerTwoWins == true) {
            ++playerTwoWinCount
            console.log(playerTwoWinCount)
            playerTwoText.innerText = `${playerTwo.name}` + " Score: " + `${playerTwoWinCount}`
        }

        const resetCount = () => {
            playerOneWinCount = 0
            playerTwoWinCount = 0
            playerOneText.innerText = `${playerOne.name}` + " Score: " + `${playerOneWinCount}`
            playerTwoText.innerText = `${playerTwo.name}` + " Score: " + `${playerTwoWinCount}`
        }

        // Game score reset.
        gameResetScore.addEventListener('click', () => {
            resetCount()
        })

        return {
            resetCount,
        }
    }


    // When the player or computer picks a position,
    // This will update.
    // Then an evaluation will take place.
    // Once the game is won and event will be triggered to mod the dom.
    // Board Eval Logic, detects who won the game. 
    const gameEval = () => {
        if(playerOne.selection == "" && playerTwo.selection == "") {
            // If the players haven't made a selection. 
            gameStatus.innerHTML = "Hey man, select a game piece"
        } else if (gameBoardPositions[0] == playerOne.selection && gameBoardPositions[1] == playerOne.selection && gameBoardPositions[2] == playerOne.selection ||
            // Horizontal Wins PlayerOne
            gameBoardPositions[3] == playerOne.selection && gameBoardPositions[4] == playerOne.selection && gameBoardPositions[5] == playerOne.selection ||
            gameBoardPositions[6] == playerOne.selection && gameBoardPositions[7] == playerOne.selection && gameBoardPositions[8] == playerOne.selection) {
            playerOneWins = true
            playerTwoWins = false
            gameScore()
            gameStatus.innerHTML = `${playerOne.name}` + " Wins!!! 😁"
            // make it so that no one can take anymore turns
            IsItPlayerOneTurn = false
            IsItPlayerTwoTurn = false
        } else if (
            // Vertical Wins PlayerOne
            gameBoardPositions[0] == playerOne.selection && gameBoardPositions[3] == playerOne.selection && gameBoardPositions[6] == playerOne.selection ||
            gameBoardPositions[1] == playerOne.selection && gameBoardPositions[4] == playerOne.selection && gameBoardPositions[7] == playerOne.selection ||
            gameBoardPositions[2] == playerOne.selection && gameBoardPositions[5] == playerOne.selection && gameBoardPositions[8] == playerOne.selection) {
            playerOneWins = true
            playerTwoWins = false
            gameScore()
            gameStatus.innerHTML = `${playerOne.name}` + " Wins!!! 😁"
            // make it so that no one can take anymore turns
            IsItPlayerOneTurn = false
            IsItPlayerTwoTurn = false
        } else if (
            // Cross Wins PlayerOne
            gameBoardPositions[0] == playerOne.selection && gameBoardPositions[4] == playerOne.selection && gameBoardPositions[8] == playerOne.selection ||
            gameBoardPositions[2] == playerOne.selection && gameBoardPositions[4] == playerOne.selection && gameBoardPositions[6] == playerOne.selection) {
            playerOneWins = true
            playerTwoWins = false
            gameScore()
            gameStatus.innerHTML = `${playerOne.name}` + " Wins!!! 😁"
            // make it so that no one can take anymore turns
            IsItPlayerOneTurn = false
            IsItPlayerTwoTurn = false
        } else if (
            // Horizontal wins PlayerTwo
            gameBoardPositions[0] == playerTwo.selection && gameBoardPositions[1] == playerTwo.selection && gameBoardPositions[2] == playerTwo.selection ||
            gameBoardPositions[3] == playerTwo.selection && gameBoardPositions[4] == playerTwo.selection && gameBoardPositions[5] == playerTwo.selection ||
            gameBoardPositions[6] == playerTwo.selection && gameBoardPositions[7] == playerTwo.selection && gameBoardPositions[8] == playerTwo.selection) {
            playerOneWins = false
            playerTwoWins = true
            gameScore()
            gameStatus.innerHTML = `${playerTwo.name}` + " Wins!!! 😁"
            // make it so that no one can take anymore turns
            IsItPlayerOneTurn = false
            IsItPlayerTwoTurn = false
        } else if (
            // Vertical Wins PlayerTwo
            gameBoardPositions[0] == playerTwo.selection && gameBoardPositions[3] == playerTwo.selection && gameBoardPositions[6] == playerTwo.selection ||
            gameBoardPositions[1] == playerTwo.selection && gameBoardPositions[4] == playerTwo.selection && gameBoardPositions[7] == playerTwo.selection ||
            gameBoardPositions[2] == playerTwo.selection && gameBoardPositions[5] == playerTwo.selection && gameBoardPositions[8] == playerTwo.selection) {
            playerOneWins = false
            playerTwoWins = true
            gameScore()
            gameStatus.innerHTML = `${playerTwo.name}` + " Wins!!! 😁"
            // make it so that no one can take anymore turns
            IsItPlayerOneTurn = false
            IsItPlayerTwoTurn = false    
        } else if (
            // Cross Wins PlayerTwo
            gameBoardPositions[0] == playerTwo.selection && gameBoardPositions[4] == playerTwo.selection && gameBoardPositions[8] == playerTwo.selection ||
            gameBoardPositions[2] == playerTwo.selection && gameBoardPositions[4] == playerTwo.selection && gameBoardPositions[6] == playerTwo.selection) {
            playerOneWins = false
            playerTwoWins = true
            gameScore()
            gameStatus.innerHTML = `${playerTwo.name}` + " Wins!!! 😁"
            // make it so that no one can take anymore turns
            IsItPlayerOneTurn = false
            IsItPlayerTwoTurn = false
        } else if (gameBoardPositions[0] != "" && gameBoardPositions[1] != "" && gameBoardPositions[2] != "" && gameBoardPositions[3] != "" && gameBoardPositions[4] != "" && gameBoardPositions[5] != "" && gameBoardPositions[6] != "" && gameBoardPositions[7] != "" && gameBoardPositions[8] != ""){
            playerOneWins = false
            playerTwoWins = false
            gameScore()
            gameStatus.innerHTML = "The game is a tie nobody wins. 😖"
            // make it so that no one can take anymore turns
            IsItPlayerOneTurn = false
            IsItPlayerTwoTurn = false
        } else {
            return
        }
    }
    
    return {
        gameScore,
        gameBoardPositions,
        gameEval,
        initGame,
        IsItPlayerOneTurn,
        IsItPlayerTwoTurn,
    }
})();


