/* - - - - - HTML ELEMENTS - - - - - */
/* Form elements */
const addBookFormDialog = document.querySelector(".formDialog");
const addBookForm = document.querySelector("form");
const addBookFormTitleInput = document.querySelector(".formDialog .title input");
const addBookFormAuthorInput = document.querySelector(".formDialog .author input");
const addBookFormCategoryInput = document.querySelector(".formDialog .category select");
const addBookFormPagesInput = document.querySelector(".formDialog .pages input");
const addBookFormReadedInput = document.querySelector(".formDialog .readed input");

/* Buttons */
const btnShowAddBookForm = document.querySelector(".btn-addBook");
const btnCloseAddBookForm = document.querySelector(".formDialog .btn-closeForm");
const btnCreateNewBook = document.querySelector(".formDialog .btn-submit");


/* - - - - - EVENTS - - - - - */
/* Click "add book" */
btnShowAddBookForm.onclick = () => addBookFormDialog.showModal();

/* Click "close" book form */
btnCloseAddBookForm.onclick = () => addBookFormDialog.close();

/* Click "submit" book form */
btnCreateNewBook.addEventListener("click", (event) => {
    // Check form validity
    if (!addBookForm.checkValidity()) return;
    event.preventDefault();
    
    // Create new book with the form info
    title = addBookFormTitleInput.value;
    author = addBookFormAuthorInput.value;
    category = addBookFormCategoryInput.value;
    pages = addBookFormPagesInput.value;
    readed = addBookFormReadedInput.checked;
    
    const newBook = new Book(title, author, category, pages, readed);

    // Close and reset form
    addBookFormDialog.close();
    addBookForm.reset();

    // Add the new book to the library
    addBookToLibrary(newBook);
});


/* - - - - - GLOBAL VARIABLES - - - - - */
const myLibrary = [];


/* - - - - - FUNCTIONS - - - - - */
/* Book constructor */
function Book(title, author, category, pages, readed) {
    this.title = title;
    this.author = author;
    this.category = category;
    this.pages = pages;
    this.readed = readed;
}

/* Add book to the library array */
function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
    console.log(myLibrary);
}