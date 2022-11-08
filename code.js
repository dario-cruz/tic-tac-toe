// Factory function for creating player objects.
const gamePlayer = (name, selection) => {
    return { name, selection }
}
// Testing factory func.
const dario = gamePlayer("Dario", "x")
console.log(dario)

// Create gamebord object. 
const gameBoard = (() => {
    // Defining the gameboard positions in object. 
    // When the player or computer picks a position,
    // This will update.
    // Then an evaluation will take place.
    // Once the game is won and event will be triggered to mod the dom.
    // 
    const gameBoardPositions = {
       rowOne:[0,0,0],
       rowTwo:[0,0,0],
       rowThree:[0,0,0]
    }



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
    
    const gameEval = () => {
        if (gameBoardPositions.rowOne == [1,1,1]) {
            console.log('Player One Wins!')
        }
    }
})