"use strict";

const $jeopardyBoard = $("#JeopardyBoard");
const $startButton = $("#StartButton");
const $loadingSpinner = $("#LoadingSpinner");

// Value of game will become the Game instance populated below
let game;
let randomClueArray = [];



/** getRandomClueArray: Returns randomClueArray in a randomly sorted order.*/
function getRandomClueArray() {
  //Fills array up to the number of clues per category.
  for (let i = 0; i < game.numCluesPerCat; i++) {
    randomClueArray.push(i);
  }
  //Randomly sorts the array.
  for (let i = randomClueArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomClueArray[i], randomClueArray[j]] = [randomClueArray[j], randomClueArray[i]];
  }
  return randomClueArray;

}



/**fillTable: Creates and fills table with categories at the head and clues
 * in each cell.
 */
function fillTable() {

  //Fill categories
  let $thead = $('<thead></thead>');
  let $trHead = $('<tr></tr>');
  for (let category of game.categories) {
    const $category = $(`<th
                            scope="col"
                            class='text-center'>
                            ${category.title.toUpperCase()}
                            </th>`);
    $trHead.prepend($category);
  }
  $thead.prepend($trHead);
  $jeopardyBoard.prepend($thead);

  //Fill clues
  let clueOrder = getRandomClueArray();
  for (let i = 0; i < game.numCluesPerCat; i++) {
    let $row = $('<tr class="table-row"></tr>');
    for (let j = 0; j < game.categories.length; j++) {
      let $clue = $(`<td
                        data-clue-number='${clueOrder[i]}'
                        data-category-id='${j}'
                        class='bg-primary text-center'>
                        ?</td>`);
      $row.prepend($clue);
    }
    $jeopardyBoard.append($row);
  }
}


/** Handle clicking on a clue: show the question or answer, update clue status.
*/
function handleClueClick(evt) {
  let categoryInstance = game.categories[evt.target.dataset.categoryId];
  let clueInstance = categoryInstance.clues[evt.target.dataset.clueNumber];

  if (clueInstance.showing === null) {
    evt.target.innerHTML = clueInstance.question;
  } else {
    evt.target.className = "bg-success text-center";
    evt.target.innerHTML = clueInstance.answer;
  }
  clueInstance.updateShowingStatus();

}


/**
 * Shows loading spinner,
 * updates Start button text to "Loading...",
 * empties table.
 */
function showLoadingState() {
  $(".spinner-border").show();
  $startButton.html("Loading...");
  $("table").empty();
}

/**
 * Updates start button text and hides loading spinner.
 */
function hideLoadingState() {
  $startButton.html("Restart");
  $(".spinner-border").hide();
}


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