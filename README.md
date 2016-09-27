# The Hurt Locker Sweeper
#### Explosive Ordinance Disposal

[Play The Game!!](https://explosive-ordinance-disposal.herokuapp.com/)

## About

Minesweeper clone, named after the film "<i>The Hurt Locker</i>" ([https://en.wikipedia.org/wiki/The_Hurt_Locker](https://en.wikipedia.org/wiki/The_Hurt_Locker)).

(The name and the images are just for fun, because they deal with mines/bombs in that film.  So this is a parody.  All copyright belongs to their creators.)

### Technologies Used
- JavaScript
- [QUnit](https://qunitjs.com/)
- AJAX
- jQuery
- CSS
- HTML5

## Who made this?

### Contributor List
- Bernice Anne W. Chua
  - [GitHub](https://github.com/BerniceChua)
  - [LinkedIn](https://linkedin.com/in/bernicechua415)
  - [Twitter](https://twitter.com/ChuaBernice)


## Contributing

I welcome any pull requestions people might have for additional snippets.

I would love to support more languages as well.

## Feedback

Please send feedback by [opening a new Issue](https://github.com/BerniceChua/the-hurt-locker-sweeper/issues/new), or by [clicking on the Issues tab above](https://github.com/BerniceChua/the-hurt-locker-sweeper/issues).  Feedback can also be sent to the person(s) in the contributor list through the links under their name(s).

## Issues
#### Stretch Goals
  1. add requirejs 
    (so that index.html won't have too many script tags)
  2. find a way to do event delegation for clicking the tiles.
    ```
    document.getElementById("board").addEventListener("click", function(e) {
      e.preventDefault()
      alert('hello')
      alert( "$(this).attr('id') = " + $(this).attr('id') )
      var test = $(e.target).attr('id')
      if ( $(this).attr('id') === $(e.target).attr('id') ) {
        alert("$(e.target).attr('id') = " + $(e.target).attr('id'));
      }
    })
    ```
    instead of `$(this).on('click', function(e){...}`, also this will
    get rid of this error msg: 
    `game-logic.js:25 Uncaught TypeError: Cannot read property 'NaN' of undefined`
    which happens when anything aside from the tiles are clicked.
  3. modes = easy, medium, difficult
    - easy = 9x9 board; 10 mines
    - medium = 16x16 board; 40 mines
    - difficult = 16x30 board; 99 mines
    - currently, only on "easy mode"
  4. add timer
  5. add ability to place a flag with right click
  6. do this in React???? (maybe)


## License

[MIT](LICENSE)