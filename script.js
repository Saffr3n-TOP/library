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

const addBtn = document.querySelector('button');
addBtn?.addEventListener('click', () =>
  document.querySelector('dialog')?.showModal()
);

const dialog = document.querySelector('dialog');
dialog?.addEventListener('click', (e) => {
  const rect = dialog.getBoundingClientRect();
  if (
    e.clientX < rect.left ||
    e.clientX > rect.right ||
    e.clientY < rect.top ||
    e.clientY > rect.bottom
  ) {
    dialog.close();
  }
});

const form = document.querySelector('form');
form?.addEventListener('submit', () => {
  const [title, author, pages, isRead] = form.querySelectorAll('input');

  addToLibrary(title.value, author.value, +pages.value, isRead.checked);
  populateDOM();
  dialog?.close();

  title.value = '';
  author.value = '';
  pages.value = '';
  isRead.checked = false;
});

/**
 * @param {string} title
 * @param {string} author
 * @param {number} pages
 * @param {boolean} isRead
 */
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

/**
 * @param {string} title
 * @param {string} author
 * @param {number} pages
 * @param {boolean} isRead
 */
function addToLibrary(title, author, pages, isRead) {
  library.push(new Book(title, author, pages, isRead));
}

function populateDOM() {
  /** @type {HTMLElement | null} */
  const libraryElement = document.querySelector('.library');
  if (libraryElement) libraryElement.innerHTML = '';
  document.querySelector('p')?.remove();

  if (library.length) {
    for (let i = 0; i < library.length; i++) {
      const bookElement = document.createElement('div');
      bookElement.classList.add('book');

      const bookTitle = document.createElement('h2');
      bookTitle.textContent = library[i].title;

      const bookAuthorField = document.createElement('span');
      bookAuthorField.textContent = 'Author: ';

      const bookAuthor = document.createElement('span');
      bookAuthor.classList.add('bold');
      bookAuthor.textContent = library[i].author;
      bookAuthorField.appendChild(bookAuthor);

      const bookPagesField = document.createElement('span');
      bookPagesField.textContent = 'Pages: ';

      const bookPages = document.createElement('span');
      bookPages.classList.add('bold');
      bookPages.textContent = library[i].pages.toString();
      bookPagesField.appendChild(bookPages);

      const bookSeparator = document.createElement('hr');

      const bookIsRead = document.createElement('span');
      bookIsRead.classList.add('italic');
      bookIsRead.style.color = library[i].isRead ? 'lime' : 'yellow';
      bookIsRead.textContent = `You${
        library[i].isRead ? "'ve" : " haven't"
      } read this book ${library[i].isRead ? 'already' : 'yet'}`;

      const markReadBtn = document.createElement('button');
      markReadBtn.textContent = `${library[i].isRead ? 'Not' : 'Is'} read`;
      markReadBtn.addEventListener('click', () => {
        library[i].isRead = !library[i].isRead;
        populateDOM();
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        library.splice(i, 1);
        populateDOM();
      });

      const bookControls = document.createElement('span');
      bookControls.classList.add('controls');
      bookControls.append(markReadBtn, deleteBtn);

      bookElement.append(
        bookTitle,
        bookAuthorField,
        bookPagesField,
        bookSeparator,
        bookIsRead,
        bookControls
      );

      libraryElement?.appendChild(bookElement);
    }
  } else {
    const para = document.createElement('p');
    para.textContent = 'There are no books yet...';
    document.body.appendChild(para);
  }
}

// #region - Overwrite weird behaviour for HTML Dialog Element

// Prevent Enter key from closing Dialog before Form validation
form?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (!form.checkValidity()) form.reportValidity();
    else form.dispatchEvent(new Event('submit'));
  }
});

// Prevent Space key on Checkbox from closing Dialog
/** @type {HTMLInputElement | null} */
const checkbox = document.querySelector('[type="checkbox"]');
checkbox?.addEventListener('keydown', (e) => {
  if (e.key === ' ') {
    e.preventDefault();
    checkbox.checked = !checkbox.checked;
  }
});

// Prevent Space key on Submit Button from closing Dialog before Form validation
/** @type {HTMLButtonElement | null} */
const submitBtn = document.querySelector('[type="submit"]');
submitBtn?.addEventListener('keydown', (e) => {
  if (!form) return;
  if (e.key === ' ') {
    e.preventDefault();
    if (!form.checkValidity()) form.reportValidity();
    else form.dispatchEvent(new Event('submit'));
  }
});

// #endregion

populateDOM();
