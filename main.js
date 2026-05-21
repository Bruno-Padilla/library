/* - - - - - HTML ELEMENTS - - - - - */
const btnAddBook = document.querySelector(".btn-addBook");
const newBookForm = document.querySelector(".formDialog");
const closeNewBookForm = document.querySelector(".formDialog .header .btn-closeForm");


/* - - - - - EVENTS - - - - - */
btnAddBook.onclick = () => newBookForm.showModal();
closeNewBookForm.onclick = () => newBookForm.close();


/* - - - - - FUNCTIONS - - - - - */
