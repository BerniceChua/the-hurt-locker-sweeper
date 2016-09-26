let numberOfRevealedTiles = 0
let game_finished = ""

function checkWinConditions() {
  if ( numberOfRevealedTiles === listOfAllOtherTiles.length ) {
    console.log("numberOfRevealedTiles = " + numberOfRevealedTiles)
    console.log("neededToWin = " + listOfAllOtherTiles.length)
    game_finished = "You revealed the mines!!!!  The Explosive Ordinance Disposal team lives to fight another day";
    $('<div class="overlay"><img src="./imgs/found-them-all-poster-760.jpg" class="center splash-image" /><div class="overlay-words overlay">' + game_finished + '<button id="reset-button" class="btn btn-primary">Play Again</button></div>').appendTo(document.body);
    setTimeout(function() {
      $('.splash-image').fadeOut('slow');
    }, 5000);
    $('body').on("click", 'button', function(e) {
      reloadGame()
    })

  }
}
// }
// document.getElementById("board").addEventListener("click", function(e) {
//   e.preventDefault()
//   alert('hello')
//   alert( "$(this).attr('id') = " + $(this).attr('id') )
//   var test = $(e.target).attr('id')
//   if ( $(this).attr('id') === $(e.target).attr('id') ) {
//     alert("$(e.target).attr('id') = " + $(e.target).attr('id'));
//   }
// })

$(this).on('click', function(e){
  console.log(this)
  e.preventDefault()

  let $clickedTile = $(e.target).attr('id')
  console.log($clickedTile)

  let getColumn = parseInt($clickedTile.slice(1,2))
  let getRow = parseInt($clickedTile.slice(-1))
  console.log(getColumn)
  console.log(getRow)
  console.log(board[getColumn][getRow].getClickedThisSquare)

  if (board[getColumn][getRow].getClickedThisSquare === false) {
    board[getColumn][getRow].setClickedThisSquare = true
    console.log(board[getColumn][getRow].getClickedThisSquare)

    let possibilities = board[getColumn][getRow].getPossibility
    // tried using switch statement, 
    // but switch/case can't handle comparisons like 
    // greater than or lesser than.
    if (possibilities === 'mine') {
      clickedAMine(getColumn, getRow, possibilities)
    } else if (possibilities > 0) {
      clickedANumber(getColumn, getRow, possibilities)
      checkWinConditions()
    } else {
      clickedAnEmptyCell(getColumn, getRow, possibilities)
      checkWinConditions()
    }
  }
})


function clickedAMine(column, row, possibility) {
  /*
    1. get all cells that contain mines (from "minePositions" hash) and change appearance of cells
    2. put overlay to block users from playing more, and 
  */
  console.log("column = " + column)
  console.log("row = " + row)

  for (let eachKey in minePositions) {
    console.log(minePositions[eachKey])
    console.log(board[column][row].getPossibility)
    console.log(minePositions[eachKey].columnAndRow)
    // changeTileAppearance(possibility, column, row, minePositions[eachKey].columnAndRow)
    let columnOfThisTile = parseInt(minePositions[eachKey].columnAndRow.slice(1,2))
    let rowOfThisTile = parseInt(minePositions[eachKey].columnAndRow.slice(-1))
    board[columnOfThisTile][rowOfThisTile].setClickedThisSquare = true
    $('#board').find('#' + minePositions[eachKey].columnAndRow).removeClass('undiscovered').addClass('game-over')
      console.log('put picture of "../imgs/Mine_256x256_32.png" on ' + minePositions[eachKey].columnAndRow)
  }

  game_finished = "Oh noes!!! You hit a mine at column " + column + ", row " + row + "; GAME OVER!!";
  $('<div class="overlay"><img src="./imgs/game-over-p197175_p_v8_ah.jpg" class="center splash-image" /><div class="overlay-words overlay">' + game_finished + '<button id="reset-button" class="btn btn-primary">Reset Game</button></div>').appendTo(document.body);
  setTimeout(function() {
    $('.splash-image').fadeOut('slow');
  }, 5000);
  $('body').on("click", 'button', function(e) {
    reloadGame()
  })

}


function clickedANumber(column, row, possibilities) {
  /*
    1. change appearance of cell
    2. put the clue number
  */
  console.log('inside clickedANumber()')
  console.log("you hit a number at c" + column + "r" + row)
  console.log(possibilities)
  // putNumber(column, row, board[column][row].getPossibility.clue)
  putNumber(column, row, possibilities)
}

function clickedAnEmptyCell(column, row, possibilities) {
  /*
    1. change appearance of cell
    2. check surrounding cells if it is empty or has a number
      2.1. if empty, call this function again
      2.2. if has a number, call clickedANumber()
  */
  console.log("you hit an empty cell at c" + column + "r" + row)
  console.log("column = " + column)
  console.log('row = ' + row)
  console.log('possibilities = ' + possibilities)
  // if ( (possibilities != 'mines') && (possibilities != 0) && (possibilities < board.length) ) {
  //   putNumber(possibilities, column, row)
  // }

  console.log('nothing to see here, move along')
  $('#board').find('#c' + column + 'r' + row).removeClass('undiscovered').addClass('grey-background-with-inner-shadow')

  let north = checkTileAbove(column, row)
  let northEast = checkNorthEastTile(column, row)
  let east = checkTileOnRight(column, row)
  let southEast = checkSouthEastTile(column, row)
  let south = checkTileBelow(column, row)
  let southWest = checkSouthWestTile(column, row)
  let west = checkTileOnLeft(column, row)
  let northWest = checkNorthWestTile(column, row)

  let adjacentTiles = [north, northEast, east, southEast, south, southWest, west, northWest]

  let listOfEmpties = []

  for (let i=0; i < adjacentTiles.length; i++) {
    // if ( Array.isArray(adjacentTiles[i]) ) {
    // if (insideBoard(adjacentTiles[i][0], adjacentTiles[i][1])) {
      /*
        I tried using that if statement in line 138,
        but that gives the error: 
        "game-logic.js:138 Uncaught TypeError: Cannot read property '0' of undefined"
      */
    if ( Array.isArray(adjacentTiles[i]) ) {
      let targetColumn = adjacentTiles[i][0]
      let targetRow = adjacentTiles[i][1]
      console.log("targetColumn = " + targetColumn)
      console.log("targetRow = " + targetRow)
      console.log("what's inside? " + board[targetColumn][targetRow].getPossibility)

      if ( (board[targetColumn][targetRow].getPossibility > 0) ) {
        console.log("checked if possibility is a number bigger than zero")
        if (board[targetColumn][targetRow].getClickedThisSquare === false) {
          console.log("checked if this tile had already been revealed")
          console.log("column (targetColumn) = " + targetColumn)
          console.log("row (targetRow) = " + targetRow)
          console.log(board[targetColumn][targetRow].getPossibility)
          console.log('the target tile is a number')
          putNumber(targetColumn, targetRow, board[targetColumn][targetRow].getPossibility)
        }
      } else {
        if (board[targetColumn][targetRow].getClickedThisSquare === false) {
          console.log("column (targetColumn) = " + targetColumn)
          console.log("row (targetRow) = " + targetRow)
          console.log(board[targetColumn][targetRow].getPossibility)
          console.log('the target tile is empty')
          revealEmptyTiles(adjacentTiles[i])

          listOfEmpties.push(board[targetColumn][targetRow])
          console.log(listOfEmpties)
        }
      } 
    }
  }

  for (let i=0; i < listOfEmpties.length; i++) {
    let outerColumn = parseInt( listOfEmpties[i].getPositionOrDivID.slice(1,2) )
    let outerRow = parseInt( listOfEmpties[i].getPositionOrDivID.slice(-1) )
    let possibilities = listOfEmpties[i].getPossibility
    
    north = checkTileAbove(outerColumn, outerRow)
    northEast = checkNorthEastTile(outerColumn, outerRow)
    east = checkTileOnRight(outerColumn, outerRow)
    southEast = checkSouthEastTile(outerColumn, outerRow)
    south = checkTileBelow(outerColumn, outerRow)
    southWest = checkSouthWestTile(outerColumn, outerRow)
    west = checkTileOnLeft(outerColumn, outerRow)
    northWest = checkNorthWestTile(outerColumn, outerRow)

    adjacentTiles = [north, east, south, west]
    cornerTiles = [northEast, southEast, southWest, northWest]

    for (let i=0; i < adjacentTiles.length; i++) {
      if ( Array.isArray(adjacentTiles[i]) ) {
        let targetColumn = adjacentTiles[i][0]
        let targetRow = adjacentTiles[i][1]

        if ( (board[targetColumn][targetRow].getPossibility > 0) ) {
          if (board[targetColumn][targetRow].getClickedThisSquare === false) {
            console.log("column (targetColumn) = " + targetColumn)
            console.log("row (targetRow) = " + targetRow)
            console.log(board[targetColumn][targetRow].getPossibility)
            putNumber(targetColumn, targetRow, board[targetColumn][targetRow].getPossibility)
          }
        } else {
          if (board[targetColumn][targetRow].getClickedThisSquare === false) {
            console.log("column (targetColumn) = " + targetColumn)
            console.log("row (targetRow) = " + targetRow)
            console.log(board[targetColumn][targetRow].getPossibility)
            revealEmptyTiles(adjacentTiles[i])

            listOfEmpties.push(board[targetColumn][targetRow])
          }
        }
      }
    }

    for (let i=0; i < cornerTiles.length; i++) {
      if ( Array.isArray(cornerTiles[i]) ) {
        let targetColumn = cornerTiles[i][0]
        let targetRow = cornerTiles[i][1]

        if ( (board[targetColumn][targetRow].getPossibility > 0) ) {
          if (board[targetColumn][targetRow].getClickedThisSquare === false) {
            console.log("column (targetColumn) = " + targetColumn)
            console.log("row (targetRow) = " + targetRow)
            console.log(board[targetColumn][targetRow].getPossibility)
            putNumber(targetColumn, targetRow, board[targetColumn][targetRow].getPossibility)
          }
        }
      }
    }

  }
}

function revealEmptyTiles(columnAndRowArray) {
  let column = columnAndRowArray[0]
  let row = columnAndRowArray[1]
  let tileValue = board[column][row].getPossibility
  console.log("tileValue = " + tileValue)
  console.log("you hit revealed the cell at c" + column + "r" + row)
  console.log('possibilities:')
  console.log("before = " + board[column][row].getPossibility)
  console.log("typeof = " + (typeof board[column][row].getPossibility))

  // $('#board').find('#c' + column + 'r' + row).removeClass('undiscovered').addClass('grey-background-with-inner-shadow')
  // console.log("after = " + board[column][row].getPossibility)
  // let expandSpiral = 0
  // do {
  //   let expandNE = [1 * (expandSpiral), 1 * (expandSpiral)]
  //   let expandSE = [1 * (expandSpiral), -1 * (expandSpiral)]
  //   let expandSW = [-1 * (expandSpiral), -1 * (expandSpiral)]
  //   let expandNW = [-1 * (expandSpiral), 1 * (expandSpiral)]
  //   let expand = [expandNE, expandSE, expandSW, expandNW]

  //   for (let i=0; i < expand.length; i++) {
      console.log("column")
      console.log(column)
      console.log('row')
      console.log(row)
      board[column][row].setClickedThisSquare = true

      console.log('nothing to see here, move along')
      $('#board').find('#c' + column + 'r' + row).removeClass('undiscovered').addClass('grey-background-with-inner-shadow')
      numberOfRevealedTiles++
      console.log("numberOfRevealedTiles = " + numberOfRevealedTiles)
}

function putNumber(column, row, possibility) {
  console.log(possibility)
  console.log('change appearance of tile AND reveal the clue number here at c' + column + "r" + row)
  console.log($('#board').find('#c' + column + "r" + row))
  board[column][row].setClickedThisSquare = true
  $('#board').find('#c' + column + "r" + row).removeClass('undiscovered').addClass('grey-background-with-inner-shadow').append("<p class='text-center large-green-number'>" + possibility + "</p>")

  numberOfRevealedTiles++
  console.log("numberOfRevealedTiles = " + numberOfRevealedTiles)
}