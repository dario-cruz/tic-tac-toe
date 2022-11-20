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
    gameBoard.gameScore()
    gameBoard.initGame()
    IsItPlayerOneTurn = true
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
    
    let IsItPlayerOneTurn = false
    let IsItPlayerTwoTurn = false

     console.log(gameSquares)
    // Create event listeners for the start of the game.
    const initGame = () => {
        gameSquares.forEach((i) => {
            i.addEventListener('click', () => {
                let squareCellRaw = i.getAttribute('cell')
                squareCell = Number(squareCellRaw)
                console.log(squareCell)
                if(gameBoardPositions[squareCell] != "" && IsItPlayerOneTurn == true || gameBoardPositions[squareCell] != playerTwo.selection && IsItPlayerOneTurn == true ) {
                    i.innerText = playerOne.selection
                    gameBoardPositions[squareCell] = playerOne.selection
                    IsItPlayerOneTurn = false
                    IsItPlayerTwoTurn = true
                    gameEval()
                } else if (gameBoardPositions[squareCell] != "" && IsItPlayerTwoTurn == true || gameBoardPositions[squareCell] != playerOne.selection && IsItPlayerTwoTurn == true) {
                    i.innerText = playerTwo.selection
                    gameBoardPositions[squareCell] = playerTwo.selection
                    IsItPlayerOneTurn = true
                    IsItPlayerTwoTurn = false
                    gameEval()
                } else {
                    return
                }
                console.log(i)
            })
        })
    }    
    

    const squareClicked = (e) => {
        let squareCell = e.getAttribute('cell')
        squareCell = Number(squareCell)
        console.log(squareCell)
        if(gameBoardPositions[squareCell] != "" && IsItPlayerOneTurn == true || gameBoardPositions[squareCell] != playerTwo.selection && IsItPlayerOneTurn == true ) {
            e.innerText = playerOne.selection
            gameBoardPositions[squareCell] = playerOne.selection
            IsItPlayerOneTurn = false
            IsItPlayerTwoTurn = true
            gameEval()
        } else if (gameBoardPositions[squareCell] != "" && IsItPlayerTwoTurn == true || gameBoardPositions[squareCell] != playerOne.selection && IsItPlayerTwoTurn == true) {
            e.innerText = playerTwo.selection
            gameBoardPositions[squareCell] = playerTwo.selection
            IsItPlayerOneTurn = true
            IsItPlayerTwoTurn = false
            gameEval()
        } else {
            return
        }
    }

    // When its playerOnes turn add specific eventlistener.
    // const playerOneTurn = () => {
    //     // Add eventlistener to each box for player turn and update game board array.
    //     gameSquares.forEach(item => {
    //         item.addEventListener('click', () => {
    //             event.stopPropagation()
    //             // item.replaceWith(item.cloneNode(true))
    //             item.innerHTML = playerOne.selection
    //             let  attributeNum = Number(item.getAttribute('cell'))
    //             gameBoardPositions[attributeNum] = playerOne.selection
    //             gameStatus.innerHTML = `${playerTwo.name}` + " It's your turn"
    //             playerTwoTurn()
    //             gameEval()
    //         })
    //     })
    // }

    // When its playerTwos turn add specific eventlistener.
    // const playerTwoTurn = () => {
    //     gameSquares.forEach(item => {
    //         item.addEventListener('click', () => {
    //             event.stopPropagation()
    //             // item.replaceWith(item.cloneNode(true))
    //             item.innerHTML = playerTwo.selection
    //             let  attributeNum = Number(item.getAttribute('cell'))
    //             gameBoardPositions[attributeNum] = playerTwo.selection
    //             gameStatus.innerHTML = `${playerOne.name}` + " It's your turn"
    //             playerOneTurn()
    //             gameEval()
    //         })
    //     })
    // }
    
    
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

        // gameSquares.forEach(item => {
        //     item.removeEventListener('click', () => {
        //         item.innerHTML = playerOne.selection
        //         let  attributeNum = Number(item.getAttribute('cell'))
        //         gameBoardPositions[attributeNum] = playerTwo.selection
        //         gameStatus.innerHTML = `${playerTwo.name}` + " It's your turn"
        //         playerOneTurn()
        //         gameEval()
        //     })
        // })

        // gameSquares.forEach(item => {
        //     item.removeEventListener('click', () => {
        //         item.innerHTML = playerTwo.selection
        //         let  attributeNum = Number(item.getAttribute('cell'))
        //         gameBoardPositions[attributeNum] = playerTwo.selection
        //         gameStatus.innerHTML = `${playerOne.name}` + " It's your turn"
        //         playerOneTurn()
        //         gameEval()
        //     })
        // })        

    }
    
    let playerOneWinCount = 0
    let playerTwoWinCount = 0
    
    const gameScore = () => {
        if(playerOneWins == true) {
            ++playerOneWinCount 
        } else if (playerTwoWinCount == true) {
            ++playerTwoWinCount
        }

        const resetCount = () => {
            playerOneWinCount = 0
            playerTwoWinCount = 0
            playerOneText.innerText = `${playerOne.name}` + " Score: " + `${playerOneWinCount}`
            playerTwoText.innerText = `${playerTwo.name}` + " Score: " + `${playerTwoWinCount}`
        }

        playerOneText.innerText = `${playerOne.name}` + " Score: " + `${playerOneWinCount}`
        playerTwoText.innerText = `${playerTwo.name}` + " Score: " + `${playerTwoWinCount}`
        
        // Game score reset.
        gameResetScore.addEventListener('click', () => {
            resetCount()
        })

        return {
            resetCount,
        }
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
            playerOneWins = true
            playerTwoWins = false
            gameScore()
            gameStatus.innerHTML = `${playerTwo.name}` + " Wins!!! 😁"
        } else if (
            // Vertical Wins PlayerOne
            gameBoardPositions[0] == playerOne.selection && gameBoardPositions[3] == playerOne.selection && gameBoardPositions[6] == playerOne.selection ||
            gameBoardPositions[1] == playerOne.selection && gameBoardPositions[4] == playerOne.selection && gameBoardPositions[7] == playerOne.selection ||
            gameBoardPositions[2] == playerOne.selection && gameBoardPositions[5] == playerOne.selection && gameBoardPositions[8] == playerOne.selection) {
            playerOneWins = true
            playerTwoWins = false
            gameScore()
            gameStatus.innerHTML = `${playerTwo.name}` + " Wins!!! 😁"
        } else if (
            // Cross Wins PlayerOne
            gameBoardPositions[0] == playerOne.selection && gameBoardPositions[4] == playerOne.selection && gameBoardPositions[8] == playerOne.selection ||
            gameBoardPositions[2] == playerOne.selection && gameBoardPositions[4] == playerOne.selection && gameBoardPositions[6] == playerOne.selection) {
            playerOneWins = true
            playerTwoWins = false
            gameScore()
            gameStatus.innerHTML = `${playerOne.name}` + " Wins!!! 😁"
        } else if (
            // Horizontal wins PlayerTwo
            gameBoardPositions[0] == playerTwo.selection && gameBoardPositions[1] == playerTwo.selection && gameBoardPositions[2] == playerTwo.selection ||
            gameBoardPositions[3] == playerTwo.selection && gameBoardPositions[4] == playerTwo.selection && gameBoardPositions[5] == playerTwo.selection ||
            gameBoardPositions[6] == playerTwo.selection && gameBoardPositions[7] == playerTwo.selection && gameBoardPositions[8] == playerTwo.selection) {
            playerOneWins = false
            playerTwoWins = true
            gameScore()
            gameStatus.innerHTML = `${playerTwo.name}` + " Wins!!! 😁"
        } else if (
            // Vertical Wins PlayerTwo
            gameBoardPositions[0] == playerTwo.selection && gameBoardPositions[3] == playerTwo.selection && gameBoardPositions[6] == playerTwo.selection ||
            gameBoardPositions[1] == playerTwo.selection && gameBoardPositions[4] == playerTwo.selection && gameBoardPositions[7] == playerTwo.selection ||
            gameBoardPositions[2] == playerTwo.selection && gameBoardPositions[5] == playerTwo.selection && gameBoardPositions[8] == playerTwo.selection) {
            playerOneWins = false
            playerTwoWins = true
            gameScore()
            gameStatus.innerHTML = `${playerTwo.name}` + " Wins!!! 😁"    
        } else if (
            // Cross Wins PlayerTwo
            gameBoardPositions[0] == playerTwo.selection && gameBoardPositions[4] == playerTwo.selection && gameBoardPositions[8] == playerTwo.selection ||
            gameBoardPositions[2] == playerTwo.selection && gameBoardPositions[4] == playerTwo.selection && gameBoardPositions[6] == playerTwo.selection) {
            playerOneWins = false
            playerTwoWins = true
            gameScore()
            gameStatus.innerHTML = `${playerTwo.name}` + " Wins!!! 😁"
        } else if (gameBoardPositions[0] != "" && gameBoardPositions[1] != "" && gameBoardPositions[2] != "" && gameBoardPositions[3] != "" && gameBoardPositions[4] != "" && gameBoardPositions[5] != "" && gameBoardPositions[6] != "" && gameBoardPositions[7] != "" && gameBoardPositions[8] != ""){
            playerOneWins = false
            playerTwoWins = false
            gameScore()
            gameStatus.innerHTML = "The game is a tie nobody wins. 😖"
        } else {
            return
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
        gameScore,
        gameBoardPositions,
        gameEval,
        cpuPlay,
        initGame,
    }
})();


