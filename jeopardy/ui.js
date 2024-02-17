"use strict";

const $jeopardyBoard = $("#JeopardyBoard");
const $startButton = $("#StartButton");
const $loadingSpinner = $("#LoadingSpinner");

// Value of game will become the Game instance populated below
let game;


/** Fill the HTML table #jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <th> for each category
 * - The <tbody> should be filled w/ game.numCluesPerCat <tr>s,
 *   each with a question for each category in a <td>
 *   (initially, just show a "?" where the que stion/answer would go.)
 */
function fillTable() {

  //fill categories
  let $thead = $('<thead></thead>');
  let $trHead = $('<tr></tr>');
  for (let category of game.categories) {
    const $category = $(`<th scope='col'>${category.title}</th>`);
    $trHead.prepend($category);
  }
  $thead.prepend($trHead);
  $jeopardyBoard.prepend($thead);
  //fill clues
  for (let i = 0; i < game.categories[0].clues.length; i++) {
    let $row = $('<tr></tr>');
    for (let category of game.categories) {
      let $clue = $(`<td data-clue-number='${i}' class='${category.title} id='poo'>?</td>`);
      $row.prepend($clue);
      $clue.on('click', handleClueClick);
    }
    $jeopardyBoard.append($row);
  }


}



/** Handle clicking on a clue: show the question or answer, update clue status.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question
 * - if currently "question", show answer
 * - if currently "answer", ignore click
 *
 * */
function handleClueClick(evt) {
  console.log(evt.target.attr('class'));

}


/**
 * Shows loading spinner,
 * updates Start button text to "Loading...",
 * hides game board.
 */
function showLoadingState() {
  $startButton.html("Restart!");
  $(".spinner-border").show();

}

/**
 * Shows game board, updates start button text and hides loading spinner.
 */
function hideLoadingState() {
  $(".spinner-border").hide();

}


// DO NOT CHANGE ANY CODE BELOW THIS LINE

/**
 * Generates new game instance and populates game board in DOM.
 */
async function handleStartClick() {
  showLoadingState();

  game = new Game();
  await game.populateCategoryData();

  fillTable();
  hideLoadingState();
}

$startButton.on("click", handleStartClick);
$jeopardyBoard.on("click", "td", handleClueClick);