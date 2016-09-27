function reloadGame() {
  $('body').on("click", 'button', function(e) {
    e.preventDefault()

    $(".column-div").remove()
    minePositions = {}
    clueNumbers = {}
    listOfClueNumbers = [[],[],[],[],[],[],[],[],[]]
    listOfAllOtherTiles = []
    numberOfRevealedTiles = 0
    createBoard()
    randomizeMinePositions()
    putNumbersAroundMines(minePositions)
    getAllNotMinesTiles()
    $('.overlay').remove()
  })
}

/*
  Check if coordinates are inside or outside the allowed area.
  
  These get the coordinates of the adjacent tiles in different 
  directions from the tile that was clicked.
  If the coordinates are NOT outside the edge of the grid, 
  then it returns an array with [column, row].
  If not, it returns 'undefined'.
*/
function checkTileAbove(column, row) {
  let tileAbove = row + 1
  if (tileAbove < board.length) {
    return [column, tileAbove]
  }
}

function checkNorthEastTile(column, row) {
  let tileOnRight = column + 1
  let tileAbove = row + 1
  if ( (tileAbove < board.length) && (tileOnRight < board.length) ) {
    return [tileOnRight, tileAbove]
  }
}

function checkTileOnRight(column, row) {
  let tileOnRight = column + 1
  if (tileOnRight < board.length) {
    return [tileOnRight, row]
  }
}

function checkSouthEastTile(column, row) {
  let tileOnRight = column + 1
  let tileBelow = row - 1
  if ( (tileOnRight < board.length) && (tileBelow >= 0) ) {
    return [tileOnRight, tileBelow]
  }
}

function checkTileBelow(column, row) {
  let tileBelow = row - 1
  if (tileBelow >= 0) {
    return [column, tileBelow]
  }
}

function checkSouthWestTile(column, row) {
  let tileOnLeft = column - 1
  let tileBelow = row - 1
  if ( (tileBelow >= 0) && (tileOnLeft >= 0) ) {
    return [tileOnLeft, tileBelow]
  }
}

function checkTileOnLeft(column, row) {
  let tileOnLeft = column - 1
  if (tileOnLeft >= 0) {
    return [tileOnLeft, row]
  }
}

function checkNorthWestTile(column, row) {
  let tileOnLeft = column - 1
  let tileAbove = row + 1
  if ( (tileOnLeft >= 0) && (tileAbove < board.length) ) {
    return [tileOnLeft, tileAbove]
  }
}