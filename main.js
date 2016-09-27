// require ('./setup-board.js')
// require ('./game-logic.js')

requirejs.config({
    "baseUrl": "./",
    "paths": {
      "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
      "setup-board": "./setup-board",
      "helper": "./helper",
      "game-logic": "./game-logic"
    }
});

requirejs(["main"]);