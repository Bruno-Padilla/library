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

/* Books wrapper */
const booksWrapper = document.querySelector(".books-wrapper");


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

    const newBook = new Book(myLibrary, title, author, category, pages, readed);

    // Close and reset form
    addBookFormDialog.close();
    addBookForm.reset();

    // Add the new book to the library
    addBookToLibrary(newBook, myLibrary);
});


/* - - - - - GLOBAL VARIABLES - - - - - */
const myLibrary = [];
drawBooks(myLibrary);


/* - - - - - FUNCTIONS - - - - - */
/* Book constructor */
function Book(library, title, author, category, pages, readed) {
    this.title = title;
    this.author = author;
    this.category = category;
    this.pages = pages;
    this.readed = readed;
    this.id = library.length;
}

/* Add book to the library  */
function addBookToLibrary(newBook, library) {
    library.push(newBook);

    // Create new book element
    const book = document.createElement("div");
    book.classList.add("book");
    book.innerHTML = `
        <div class="cover"></div>

        <div class="info">
            <div class="title">${newBook.title}</div>
            <div class="author">by ${newBook.author}</div>
            <div class="category">${newBook.category}</div>

            <div class="pages">
                <span>${newBook.pages} pages</span>
                
                <div class="buttons">
                    <button class="edit-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415" /><path d="M16 5l3 3" /></svg></button>
                    <button class="delete-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg></button>
                </div>
            </div>

            <span hidden class="id">${newBook.id}</span>
        </div>
    `;
    
    // Add color to the book cover
    const bookCover = book.querySelector(".cover");
    bookCover.style.backgroundColor = newBook.readed ? "green" : "red";

    // Add edit and delete buttons functionality
    const editBtn = book.querySelector(".edit-btn");
    editBtn.onclick = editBook;

    const deleteBtn = book.querySelector(".delete-btn");
    deleteBtn.onclick = deleteBook;
    
    // Add book element to the DOM
    booksWrapper.appendChild(book);
}

/* Edit Book */
function editBook() {
    alert("editing");
}

/* Delete Book */
function deleteBook() {
    alert("deleting");
}