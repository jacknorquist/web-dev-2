"use strict";

const BASE_API_URL = "https://rithm-jeopardy.herokuapp.com/api/";
let CATEGORY_IDS = [2, 3, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18];


/** Game class: provides functionality for fetching Jeopardy data from the API
 *    and handling non-UI game logic.
 *
 *  Game will have:
 *  - numCategories: integer
 *  - numCluesPerCat: integer
 *  - categories:
 *    [
 Category {
        title: "Math",
        clues: [
         Clue {question: "2+2", answer: "4", showing: null},
         Clue {question: "1+1", answer: "2", showing: null},
         ... 3 more clues ...
         ],
       },
 Category {
       title: "Literature",
        clues: [
         Clue {question: "Hamlet Author", answer: "Shakespeare", showing: null},
         Clue {question: "Bell Jar Author", answer: "Plath", showing: null}, ...
        ],
       }, ...4 more Categories ...
 ]
 */
class Game {

  /** Construct each Game instance from:
   *  - numCategories: integer (default 6)
   *  - numCluesPerCat: integer (default 5)
   */
  constructor(numCategories = 6, numCluesPerCat = 5) {
    this.numCategories = numCategories;
    this.numCluesPerCat = numCluesPerCat;
    this.categories = [];
  }

  /**
   * Simple function to fetch a large batch of high-level raw category
   * data from jService API.
   *
   * Accepts:
   *   - count: int
   *
   * Returns array of raw category objects:
   *
   * [{id, title, clues_count}, {id, title, clues_count}, ... ]
   * Maximum 14 categories from api.
   */
  async fetchCategoryBatch(count) {
    const categoriesParams = new URLSearchParams({ count });
    const response = await fetch(
      `${BASE_API_URL}categories?${categoriesParams}`,
      {
        method: "GET"
      }
    );

    return await response.json();
  }

  /** Get this.numCategories random category IDs from API.
   *
   * Returns array of category ids, eg [4, 12, 5, 9, 20, 1]
   */
  async getRandomCategoryIds() {
    for (let i = CATEGORY_IDS.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [CATEGORY_IDS[i], CATEGORY_IDS[j]] = [CATEGORY_IDS[j], CATEGORY_IDS[i]];
    }
    return CATEGORY_IDS.slice(0, this.numCategories);

  }


  /** Setup category data for game instance:
   *
   * - get random category Ids
   * - get data for each category
   * - populate categories array
   */
  async populateCategoryData() {
    // TODO: We've provided some structure for this function, but you'll need
    // to fill in the value for the catIds variable and the body of the loop
    // below.
    //
    const catIds = await this.getRandomCategoryIds();

    for (const catId of catIds) {

      const response = await fetch(
        `${BASE_API_URL}/category?id=${catId}`
      );
      let category = await response.json();


      this.categories.push(new Category(category.title, category.clues));
      // TODO: Add necessary code to fetch category data & generate
      // new instance for each catId. Populate categories array accordingly.

    }

    //makes new instance for for each clue in the category, adds the clue instance
    //to an array and sets the categorie's clues equal to the array of clue instances
  }
}


//Creates Clue instance, adds the instance to the clues array of category instance
function addClueData() {
  for (let category of game.categories) {
    let clues = [];
    for (let clue of category.clues) {
      clues.push(new Clue(clue.question, clue.answer));
    }
    category.clues = clues;
  }

}

/** Category class: holds category data
 *
 *  Category will have:
 *   - title: string
 *   - clues: array of Clue instances [Clue {}, Clue {}, ...]
 */
class Category {

  /** Construct each Category instance from:
   *  - title: string
   *  - clues: array of Clue instances [Clue {}, Clue {}, ...]
   */
  constructor(title, clues) {
    this.title = title;
    this.clues = clues;
  }

  /** Static method to fetch all the information for a particular
   * category from jService API.
   *
   * Accepts:
   *   - id: int
   *
   * Returns raw object of category info from API:
   *
   * { id, title, clues_count, clues }
   */
  static async fetchCategoryDetail(id) {
    const response = await fetch(
      `${BASE_API_URL}/category?id=${id}`
    );

    return response.json();

  }

  /** Static method to return new Category instance with data about a category:
   *
   * Accepts:
   *  - id: integer
   *  - numCluesPerCat: integer
   *
   * Returns Category { title: "Literature", clues: clue-array }
   *
   * Where clue-array is:
   *   [
   *      Clue {question: "Hamlet Author", answer: "Shakespeare", showing: null},
   *      Clue {question: "Bell Jar Author", answer: "Plath", showing: null},
   *      ... 3 more ...
   *   ]
   */
  static async getCategory(id, numCluesPerCat) {
    const response = await fetch(
      `${BASE_API_URL}/category?id=${id}`
    );
    let newCategory = await response.json();
    console.log(await newCategory);
    let newCategoryInstance = new Category(newCategory.title, newCategory.clues);
    return (newCategoryInstance.title, newCategoryInstance.clues.slice(0, numCluesPerCat));
  }
}

/** Clue class: holds clue data and showing status
 *
 * Clue will have:
 *  - question: string
 *  - answer: string
 *  - showing: default of null, then string of either "question" or "answer"
 */
class Clue {

  /** Construct each Clue instance from:
   *  - question: string
   *  - answer: string
   */
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
    this.showing = null;
  }

  /** Update showing status on Clue, depending on current state
   * Returns: undefined
   */
  updateShowingStatus() {
    this.showing = (!this.showing) ? "question" : "answer";
  }
}
