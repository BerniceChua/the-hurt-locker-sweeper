$(document).ready(function(){
  createBoard()
  // senseRightClick()
  randomizeMinePositions()
  putNumbersAroundMines(minePositions)
  getAllNotMinesTiles()

  $('#reset-button').on('click', function(e) {
    e.preventDefault()
    console.log("resetting game")
    $(".column-div").remove()
    minePositions = {}
    clueNumbers = {}
    listOfClueNumbers = [[],[],[],[],[],[],[],[],[]]
    listOfAllOtherTiles = []
    createBoard()
    randomizeMinePositions()
    putNumbersAroundMines(minePositions)
  })
})

class Square {
  constructor(positionOrDivID) {
    this._clicked = false
    this._possibility = 0
    this._positionOrDivID = positionOrDivID
  }

  get getPossibility() {
    return this._possibility
  }

  set setPossibility(whenClicked) {
    this._possibility = whenClicked
  }

  get getPositionOrDivID() {
    return this._positionOrDivID
  }

  set setPositionOrDivID(newPositionOrDivID) {
    this._positionOrDivID = newPositionOrDivID
  }

  get getClickedThisSquare() {
    return this._clicked
  }

  set setClickedThisSquare(clickedIntoTrue) {
    this._clicked = clickedIntoTrue
  }
}


// let board = new Array(9).fill([])
/*
  Originally, I used "new Array(9).fill([])" to 
  create my board array, but when done this way, 
  it causes the for-loop to overwrite the 
  "Square" objects in the array with the newer 
  "Square" objects.
*/
let board = [[],[],[],[],[],[],[],[],[]]

// stretch goals: modes = easy, medium, difficult
// easy = 9x9; 10 mines
// medium = 16x16; 40 mines
// difficult = 16x30; 99 mines
// currently, only on "easy mode"

function createBoard() {
  for (let i=0; i < board.length; i++) {
    let thisColumn = 'c' + i;
    // console.log("i = " + i)

    $("#board").append("<div class='column-div' id=" + thisColumn + "></div>")

    for (let j=board.length; j>0; j--) {
      let divID = thisColumn + "r" + (j-1)

      $('#' + thisColumn).append("<div class='row-div undiscovered' id=" + divID + "></div>")
      // console.log("j-1 = " + (j-1))
      board[i][j-1] = new Square(divID)
    }
  }

  return board
}


let minePositions = {}

function randomizeMinePositions() {
  // for (let i=0; i<10; i++) {
  //   let randomColumnNumber = Math.ceil(Math.random() * (8 - 0) + 0)
  //   let randomRowNumber = Math.ceil(Math.random() * (9 - 1) + 1)
  //   console.log("c" + randomColumnNumber + "r" + randomRowNumber)
  // }

  // let numberOfKeysShouldBe10 = 0
  console.log(Object.keys(minePositions).length)
  while (Object.keys(minePositions).length < 10) {
    let randomColumnNumber = Math.floor(Math.random() * (board.length-1) )
    let randomRowNumber = Math.floor(Math.random() * (board.length-1) )
    let divID = "c" + randomColumnNumber + "r" + randomRowNumber
    console.log("randomColumnNumber = " + randomColumnNumber)
    console.log("randomRowNumber = " + randomRowNumber)
    console.log(Object.keys(minePositions))
    console.log("divID = " + divID)
    console.log(minePositions.hasOwnProperty(divID))
    console.log(Object.keys(minePositions).length)
    // if (divID in minePositions) { // this line ensures that ALL of the random columns or rows would NOT repeat
    if (minePositions.hasOwnProperty(divID)) {
      console.log(minePositions[divID])
    } else {
      minePositions[divID] = {columnAndRow: divID}
      console.log(minePositions)
      console.log("Object.keys(minePositions).length = " + Object.keys(minePositions).length)

      board[randomColumnNumber][randomRowNumber].setPossibility = 'mine'
      console.log(board[randomColumnNumber][randomRowNumber].getPossibility)
    }
  }

  console.log(minePositions)
  return minePositions
}

let clueNumbers = {}
let listOfClueNumbers = [[],[],[],[],[],[],[],[],[]]

function putNumbersAroundMines(hashOfMinePositions) {
  /*
    1. loop through each key in the hash to find mine positions
    2. get the array location of tiles around mine positions
      2.1. parse 'columnAndRow'
      2.2. to get tile above:
        2.2.a. check first if bigger than array length
        2.2.b. if bigger than array length, do nothing
        2.2.c. if smaller than array length:
          2.2.c.1. check first if possibility is a 'mine'
          2.2.c.2. if possibility is 'mine', do nothing.
          2.2.c.3. if possibility is 'clear' or 'number', get the divID and put a number (+1) in "possibility" property
      2.3. to get tile on right:
        2.3.a. check first if bigger than array length
        2.3.b. if bigger than array length, do nothing
        2.3.c. if smaller than array length:
          2.3.c.1. check first if possibility is a 'mine'
          2.3.c.2. if possibility is 'mine', do nothing.
          2.3.c.3. if possibility is 'clear' or 'number', get the divID and put a number (+1) in "possibility" property
      2.4. to get tile below:
        2.4.a. check first if smaller than zero
        2.4.b. if smaller than zero, do nothing
        2.4.c. if bigger than zero:
          2.4.c.1. check first if possibility is a 'mine'
          2.4.c.2. if possibility is 'mine', do nothing.
          2.4.c.3. if possibility is 'clear' or 'number', get the divID and put a number (+1) in "possibility" property
      2.5. to get tile on left:
        2.5.a. check first if smaller than zero
        2.5.b. if smaller than zero, do nothing
        2.5.c. if smaller than zero:
          2.5.c.1. check first if possibility is a 'mine'
          2.5.c.2. if possibility is 'mine', do nothing.
          2.5.c.3. if possibility is 'clear' or 'number', get the divID and put a number (+1) in "possibility" property
  */
  console.log('in putNumbersAroundMines(hashOfMinePositions)')
  for (let eachKey in minePositions) {
    let columnOfThisTile = parseInt(minePositions[eachKey].columnAndRow.slice(1,2))
    let rowOfThisTile = parseInt(minePositions[eachKey].columnAndRow.slice(-1))
    let mineStopValue = board[columnOfThisTile][rowOfThisTile].getPossibility
    console.log("column = " + columnOfThisTile)
    console.log("row = " + rowOfThisTile)
    console.log(minePositions[eachKey].columnAndRow)
    console.log(board[columnOfThisTile][rowOfThisTile].getPossibility)

    let north = checkTileAbove(columnOfThisTile, rowOfThisTile)
    let northEast = checkNorthEastTile(columnOfThisTile, rowOfThisTile)
    let east = checkTileOnRight(columnOfThisTile, rowOfThisTile)
    let southEast = checkSouthEastTile(columnOfThisTile, rowOfThisTile)
    let south = checkTileBelow(columnOfThisTile, rowOfThisTile)
    let southWest = checkSouthWestTile(columnOfThisTile, rowOfThisTile)
    let west = checkTileOnLeft(columnOfThisTile, rowOfThisTile)
    let northWest = checkNorthWestTile(columnOfThisTile, rowOfThisTile)

    let adjacentTiles = [north, northEast, east, southEast, south, southWest, west, northWest]

    for (let i=0; i < adjacentTiles.length; i++) {
      console.log("i = " + i)
      if ( Array.isArray(adjacentTiles[i]) ) {
        console.log('Array.isArray(adjacentTiles[' + i + '] is: ' + Array.isArray(adjacentTiles[i]) )
        if (board[adjacentTiles[i][0]][adjacentTiles[i][1]].getPossibility != 'mine') {
          console.log('inside 2nd if')
          console.log('board[adjacentTiles[i][0]][adjacentTiles[i][1]].getPossibility = ' + board[adjacentTiles[i][0]][adjacentTiles[i][1]].getPossibility)
          surroundMinesWithClueNumbers(adjacentTiles[i])
        }
      }
    }

    // if ( Array.isArray(north) ) {
    //   if (board[north[0]][north[1]].getPossibility != 'mine') {
    //     surroundMinesWithClueNumbers(north)
    //   }
    // }

    // if (Array.isArray(northEast) ) {
    //   if (board[northEast[0]][northEast[1]].getPossibility != 'mine') {
    //     surroundMinesWithClueNumbers(northEast)
    //   }
    // }

    // if ( Array.isArray(east) ) {
    //   if (board[east[0]][east[1]].getPossibility != 'mine') {
    //     surroundMinesWithClueNumbers(east)
    //   }
    // }
    
    // if ( Array.isArray(southEast) ) {
    //   if (board[southEast[0]][southEast[1]].getPossibility != 'mine') {
    //     surroundMinesWithClueNumbers(southEast)
    //   }
    // }

    // if ( Array.isArray(south) ) {
    //   if (board[south[0]][sout[1]].getPossibility != 'mine') {
    //     surroundMinesWithClueNumbers(south)
    //   }
    // }
    
    // if ( Array.isArray(southWest) ) {
    //   if (board[southWest[0]][southWest[1]].getPossibility != 'mine') {
    //     surroundMinesWithClueNumbers(southWest)
    //   }
    // }

    // if ( Array.isArray(west) ) {
    //   if (board[west[0]][west[1]].getPossibility != 'mine') {
    //     surroundMinesWithClueNumbers(west)
    //   }
    // }
    
    // if ( Array.isArray(northWest) ) {
    //   if (board[northWest[0]][northWest[1]].getPossibility != 'mine') {
    //     surroundMinesWithClueNumbers(northWest)
    //   }
    // }
    
  }
}

function surroundMinesWithClueNumbers(columnAndRowArray) {
  let column = columnAndRowArray[0]
  let row = columnAndRowArray[1]
  let divID = "c" + columnAndRowArray[0] + "r" + columnAndRowArray[1]

  console.log("before = " + board[column][row].getPossibility)
  console.log("typeof = " + (typeof board[column][row].getPossibility))
  let tileValue = board[column][row].getPossibility
  
  console.log("after = " + board[column][row].getPossibility)

  if (clueNumbers.hasOwnProperty(divID)) {
    console.log(clueNumbers)
  } else {
    clueNumbers[divID] = {
      c: column,
      r: row,
    }
    console.log(clueNumbers)

    listOfClueNumbers[column][row] = 'clue number'
    console.log("Object.keys(listOfClueNumbers).length = " + Object.keys(listOfClueNumbers).length)
  }
  board[column][row].setPossibility = tileValue + 1
  console.log(board[column][row].getPossibility)
}


let listOfAllOtherTiles = []

function getAllNotMinesTiles(listOfClueNumbers) {
  let column = 0
  let row = 0
  for (let i=0; i < board.length; i++) {
    for (let j=0; j < board.length; j++) {
      if ( board[i][j].getPossibility != 'mine' ) {
        listOfAllOtherTiles.push(board[i][j])
      }
    }
  }
}



function senseRightClick() {
  var rightclick;
  var e = window.event;
  if (e.which) rightclick = (e.which == 3);
  else if (e.button) rightclick = (e.button == 2);
  alert(rightclick); // true or false, you can trap right click here by if comparison
}