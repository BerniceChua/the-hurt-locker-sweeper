/* stretch goals: 
  1. add requirejs 
    (so that index.html won't have too many script tags)
  2. find a way to do event delegation for clicking the tiles.
    // document.getElementById("board").addEventListener("click", function(e) {
    //   e.preventDefault()
    //   alert('hello')
    //   alert( "$(this).attr('id') = " + $(this).attr('id') )
    //   var test = $(e.target).attr('id')
    //   if ( $(this).attr('id') === $(e.target).attr('id') ) {
    //     alert("$(e.target).attr('id') = " + $(e.target).attr('id'));
    //   }
    // })
    instead of "$(this).on('click', function(e){...}", also this will
    get rid of this error msg: 
    "game-logic.js:25 Uncaught TypeError: Cannot read property 'NaN' of undefined"
    which happens when anything aside from the tiles are clicked.
  3. modes = easy, medium, difficult
    easy = 9x9 board; 10 mines
    medium = 16x16 board; 40 mines
    difficult = 16x30 board; 99 mines
    currently, only on "easy mode"
  4. add timer
  5. add ability to place a flag with right click
*/

$(document).ready(function(){
  createBoard()
  // senseRightClick()
  randomizeMinePositions()
  putNumbersAroundMines(minePositions)
  getAllNotMinesTiles()

  $('#reset-button').on('click', function(e) {
    reloadGame()
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

function createBoard() {
  for (let i=0; i < board.length; i++) {
    let thisColumn = 'c' + i;

    $("#board").append("<div class='column-div' id=" + thisColumn + "></div>")

    for (let j=board.length; j>0; j--) {
      let divID = thisColumn + "r" + (j-1)

      $('#' + thisColumn).append("<div class='row-div undiscovered' id=" + divID + "></div>")

      board[i][j-1] = new Square(divID)
    }
  }

  return board
}


let minePositions = {}

function randomizeMinePositions() {
  while (Object.keys(minePositions).length < 10) {
    let randomColumnNumber = Math.floor(Math.random() * (board.length-1) )
    let randomRowNumber = Math.floor(Math.random() * (board.length-1) )
    let divID = "c" + randomColumnNumber + "r" + randomRowNumber

    if ( !minePositions.hasOwnProperty(divID) ) {
      // this if statement ensures that ALL of the random columns or rows would NOT repeat
      minePositions[divID] = {columnAndRow: divID}

      board[randomColumnNumber][randomRowNumber].setPossibility = 'mine'
    }
  }

  return minePositions
}

let clueNumbers = {}
let listOfClueNumbers = [[],[],[],[],[],[],[],[],[]]

function putNumbersAroundMines(hashOfMinePositions) {
  /*
  !!!!!!!!!!!!!!PSEUDOCODE!!!!!!!!!!!!!!
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

  for (let eachKey in minePositions) {
    let columnOfThisTile = parseInt(minePositions[eachKey].columnAndRow.slice(1,2))
    let rowOfThisTile = parseInt(minePositions[eachKey].columnAndRow.slice(-1))
    let mineStopValue = board[columnOfThisTile][rowOfThisTile].getPossibility


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
      if ( Array.isArray(adjacentTiles[i]) ) {
        if (board[adjacentTiles[i][0]][adjacentTiles[i][1]].getPossibility != 'mine') {

          surroundMinesWithClueNumbers(adjacentTiles[i])
        }
      }
    }
    
  }
}

function surroundMinesWithClueNumbers(columnAndRowArray) {
  let column = columnAndRowArray[0]
  let row = columnAndRowArray[1]
  let divID = "c" + columnAndRowArray[0] + "r" + columnAndRowArray[1]
  let tileValue = board[column][row].getPossibility
  
  if ( !clueNumbers.hasOwnProperty(divID)) {
    // this if statement ensures that ALL of the columns or rows would NOT repeat
    clueNumbers[divID] = {
      c: column,
      r: row,
    }
    listOfClueNumbers[column][row] = 'clue number'
  }

  board[column][row].setPossibility = tileValue + 1
}


let listOfAllOtherTiles = []

function getAllNotMinesTiles() {
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