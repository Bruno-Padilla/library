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
const btnSubmitAddBookForm = document.querySelector(".formDialog .btn-submit");

/* Books wrapper */
const booksWrapper = document.querySelector(".books-wrapper");


/* - - - - - EVENTS - - - - - */
/* Click "add book" */
btnShowAddBookForm.onclick = () => {
    addBookFormDialog.showModal();
    addBookFormDialog.querySelector(".btn-submit").textContent = "Submit";
}

/* Click "close" book form */
btnCloseAddBookForm.onclick = () => {
    addBookFormDialog.close();
    addBookForm.reset();
}

/* Click "submit/edit" book form */
btnSubmitAddBookForm.addEventListener("click", (event) => {
    // Check form validity
    if (!addBookForm.checkValidity()) return;
    event.preventDefault();
    
    // If the button says "Submit"
    if (addBookForm.querySelector(".btn-submit").textContent == "Submit") {
        // Create new book with the form info
        const title = titleCased(addBookFormTitleInput.value);
        const author = titleCased(addBookFormAuthorInput.value);
        const category = titleCased(addBookFormCategoryInput.value);
        const pages = addBookFormPagesInput.value;
        const readed = addBookFormReadedInput.checked;
    
        const book = new Book(myLibrary, title, author, category, pages, readed);
        
        // Add the new book to the library
        addBookToLibrary(book, myLibrary);
    }

    // If the button says "Edit"
    else if (addBookForm.querySelector(".btn-submit").textContent == "Edit") {
        const books = document.querySelectorAll(".book");
        
        for (let book of books) {
            if (book.querySelector(".bookID").textContent == selectedBookID) { 
                // Get book's new properties
                const bookTitle = addBookFormDialog.querySelector(".title input").value;
                const bookAuthor = addBookFormDialog.querySelector(".author input").value;
                const bookCategory = addBookFormDialog.querySelector(".category select").value;
                const bookPages = addBookFormDialog.querySelector(".pages input").value;
                const bookReaded = addBookFormDialog.querySelector(".readed input").checked;


                // Edit book on the library array
                const bookIndex = myLibrary.findIndex(currentBook => currentBook.id == selectedBookID);
                myLibrary[bookIndex] = {
                    id: selectedBookID,
                    title: bookTitle,
                    author: bookAuthor,
                    category: bookCategory,
                    pages: bookPages,
                    readed: bookReaded
                }
                
                // Edit book properties on the DOM
                book.querySelector(".title").textContent = bookTitle;
                book.querySelector(".author").textContent = "by " + bookAuthor;
                book.querySelector(".category").textContent = bookCategory;
                book.querySelector(".pages span").textContent = bookPages + " pages";
                bookReaded ? book.querySelector(".cover").style.backgroundColor = "green" : book.querySelector(".cover").style.backgroundColor = "red";

                selectedBookID = null;

                break;
            }
        }
    }

    // Close and reset form
    addBookFormDialog.close();
    addBookForm.reset();
});


/* - - - - - GLOBAL VARIABLES - - - - - */
let selectedBookID = null;
const myLibrary = [
    {
        id: crypto.randomUUID(),
        title: "The Hobbit",
        author: "J Tolkien",
        category: "Fantasy",
        pages: "310",
        readed: true
    },

    {
        id: crypto.randomUUID(),
        title: "Dune",
        author: "Frank Herbert",
        category: "Science Fiction",
        pages: "412",
        readed: false
    }
];
drawBooks(myLibrary);


/* - - - - - FUNCTIONS - - - - - */
/* Book constructor */
function Book(library, title, author, category, pages, readed) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.category = category;
    this.pages = pages;
    this.readed = readed;
}

/* Add book to the library  */
function addBookToLibrary(newBook, library) {
    // Add book to the library array
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

            <span hidden class="bookID">${newBook.id}</span>
        </div>
    `;
    
    // Add color to the book cover
    const bookCover = book.querySelector(".cover");
    bookCover.style.backgroundColor = newBook.readed ? "green" : "red";

    // Add book listener for buttons functionality
    book.addEventListener("click", event => {
        event.stopPropagation();

        // Delete Button
        const deleteBtnPressed = event.target.closest(".delete-btn");

        if (deleteBtnPressed) {
            // Remove book from the library array
            const bookID = book.querySelector(".bookID").textContent
            const bookIndex = library.findIndex(currentBook => currentBook.id == bookID);
            library.splice(bookIndex, 1);

            // Remove book from the DOM
            book.remove();
        };

        // Edit button
        const editButtonPressed = event.target.closest(".edit-btn");

        if (editButtonPressed) {
            // Show form with the book info
            addBookFormDialog.querySelector(".title input").value = book.querySelector(".title").textContent;
            addBookFormDialog.querySelector(".author input").value = book.querySelector(".author").textContent.slice(3);
            addBookFormDialog.querySelector(".category select").value = book.querySelector(".category").textContent;
            addBookFormDialog.querySelector(".pages input").value = book.querySelector(".pages span").textContent.slice(0, -6);
            if (book.querySelector(".cover").style.backgroundColor == "green") addBookFormDialog.querySelector(".readed input").checked = true;
            addBookFormDialog.querySelector(".btn-submit").textContent = "Edit";
            addBookFormDialog.showModal();
            
            selectedBookID = book.querySelector(".bookID").textContent;
        }
    });
    
    // Add book element to the DOM
    booksWrapper.appendChild(book);
}

/* Title Case Any Text */
function titleCased(text) {
    return text.toLowerCase()
            .split(" ")
            .map(word => word.at(0).toUpperCase() + word.slice(1))
            .join(" ");
}

/* Draw books on the DOM from the library */
function drawBooks(library) {
    for (let newBook of library) {

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

                <span hidden class="bookID">${newBook.id}</span>
            </div>
        `;
        
        // Add color to the book cover
        const bookCover = book.querySelector(".cover");
        bookCover.style.backgroundColor = newBook.readed ? "green" : "red";

        // Add book listener for buttons functionality
        book.addEventListener("click", event => {
            event.stopPropagation();

            // Delete Button
            const deleteBtnPressed = event.target.closest(".delete-btn");

            if (deleteBtnPressed) {
                // Remove book from the library array
                const bookID = book.querySelector(".bookID").textContent
                const bookIndex = library.findIndex(currentBook => currentBook.id == bookID);
                library.splice(bookIndex, 1);

                // Remove book from the DOM
                book.remove();
            };

            // Edit button
            const editButtonPressed = event.target.closest(".edit-btn");

            if (editButtonPressed) {
                // Show form with the book info
                addBookFormDialog.querySelector(".title input").value = book.querySelector(".title").textContent;
                addBookFormDialog.querySelector(".author input").value = book.querySelector(".author").textContent.slice(3);
                addBookFormDialog.querySelector(".category select").value = book.querySelector(".category").textContent;
                addBookFormDialog.querySelector(".pages input").value = book.querySelector(".pages span").textContent.slice(0, -6);
                if (book.querySelector(".cover").style.backgroundColor == "green") addBookFormDialog.querySelector(".readed input").checked = true;
                addBookFormDialog.querySelector(".btn-submit").textContent = "Edit";
                addBookFormDialog.showModal();
                
                selectedBookID = book.querySelector(".bookID").textContent;
            }
        });
        
        // Add book element to the DOM
        booksWrapper.appendChild(book);
    }
}