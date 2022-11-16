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
// Game status area, will tell the user who won or if the game is a tie.
const gameStatus = document.getElementById('condition')

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
    
    console.log(playerOne)
    console.log(playerTwo)

    return {
        // Return all needed vals and keep the rest private. 
        playerOne,
        playerTwo,
    }
})


// Game functionality in Module pattern and IIFE. 
const gameBoard = (() => {
    
    // Defining the game board positions in array.
    // Changed to array as could not get object to work. 
    // Need to investigate further. 
    let gameBoardPositions = ["", "", "", "", "", "", "", "", ""]
    
    // Define player status'
    let playerOneWins = false
    let playerTwoWins = false
    
    // When its playerOnes turn add specific eventlistener.
    const playerOneTurn = () => {
        let gameSquares = document.querySelectorAll('.square')
        console.log(gameSquares)
        gameSquares.forEach(item => {
            item.addEventListener('click', () => {
                item.innerHTML = playerOne.selection
                let  attributeNum = Number(item.getAttribute('cell'))
                gameBoardPositions[attributeNum] = playerOne.selection
            })
        })
    }

    // When its playerTwos turn add specific eventlistener.
    const playerTwoTurn = () => {
        let gameSquares = document.querySelectorAll('.square')
        console.log(gameSquares)
        gameSquares.forEach(item => {
            item.addEventListener('click', () => {
                item.innerHTML = playerTwo.selection
                let  attributeNum = Number(item.getAttribute('cell'))
                gameBoardPositions[attributeNum] = playerTwo.selection
                gameEval()
            })
        })
    }
    
  


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
    }

    const gameScore = () => {
        
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
        if(playerOne.selection == "" && playerTwo.selection == "") {
            // If the players haven't made a selection. 
            gameStatus.innerHTML = "Hey man, select a game piece"
        } else if (gameBoardPositions[0] == playerOne.selection && gameBoardPositions[1] == playerOne.selection && gameBoardPositions[2] == playerOne.selection ||
            // Horizontal Wins PlayerOne
            gameBoardPositions[3] == playerOne.selection && gameBoardPositions[4] == playerOne.selection && gameBoardPositions[5] == playerOne.selection ||
            gameBoardPositions[6] == playerOne.selection && gameBoardPositions[7] == playerOne.selection && gameBoardPositions[8] == playerOne.selection) {
            playerWins = true
            cpuWins = false
            gameStatus.innerHTML = "The Player Wins! 😁"
        } else if (
            // Vertical Wins PlayerOne
            gameBoardPositions[0] == playerOne.selection && gameBoardPositions[3] == playerOne.selection && gameBoardPositions[6] == playerOne.selection ||
            gameBoardPositions[1] == playerOne.selection && gameBoardPositions[4] == playerOne.selection && gameBoardPositions[7] == playerOne.selection ||
            gameBoardPositions[2] == playerOne.selection && gameBoardPositions[5] == playerOne.selection && gameBoardPositions[8] == playerOne.selection) {
            playerWins = true
            cpuWins = false
            gameStatus.innerHTML = "The Player Wins! 😁"
        } else if (
            // Cross Wins PlayerOne
            gameBoardPositions[0] == playerOne.selection && gameBoardPositions[4] == playerOne.selection && gameBoardPositions[8] == playerOne.selection ||
            gameBoardPositions[2] == playerOne.selection && gameBoardPositions[4] == playerOne.selection && gameBoardPositions[6] == playerOne.selection) {
                playerWins = true
                cpuWins = false
                gameStatus.innerHTML = "The Player Wins! 😁"
        } else if (
            // Horizontal wins PlayerTwo
            gameBoardPositions[0] == playerTwo.selection && gameBoardPositions[1] == playerTwo.selection && gameBoardPositions[2] == playerTwo.selection ||
            gameBoardPositions[3] == playerTwo.selection && gameBoardPositions[4] == playerTwo.selection && gameBoardPositions[5] == playerTwo.selection ||
            gameBoardPositions[6] == playerTwo.selection && gameBoardPositions[7] == playerTwo.selection && gameBoardPositions[8] == playerTwo.selection) {
                playerWins = false
                cpuWins = true
                gameStatus.innerHTML = "The CPU Wins.... 😵"
        } else if (
            // Vertical Wins PlayerTwo
            gameBoardPositions[0] == playerTwo.selection && gameBoardPositions[3] == playerTwo.selection && gameBoardPositions[6] == playerTwo.selection ||
            gameBoardPositions[1] == playerTwo.selection && gameBoardPositions[4] == playerTwo.selection && gameBoardPositions[7] == playerTwo.selection ||
            gameBoardPositions[2] == playerTwo.selection && gameBoardPositions[5] == playerTwo.selection && gameBoardPositions[8] == playerTwo.selection) {
                playerWins = false
                cpuWins = true
                gameStatus.innerHTML = "The CPU Wins.... 😵"    
        } else if (
            // Cross Wins PlayerTwo
            gameBoardPositions[0] == playerTwo.selection && gameBoardPositions[4] == playerTwo.selection && gameBoardPositions[8] == playerTwo.selection ||
            gameBoardPositions[2] == playerTwo.selection && gameBoardPositions[4] == playerTwo.selection && gameBoardPositions[6] == playerTwo.selection) {
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
    const cpuPlay = () => {
        let arrayLength = gameBoardPositions.length
        for (let i = 0; i < arrayLength; i++) {
            if (gameBoardPositions[i] !=  `${cpuGamePiece}` || gameBoardPositions[i] != `${playerGamePiece}`) {
                gameBoardPositions[i] = `${cpuGamePiece}`
                let boardPlace = document.querySelector('[cell=`${i}`]')
                boardPlace.innerHTML = `${cpuGamePiece}`
                break;
            }

        }

    }






    const cpuRandomPlayObj = () => {
        
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
        cpuPlay,
        playerOneTurn,
    }
})();


