"use strict";

const $jeopardyBoard = $("#JeopardyBoard");
const $startButton = $("#StartButton");
const $loadingSpinner = $("#LoadingSpinner");

// Value of game will become the Game instance populated below
let game;
let randomClueArray = [0, 1, 2, 3, 4];



/** getRandomClueArray: Returns randomClueArray in a randomly sorted order.*/
function getRandomClueArray() {
  for (let i = randomClueArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomClueArray[i], randomClueArray[j]] = [randomClueArray[j], randomClueArray[i]];
  }
  return randomClueArray;

}



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
    const $category = $(`<th scope="col" class='text-center'>${category.title.toUpperCase()}</th>`);
    $trHead.prepend($category);
  }
  $thead.prepend($trHead);
  $jeopardyBoard.prepend($thead);




  //fill clues

  let clueOrder = getRandomClueArray();
  for (let i = 0; i < game.numCluesPerCat; i++) {
    let $row = $('<tr class="table-row"></tr>');
    for (let j = 0; j < game.categories.length; j++) {
      let $clue = $(`<td data-clue-number='${clueOrder[i]}' data-category-id='${j}'
        class='bg-primary text-center'>?</td>`);
      $row.prepend($clue);

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
  // let categoryInstance = game.categories.find(category => category.id ===
  //   Number(evt.target.dataset.categoryId));
  let categoryInstance = game.categories[evt.target.dataset.categoryId];

  let clue = categoryInstance.clues[evt.target.dataset.clueNumber];

  if (clue.showing === null) {
    evt.target.innerHTML = clue.question;
  } else {
    evt.target.className = "bg-success text-center";
    evt.target.innerHTML = clue.answer;
  }
  clue.showing = 'null' ? 'question' : 'answer';

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
  $("table").empty();
  showLoadingState();

  game = new Game();
  await game.populateCategoryData();
  addClueData();

  fillTable();
  hideLoadingState();
}

$startButton.on("click", handleStartClick);
$jeopardyBoard.on("click", "td", handleClueClick);