// QUnit.config.autostart = false;
// require(
//   [ "setup-board.js", "helper.js", "game-logic.js" ],
//   function() {
//     QUnit.start();
//   }
// );


let randomColumnNumber = Math.floor(Math.random() * (board.length-1) )
let randomRowNumber = Math.floor(Math.random() * (board.length-1) )
let divID = 'c' + randomColumnNumber + 'r' + randomRowNumber


function insideBoard(column, row) {
  if (column >= 0 && column < board.length) {
    if (row >= 0 && row < board.length) {
      return true
    }
  }
}

QUnit.test( "createBoard() tests", function( assert ) {
  assert.ok(
    Array.isArray(createBoard()) === true, 
    "createBoard() should create a board made of an array (of arrays)."
    );
  assert.ok(
    createBoard().length === 9, 
    "the board should have 9 'columns' (arrays)."
    );
  assert.ok(
    createBoard()[randomColumnNumber].length === 9, 
    "randomly selected 'column' array on the board should have 9 'rows' (inner arrays)."
    );
  assert.ok( 
    board[randomColumnNumber][randomRowNumber].getPositionOrDivID === divID, 
    "randomly selected column (" + randomColumnNumber + ") & row (" + randomRowNumber + ") will always contain a 'Square' Object with the attribute specified: board[randomColumnNumber][randomRowNumber].getPositionOrDivID = " + board[randomColumnNumber][randomRowNumber].getPositionOrDivID + " is the same as divID " + divID + "."
    );
  assert.ok( 
    board[randomColumnNumber][randomRowNumber].getClickedThisSquare === false, 
    "randomly selected column (" + randomColumnNumber + ") & row (" + randomRowNumber + ") will always contain a 'Square' Object with the attribute specified: board[randomColumnNumber][randomRowNumber].getClickedThisSquare should return false, because it is initialized as false, because it was unclicked/unrevealed."
    );
});


QUnit.test( "helper.js tests", function( assert ) {
  assert.equal(
    Array.isArray(checkTileAbove(4, 4)), true, 
    "if the tile above is within bounds, checkTileAbove(column, row) should return an array [column, row] of the tile above."
    );
  assert.equal(
    checkTileAbove(4, 4)[1], 5, 
    "if the tile above is within bounds, checkTileAbove(column, row) should return the tile above, which means the row is +1. (checkTileAbove(4, 4) === [" + checkTileAbove(4,4) + "])"
    );
  assert.equal(
    checkTileAbove(4, 4)[0], 4, 
    "checkTileAbove(column, row) should still return the same 'column' array.  (checkTileAbove(4, 4) === [" + checkTileAbove(4,4) + "])"
    );
  assert.equal(
    Array.isArray(checkTileAbove(4, 8)), false, 
    "if the tile above is outside bounds, checkTileAbove(column, row) should NOT return an array (here, column=4 & row=8).  (checkTileAbove(4, 8) === " + checkTileAbove(4,8) + ")"
    );
  assert.ok(
    checkTileAbove(4, 8) === undefined, 
    "if the tile above is within bounds, checkTileAbove(column, row) should return 'undefined' (here, column=4 & row=8).  (checkTileAbove(4, 8) === " + checkTileAbove(4,8) + ")"
    );
  

  assert.equal(
    Array.isArray(checkNorthEastTile(4, 4)), true, 
    "if the tile on north east is within bounds, checkNorthEastTile(column, row) should return an array [column, row] of the tile on north east."
    );
  assert.equal(
    checkNorthEastTile(4, 4)[0], 5, 
    "if the tile on north east is within bounds, checkNorthEastTile(column, row) should return the tile on north east, which means the column is +1. (checkNorthEastTile(4, 4) === [" + checkNorthEastTile(4,4) + "])"
    );
  assert.equal(
    checkNorthEastTile(4, 4)[1], 5, 
    "if the tile on north east is within bounds, checkNorthEastTile(column, row) should return the tile on north east, which means the row is +1. (checkNorthEastTile(4, 4) === [" + checkNorthEastTile(4, 4) + "])"
    );
  assert.equal(
    Array.isArray(checkNorthEastTile(4, 8)), false, 
    "if the tile on north east is outside bounds, checkNorthEastTile(column, row) should NOT return an array (here, column=8 & row=8).  (checkNorthEastTile(8, 8) === " + checkNorthEastTile(8, 8) + ")"
    );
  assert.ok(
    checkNorthEastTile(4, 8) === undefined, 
    "if the tile on north east is outside bounds, checkNorthEastTile(column, row) should return 'undefined' (here, column=8 & row=8).  (checkNorthEastTile(8, 8) === [" + checkNorthEastTile(8, 8) + "])"
    );

  assert.equal(
    Array.isArray(checkTileOnRight(4, 4)), true, 
    "if the tile on right is within bounds, checkTileOnRight(column, row) should return an array [column, row] of the tile on right."
    );
  assert.equal(
    checkTileOnRight(4, 4)[0], 5, 
    "if the tile on right is within bounds, checkTileOnRight(column, row) should return the tile on the right, which means the column is +1. (checkTileOnRight(4, 4) === [" + checkTileOnRight(4,4) + "])"
    );
  assert.equal(
    checkTileOnRight(4, 4)[1], 4, 
    "checkTileOnRight(column, row) should still return the same 'row'.  (checkTileOnRight(4, 4) === [" + checkTileOnRight(4,4) + "])"
    );
  assert.equal(
    Array.isArray(checkTileOnRight(8, 4)), false, 
    "if the tile on right is outside bounds, checkTileOnRight(column, row) should NOT return an array (here, column=8 & row=4).  (checkTileOnRight(8, 4) === [" + checkTileOnRight(4,8) + "])"
    );
  assert.ok(
    checkTileOnRight(8, 4) === undefined, 
    "if the tile on right is outside bounds, checkTileOnRight(column, row) should return 'undefined' (here, column=8 & row=4).  (checkTileOnRight(8, 4) === [" + checkTileOnRight(8, 4) + "])"
    );

  assert.equal(
    Array.isArray(checkSouthEastTile(4, 4)), true, 
    "if the tile on south east is within bounds, checkSouthEastTile(column, row) should return an array [column, row] of the tile on south east."
    );
  assert.equal(
    checkSouthEastTile(4, 4)[0], 5, 
    "if the tile on south east is within bounds, checkSouthEastTile(column, row) should return the tile on south east, which means the column is +1. (checkSouthEastTile(4, 4) === [" + checkSouthEastTile(4,4) + "])"
    );
  assert.equal(
    checkSouthEastTile(4, 4)[1], 3, 
    "if the tile on south east is within bounds, checkSouthEastTile(column, row) should return the tile on south east, which means the row is -1. (checkSouthEastTile(4, 4) === [" + checkSouthEastTile(4, 4) + "])"
    );
  assert.equal(
    Array.isArray(checkSouthEastTile(0, 0)), false, 
    "if the tile on south east is outside bounds, checkSouthEastTile(column, row) should NOT return an array (here, column=0 & row=0).  (checkSouthEastTile(0, 0) === " + checkSouthEastTile(0, 0) + ")"
    );
  assert.ok(
    checkSouthEastTile(0, 0) === undefined, 
    "if the tile on south east is outside bounds, checkSouthEastTile(column, row) should return 'undefined' (here, column=0 & row=0).  (checkSouthEastTile(0, 4) === [" + checkSouthEastTile(0, 0) + "])"
    );

  assert.equal(
    Array.isArray(checkTileBelow(4, 4)), true, 
    "if the tile below is within bounds, checkTileBelow(column, row) should return an array [column, row] of the tile below."
    );
  assert.equal(
    checkTileBelow(4, 4)[1], 3, 
    "if the tile below is within bounds, checkTileBelow(column, row) should return the tile on the right, which means the row is -1. (checkTileBelow(4, 4) === [" + checkTileBelow(4,4) + "])"
    );
  assert.equal(
    checkTileBelow(4, 4)[0], 4, 
    "checkTileBelow(column, row) should still return the same 'column'.  (checkTileBelow(4, 4) === [" + checkTileBelow(4,4) + "])"
    );
  assert.equal(
    Array.isArray(checkTileBelow(4, 0)), false, 
    "if the tile below is outside bounds, checkTileBelow(column, row) should NOT return an array (here, column=4 & row=0).  (checkTileBelow(4, 0) === [" + checkTileBelow(4,0) + "])"
    );
  assert.ok(
    checkTileBelow(4, 0) === undefined, 
    "if the tile below is outside bounds, checkTileBelow(column, row) should return 'undefined' (here, column=4 & row=0).  (checkTileBelow(4, 0) === [" + checkTileBelow(4, 0) + "])"
    );

  assert.equal(
    Array.isArray(checkSouthWestTile(4, 4)), true, 
    "if the tile on south west is within bounds, checkSouthWestTile(column, row) should return an array [column, row] of the tile on south west."
    );
  assert.equal(
    checkSouthWestTile(4, 4)[0], 3, 
    "if the tile on south west is within bounds, checkSouthWestTile(column, row) should return the tile on south west, which means the column is -1. (checkSouthWestTile(4, 4) === [" + checkSouthWestTile(4,4) + "])"
    );
  assert.equal(
    checkSouthWestTile(4, 4)[1], 3, 
    "if the tile on south west is within bounds, checkSouthWestTile(column, row) should return the tile on south west, which means the row is -1. (checkSouthWestTile(4, 4) === [" + checkSouthWestTile(4, 4) + "])"
    );
  assert.equal(
    Array.isArray(checkSouthWestTile(0, 0)), false, 
    "if the tile on south west is outside bounds, checkSouthWestTile(column, row) should NOT return an array (here, column=0 & row=0).  (checkSouthWestTile(0, 0) === " + checkSouthWestTile(0, 0) + ")"
    );
  assert.ok(
    checkSouthWestTile(0, 0) === undefined, 
    "if the tile on south west is outside bounds, checkSouthWestTile(column, row) should return 'undefined' (here, column=0 & row=0).  (checkSouthWestTile(0, 4) === [" + checkSouthWestTile(0, 0) + "])"
    );

  assert.equal(
    Array.isArray(checkTileOnLeft(4, 4)), true, 
    "if the tile on left is within bounds, checkTileOnLeft(column, row) should return an array [column, row] of the tile on left."
    );
  assert.equal(
    checkTileOnLeft(4, 4)[0], 3, 
    "if the tile on left is within bounds, checkTileOnLeft(column, row) should return the tile on the right, which means the column is -1. (checkTileOnLeft(4, 4) === [" + checkTileOnLeft(4,4) + "])"
    );
  assert.equal(
    checkTileOnLeft(4, 4)[1], 4, 
    "checkTileOnLeft(column, row) should still return the same 'row'.  (checkTileOnLeft(4, 4) === [" + checkTileOnLeft(4,4) + "])"
    );
  assert.equal(
    Array.isArray(checkTileOnLeft(0, 4)), false, 
    "if the tile on left is outside bounds, checkTileOnLeft(column, row) should NOT return an array (here, column=0 & row=4).  (checkTileOnLeft(0, 4) === [" + checkTileOnLeft(0, 4) + "])"
    );
  assert.ok(
    checkTileOnLeft(0, 4) === undefined, 
    "if the tile on left is outside bounds, checkTileOnLeft(column, row) should return 'undefined' (here, column=0 & row=4).  (checkTileOnLeft(0, 4) === [" + checkTileOnLeft(0, 4) + "])"
    );

  assert.equal(
    Array.isArray(checkNorthWestTile(4, 4)), true, 
    "if the tile on north west is within bounds, checkNorthWestTile(column, row) should return an array [column, row] of the tile on north west."
    );
  assert.equal(
    checkNorthWestTile(4, 4)[0], 3, 
    "if the tile on north west is within bounds, checkNorthWestTile(column, row) should return the tile on north west, which means the column is -1. (checkNorthWestTile(4, 4) === [" + checkNorthWestTile(4,4) + "])"
    );
  assert.equal(
    checkNorthWestTile(4, 4)[1], 5, 
    "if the tile on north west is within bounds, checkNorthWestTile(column, row) should return the tile on north west, which means the row is +1. (checkNorthWestTile(4, 4) === [" + checkNorthWestTile(4, 4) + "])"
    );
  assert.equal(
    Array.isArray(checkNorthWestTile(0, 8)), false, 
    "if the tile on north west is outside bounds, checkNorthWestTile(column, row) should NOT return an array (here, column=0 & row=8).  (checkNorthWestTile(0, 8) === " + checkNorthWestTile(0, 8) + ")"
    );
  assert.ok(
    checkNorthWestTile(0, 8) === undefined, 
    "if the tile on north west is outside bounds, checkNorthWestTile(column, row) should return 'undefined' (here, column=0 & row=8).  (checkNorthWestTile(0, 8) === [" + checkNorthWestTile(0, 8) + "])"
    );

});


QUnit.test( "randomizeMinePositions() tests", function( assert ) {
  let mineColumn = parseInt(Object.keys(minePositions)[0].slice(1,2))
  let mineRow = parseInt(Object.keys(minePositions)[0].slice(-1))

  assert.ok(
    randomizeMinePositions() === minePositions, 
    "randomizeMinePositions() should create a hash (Object)."
    );
  assert.ok(
    Object.keys(randomizeMinePositions()).length === 10, 
    "the board should have 10 Objects."
    );
  assert.ok(
    mineColumn >= 0, 
    "randomly selected 'mine' Object should be within the boundaries of the board (column number should be bigger than -1)."
    );
  assert.ok(
    mineColumn < board.length, 
    "randomly selected 'mine' Object should be within the boundaries of the board (column number should be smaller than board.length=9)."
    );
  assert.ok(
    mineRow >= 0, 
    "randomly selected 'mine' Object should be within the boundaries of the board (row number should be bigger than -1)."
    );
  assert.ok(
    mineColumn < board.length, 
    "randomly selected 'mine' Object should be within the boundaries of the board (row number should be smaller than board.length=9)."
    );
  assert.ok(
    insideBoard(mineColumn, mineRow) === true, 
    "randomly selected 'mine' Object should be within the boundaries of the board (column number AND row number should be within 0 to 8, inclusive).(column = "+ mineColumn +", row = " + mineRow + ", Object.keys(minePositions)[0] = " +Object.keys(minePositions)[0]+ ")"
    );
  // assert.ok( 
  //   board[mineColumn][mineRow].getPossibility === 'mine', 
  //   "the Object at column (" + mineColumn + ") & row (" + mineRow + ") will always contain a 'Square' Object with the attribute specified: board[mineColumn][mineRow].getPossibility = " + board[mineColumn][mineRow].getPossibility + "."
  //   );

});