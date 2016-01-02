'use strict';

// Conway's game of life

//KNOWN ISSUES
// Neighbors are showing up even when on the opposite side of the board.

var shouldPlay = false,
    cells = [],
    boardWidth = 50,
    boardLength = 2500,
    $board = $('.board-container'),
    timer,
    pulsar = [];

//Every generation
//loop through array and run isAlive
function nextGeneration () {
  var nextStep = [];

  for(var i = 0; i < boardLength; i += 1 ){
    nextStep[i] = IsAlive(i, cells[i]);

    var $cell = $('#cell-' + i);
    $cell.removeClass('true').addClass(nextStep[i].toString());
  }

  cells = nextStep;

  if(shouldPlay === true) {
    setTimeout(nextGeneration, 100);
  }
}

//takes in a cell position,
// then checks it's neighbors to se if it should be alive or dead.
function IsAlive(cell, alive) {
  var livingNeighbors = 0;

  //Is north alive
  if(cells[cell - boardWidth]) {
    livingNeighbors += 1;
  }

  //Is north-east alive
  if(cells[(cell - boardWidth) + 1]) {
    livingNeighbors += 1;
  }

  //Is east alive
  if(cells[cell + 1]) {
    livingNeighbors += 1;
  }

  //Is south-east alive
  if(cells[(cell + boardWidth) + 1]) {
    livingNeighbors += 1;
  }

  //Is South Alive
  if(cells[cell + boardWidth]){
    livingNeighbors += 1;
  }

  //Is south-west alive
  if(cells[(cell + boardWidth) - 1]) {
    livingNeighbors += 1;
  }

  //Is west alive
  if(cells[cell - 1]) {
    livingNeighbors += 1;
  }

  //Is north-west alive
  if(cells[(cell - boardWidth) - 1]) {
    livingNeighbors += 1;
  }

  //Any live cell with two or three live neighbours lives on to the next generation.
  if(livingNeighbors === 2 && alive) {
    return true;
  }

  //Any live cell with two or three live neighbours lives on to the next generation.
  //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  if(livingNeighbors === 3) {
    return true;
  }

  return false;
}

//On Cell clicked, toggle cell
function cellClicked(event){
  var cell = $(event.target || event.srcElement);

  if(cell.hasClass('true')){
    cell.removeClass('true');
    cells[parseInt(cell.attr('id').substr(5, 10))] = false;
    return;
  }

  cells[parseInt(cell.attr('id').substr(5, 10))] = true;
  cell.addClass('true');
}

function start(){
  shouldPlay = true;
  nextGeneration();
}

function stop(){
  shouldPlay = false;
}

function reset() {
  stop();
  for(var i = 0; i < boardLength; i++){
    cells[i] = false;
    $('#cell-' + i).removeClass('true');
  }
  stop();
}

$('.start').on('click', start);
$('.stop').on('click', stop);
$('.reset').on('click', reset);

//Fills the board with dead cells
function Init() {
  for(var i = 0; i < boardLength; i++){
    cells.push(false);
    var cell = $board.append('<div id="cell-' + i + '" class="false"></div>');
    $('#cell-' + i).on('click', cellClicked);
  }
}

Init();

