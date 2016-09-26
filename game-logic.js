let gameIsCompleted = false
let numberOfRevealedTiles = 0
// let neededToWin = board.length - Object.keys(minePositions).length
// let neededToWin = listOfAllOtherTiles.length
let game_finished = ""

// if (!gameIsCompleted) {
  function checkWinConditions() {
    // for (let i=0; i< listOfAllOtherTiles.length; i++) {
    if ( numberOfRevealedTiles === listOfAllOtherTiles.length ) {
      console.log("numberOfRevealedTiles = " + numberOfRevealedTiles)
      console.log("neededToWin = " + listOfAllOtherTiles.length)
//  or converseley if (numberOfRevealedTiles === listOfAllOtherTiles.length)
      game_finished = "You revealed the mines!!!!  The Explosive Ordinance Disposal team lives to fight another day";
      $('<div class="overlay"><img src="./imgs/found-them-all-poster-760.jpg" class="center splash-image" /><div class="overlay-words overlay">' + game_finished + '<button id="reset-button" class="btn btn-primary">Play Again</button></div>').appendTo(document.body);
      setTimeout(function() {
        $('.splash-image').fadeOut('slow');
      }, 5000);
      $('body').on("click", 'button', function(e) {
      // $('#reset-button').on('click', function(e) {
        e.preventDefault()
        console.log( $(this) )
        console.log("resetting game")
        $(".column-div").remove()
        minePositions = {}
        clueNumbers = {}
        listOfClueNumbers = [[],[],[],[],[],[],[],[],[]]
        listOfAllOtherTiles = []
        createBoard()
        randomizeMinePositions()
        putNumbersAroundMines(minePositions)
        $('.overlay').remove()
      })

    }
    // }
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
  // console.log($('#board').find($clickedTile))["0"]["0"].getPositionOrDivID

  // let getColumn = parseInt($clickedTile.match(/(c)(\d)/ig))
  // let getColumn = $clickedTile.match(/(?:c)(\d)/g)
  let getColumn = parseInt($clickedTile.slice(1,2))
  let getRow = parseInt($clickedTile.slice(-1))
  console.log(getColumn)
  console.log(getRow)
  console.log(board[getColumn][getRow].getClickedThisSquare)

  if (board[getColumn][getRow].getClickedThisSquare === false) {
    board[getColumn][getRow].setClickedThisSquare = true
    console.log(board[getColumn][getRow].getClickedThisSquare)
    // if (clickedTile = )

    let possibilities = board[getColumn][getRow].getPossibility
    // switch (possibilities) {
    //   case 'mine':
    //     clickedAMine(possibilities, getColumn, getRow)
    //     break;
    //   case (board[getColumn][getRow].getPossibility > 0):
    //     clickedANumber(possibilities, getColumn, getRow)
    //     break;
    //   default:
    //     clickedAnEmptyCell(possibilities, getColumn, getRow)
    //     break;
    // }

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


  // replace this alert with overlay.
  // alert("you hit a mine at column " + column + ", row " + row + "; GAME OVER")
  game_finished = "Oh noes!!! You hit a mine at column " + column + ", row " + row + "; GAME OVER!!";
  $('<div class="overlay"><img src="./imgs/game-over-p197175_p_v8_ah.jpg" class="center splash-image" /><div class="overlay-words overlay">' + game_finished + '<button id="reset-button" class="btn btn-primary">Reset Game</button></div>').appendTo(document.body);
  setTimeout(function() {
    $('.splash-image').fadeOut('slow');
  }, 5000);
  $('body').on("click", 'button', function(e) {
  // $('#reset-button').on('click', function(e) {
    e.preventDefault()
    console.log( $(this) )
    console.log("resetting game")
    $(".column-div").remove()
    minePositions = {}
    clueNumbers = {}
    listOfClueNumbers = [[],[],[],[],[],[],[],[],[]]
    listOfAllOtherTiles = []
    createBoard()
    randomizeMinePositions()
    putNumbersAroundMines(minePositions)
    $('.overlay').remove()
  })

  // $('<div class="overlay-words overlay">' + game_finished + '<button id="reset-button" class="btn btn-primary">Reset Game</button><img src="./imgs/game-over-p197175_p_v8_ah.jpg" class="translucent-image"/></div>').appendTo(document.body);
  // setTimeout(function() {
  //   $('.overlay-words.overlay').fadeOut('slow');
  // }, 2000);

}

function clickedANumber(column, row, possibilities) {
  /*
    1. change appearance of cell
  */
  console.log('inside clickedANumber()')
  console.log("you hit a number at c" + column + "r" + row)
  console.log(possibilities)
  // putNumber(column, row, board[column][row].getPossibility.clue)
  putNumber(column, row, possibilities)
}

// let listOfEmpties = []

function clickedAnEmptyCell(column, row, possibilities) {
  /*
    1. change appearance of cell
    2. check surrounding cells if it is empty or has a number
      2.1. if empty, call this function again
      2.2. if has a number, call clickedANumber()
  */
  let stopValue = listOfClueNumbers[column][row]
  console.log("you hit an empty cell at c" + column + "r" + row)
  console.log("column = " + column)
  console.log('row = ' + row)
  console.log('possibilities = ' + possibilities)
  // if ( (possibilities != 'mines') && (possibilities != 0) && (possibilities < board.length) ) {
  //   putNumber(possibilities, column, row)
  // }

  console.log('nothing to see here, move along')
  $('#board').find('#c' + column + 'r' + row).removeClass('undiscovered').addClass('grey-background-with-inner-shadow')
  
  // if (possibilities === 0) {
  // while ( (column < board.length) && (row < board.length) && (column >= 0) && (row >= 0) && (possibilities != 'mine') ) {
  //   if (possibilities > 0) {
  //     return putNumber(column, row, possibilities)
  //   } else {
  //     checkTileAbove(column, row, revealEmptyTiles)
  //     checkNorthEastTile(column, row, revealEmptyTiles)
  //     checkTileOnRight(column, row, revealEmptyTiles)
  //     checkSouthEastTile(column, row, revealEmptyTiles)
  //     checkTileBelow(column, row, revealEmptyTiles)
  //     checkSouthWestTile(column, row, revealEmptyTiles)
  //     checkTileOnLeft(column, row, revealEmptyTiles)
  //     checkNorthWestTile(column, row, revealEmptyTiles)
  //   }
  // }



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

      // do {
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
        } else /*if ( (board[targetColumn][targetRow].getPossibility > 0) && (board[targetColumn][targetRow].getClickedThisSquare === false) )*/ {
          if (board[targetColumn][targetRow].getClickedThisSquare === false) {
            console.log("column (targetColumn) = " + targetColumn)
            console.log("row (targetRow) = " + targetRow)
            console.log(board[targetColumn][targetRow].getPossibility)
            console.log('the target tile is empty')
            revealEmptyTiles(adjacentTiles[i])

            listOfEmpties.push(board[targetColumn][targetRow])
            console.log(listOfEmpties)
          }
        } /*else if ( board[targetColumn][targetRow].getPossibility === 'mine' ) {
          break
        } else {
          break
        }*/
      // } while ( board[targetColumn + 1][targetRow + 1].getPossibility != 'mine' )
    }
  }

  // revealAdjacentEmpties(listOfEmpties)
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

        // do {
          if ( (board[targetColumn][targetRow].getPossibility > 0) ) {
            if (board[targetColumn][targetRow].getClickedThisSquare === false) {
              console.log("column (targetColumn) = " + targetColumn)
              console.log("row (targetRow) = " + targetRow)
              console.log(board[targetColumn][targetRow].getPossibility)
              putNumber(targetColumn, targetRow, board[targetColumn][targetRow].getPossibility)
            }
          } else /*if ( (board[targetColumn][targetRow].getPossibility > 0) && (board[targetColumn][targetRow].getClickedThisSquare === false) )*/ {
            if (board[targetColumn][targetRow].getClickedThisSquare === false) {
              console.log("column (targetColumn) = " + targetColumn)
              console.log("row (targetRow) = " + targetRow)
              console.log(board[targetColumn][targetRow].getPossibility)
              revealEmptyTiles(adjacentTiles[i])

              listOfEmpties.push(board[targetColumn][targetRow])
            }
          } /*else if ( board[targetColumn][targetRow].getPossibility === 'mine' ) {
            break
          } else {
            break
          }*/
        // } while ( board[targetColumn + 1][targetRow + 1].getPossibility != 'mine' )
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

    // for (let i=0; i < expand.length; i++) {
    //   if ( Array.isArray(north) ) {
    //     if ( (board[north[0]][north[1]].getPossibility === 0) && (board[north[0]][north[1]].getClickedThisSquare === false) ) {
    //       console.log("column = " + column)
    //       console.log("row+1 = " + (row+1))
    //       console.log(board[column][row+1].getPossibility)
    //       revealEmptyTiles(north)
    //     } else if ( (board[north[0]][north[1]].getPossibility > 0) && (board[north[0]][north[1]].getClickedThisSquare === false) ) {
    //       console.log("column = " + column)
    //       console.log("row+1 = " + (row+1))
    //       console.log(board[column][row+1].getPossibility)
    //       putNumber(column, row+1, board[column][row+1].getPossibility)
    //     } else if ( board[north[0]][north[1]].getPossibility === 'mine' ) {
    //       break
    //     } else {
    //       break
    //     }
    //   }

    //   if ( Array.isArray(northEast) ) {
    //     if ( (board[northEast[0]][northEast[1]].getPossibility === 0) && (board[northEast[0]][northEast[1]].getClickedThisSquare === false) ) {
    //       console.log("column+1 = " + (column+1))
    //       console.log('northEast[0] = ' + northEast[0])
    //       console.log("row =+1 " + (row+1))
    //       console.log(board[column+1][row+1].getPossibility)
    //       revealEmptyTiles(northEast)
    //     } else if ( (board[northEast[0]][northEast[1]].getPossibility > 0) && (board[northEast[0]][northEast[1]].getClickedThisSquare === false) ) {
    //       console.log("column+1 = " + (column+1))
    //       console.log("row =+1 " + (row+1))
    //       console.log(board[column+1][row+1].getPossibility)
    //       putNumber(column+1, row+1, board[column+1][row+1].getPossibility)
    //     } else if ( board[northEast[0]][northEast[1]].getPossibility === 'mine' ) {
    //       break
    //     } else {
    //       break
    //     }
    //   }
  
    //   if ( Array.isArray(east) ) {
    //     if ( (board[column+1][row].getPossibility === 0) && (board[column+1][row].getClickedThisSquare === false) ) {
    //       console.log("column+1 = " + (column+1))
    //       console.log("row = " + row)
    //       console.log(board[column+1][row].getPossibility)
    //       revealEmptyTiles(checkTileOnRight(column, row))
    //     } else if ( (board[column+1][row].getPossibility > 0) && (board[column+1][row].getClickedThisSquare === false) ) {
    //       console.log("column+1 = " + (column+1))
    //       console.log("row = " + row)
    //       console.log(board[column+1][row].getPossibility)
    //       putNumber(column+1, row, board[column+1][row].getPossibility)
    //     } else if ( board[east[0]][east[1]].getPossibility === 'mine' ) {
    //       break
    //     } else {
    //       break
    //     }
    //   }
    // }
    
    // if ( Array.isArray(southEast) ) {
    //   if ( (board[column+1][row-1].getPossibility === 0) && (board[column+1][row-1].getClickedThisSquare === false) ) {
    //     console.log("column+1 = " + (column+1))
    //     console.log("row-1 = " + (row-1))
    //     console.log(board[column+1][row-1].getPossibility)
    //     revealEmptyTiles(checkSouthEastTile(column, row))
    //   } else if ( (board[column+1][row-1].getPossibility > 0) && (board[column+1][row-1].getClickedThisSquare === false) ) {
    //     console.log("column+1 = " + (column+1))
    //     console.log("row-1 = " + (row-1))
    //     console.log(board[column+1][row-1].getPossibility)
    //     putNumber(column+1, row-1, board[column+1][row-1].getPossibility)
    //   } else if ( board[southEast[0]][southEast[1]].getPossibility === 'mine' ) {
    //     break
    //   } else {
    //     break
    //   }
    // }

    // if ( Array.isArray(south) ) {
    //   if ( (board[column][row-1].getPossibility === 0) && (board[column][row-1].getClickedThisSquare === false) ) {
    //     console.log("column = " + column)
    //     console.log("row-1 = " + (row-1))
    //     console.log(board[column][row-1].getPossibility)
    //     revealEmptyTiles(checkTileBelow(column, row))
    //   } else if ( (board[column][row-1].getPossibility > 0) && (board[column][row-1].getClickedThisSquare === false) ) {
    //     console.log("column = " + column)
    //     console.log("row-1 = " + (row-1))
    //     console.log(board[column][row-1].getPossibility)
    //     putNumber(column, row-1, board[column][row-1].getPossibility)
    //   } else if ( board[south[0]][south[1]].getPossibility === 'mine' ) {
    //     break
    //   } else {
    //     break
    //   }
    // }
    
    // if ( Array.isArray(southWest) ) {
    //   if ( (board[column-1][row-1].getPossibility === 0) && (board[column-1][row-1].getClickedThisSquare === false) ) {
    //     console.log("column-1 = " + (column-1))
    //     console.log("row-1 = " + (row-1))
    //     console.log(board[column-1][row-1].getPossibility)
    //     revealEmptyTiles(checkSouthWestTile(column, row))
    //   } else if ( (board[column-1][row-1].getPossibility > 0) && (board[column-1][row-1].getClickedThisSquare === false) ) {
    //     console.log("column-1 = " + (column-1))
    //     console.log("row-1 = " + (row-1))
    //     console.log(board[column-1][row-1].getPossibility)
    //     putNumber(column-1, row-1, board[column-1][row-1].getPossibility)
    //   } else if ( board[southWest[0]][southWest[1]].getPossibility === 'mine' ) {
    //     break
    //   } else {
    //     break
    //   }
    // }

    // if ( Array.isArray(west) ) {
    //   if ( (board[column-1][row].getPossibility === 0) && (board[column-1][row].getClickedThisSquare === false) ) {
    //     console.log("column-1 = " + column-1)
    //     console.log("row = " + row)
    //     console.log(board[column-1][row].getPossibility)
    //     revealEmptyTiles(checkTileOnLeft(column, row))
    //   } else if ( (board[column-1][row].getPossibility > 0) && (board[column-1][row].getClickedThisSquare === false) ) {
    //     console.log("column-1 = " + column-1)
    //     console.log("row = " + row)
    //     console.log(board[column-1][row].getPossibility)
    //     putNumber(column-1, row, board[column-1][row].getPossibility)
    //   } else if ( board[west[0]][west[1]].getPossibility === 'mine' ) {
    //     break
    //   } else {
    //     break
    //   }
    // }
    
    // if ( Array.isArray(northWest) ) {
    //   if ( (board[column-1][row+1].getPossibility === 0) && (board[column-1][row+1].getClickedThisSquare === false) ) {
    //     console.log("column-1 = " + (column-1))
    //     console.log("row-1 = " + (row-1))
    //     console.log(board[column-1][row+1].getPossibility)
    //     revealEmptyTiles(checkNorthWestTile(column, row))
    //   } else if ( (board[column-1][row+1].getPossibility > 0) && (board[column-1][row+1].getClickedThisSquare === false) ) {
    //     console.log("column-1 = " + (column-1))
    //     console.log("row-1 = " + (row-1))
    //     console.log(board[column-1][row+1].getPossibility)
    //     putNumber(column-1, row+1, board[column-1][row+1].getPossibility)
    //   } else if ( board[northWest[0]][northWest[1]].getPossibility === 'mine' ) {
    //     break
    //   } else {
    //     break
    //   }
    // }

  //   expandSpiral++
  // } while ( listOfClueNumbers[column][row] === undefined || (column >= 0 && column < board.length) || ((row >= 0 && row < board.length)) && (board[column][row].getClickedThisSquare === false) )

  // while ( (column < board.length) && (row < board.length) && (column >= 0) && (row >= 0) && (possibilities != 'mine') )

  // if (numberStopValue > 0) {
  //   putNumber(column, row, numberStopValue)
  // }
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
  //   }
    
  //   expandSpiral++
  //   console.log("expandSpiral = " + expandSpiral)
  // } while ( listOfClueNumbers[column][row] != 'clue number' || (column >= 0 && column < board.length) || (row >= 0 && row < board.length) )
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

  // function revealAdjacentEmpties(listOfEmpties) {
  //   for (let i=0; i < listOfEmpties.length; i++) {
  //     let column = parseInt( listOfEmpties.getPositionOrDivID.slice(1,2) )
  //     let row = parseInt( listOfEmpties.getPositionOrDivID.slice(-1) )
  //     let possibilities = listOfEmpties[i].getPossibility
  //     clickedAnEmptyCell(column, row, possibilities)
  //   }
  // }


  // function changeTileAppearance(possibility, column, row, eachColumnAndRow) {
  //   let whatIsUnderTheTile = {
  //     mine: function() {
  //       $('#board').find('#' + eachColumnAndRow).removeClass('undiscovered').addClass('game-over')
  //       console.log('put picture of "../imgs/Mine_256x256_32.png" on ' + eachColumnAndRow)
  //     },
  //     0: function() {
  //       console.log('nothing to see here, move along')
  //       $('#board').find('#c' + column + 'r' + row).removeClass('undiscovered').addClass('grey-background-with-inner-shadow')
  //     }
  //   }

  //   return whatIsUnderTheTile[possibility]()
  // }
