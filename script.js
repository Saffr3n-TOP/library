// @ts-check

/**
 * @type {{
 *   title: string,
 *   author: string,
 *   pages: number,
 *   isRead: boolean
 * }[]}
 */
const library = [];

/**
 * @param {string} title
 * @param {string} author
 * @param {number} pages
 * @param {boolean} [isRead]
 */
function Book(title, author, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

/**
 * @param {string} title
 * @param {string} author
 * @param {number} pages
 * @param {boolean} [isRead]
 */
function addToLibrary(title, author, pages, isRead = false) {
  library.push(new Book(title, author, pages, isRead));
}
