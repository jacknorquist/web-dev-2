"use strict";

const BASE_API_URL = "https://rithm-jeopardy.herokuapp.com/api/";
const CATEGORY_IDS = [2, 3, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18];


/** Game class: provides functionality for fetching Jeopardy data from the API
 * and handling non-UI game logic.
 */
class Game {
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

  /**
   * getRandomCategoryIds: Returns an array with random category ids.
   */
  getRandomCategoryIds() {
    for (let i = CATEGORY_IDS.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [CATEGORY_IDS[i], CATEGORY_IDS[j]] = [CATEGORY_IDS[j], CATEGORY_IDS[i]];
    }
    return CATEGORY_IDS.slice(0, this.numCategories);

  }

  /**populateCategoryData: gets category data from api, creates new Category
   * instance, and adds the instance to the game's categories.
   */
  async populateCategoryData() {
    //Array of random category ids
    const catIds = this.getRandomCategoryIds();

    for (const catId of catIds) {
      const response = await fetch(`${BASE_API_URL}/category?id=${catId}`);
      const category = await response.json();

      //Creates clue instance for each clue inside of category
      const categoryClues = [];
      for (let clue of category.clues) {
        categoryClues.push(new Clue(clue.question, clue.answer));
      }

      this.categories.push(new Category(category.title, categoryClues));
    }
  }
}


/** Category class: holds category's title and clues. Class holds static method
 * the returns category details and static method that returns category
 * instance.
 */
class Category {

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
   */
  static async getCategory(id, numCluesPerCat) {
    const response = await fetch(`${BASE_API_URL}/category?id=${id}`);
    let newCategory = await response.json();

    let categoryClues = [];
    for (let i = 0; i < numCluesPerCat; i++) {
      categoryClues.push(new Clue(newCategory.clues[i].question,
        newCategory.clues[i].answer));
    }
    return new Category(newCategory.title, categoryClues);
  }
}

/** Clue class: holds clue data and showing status
 */
class Clue {
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
