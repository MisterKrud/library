const myLibrary = [];
const docBody = document.querySelector("body");
const card = document.getElementById("card");
const newBookForm = document.getElementById("new-book-entry");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");


const submitButton = document.querySelector("button");
const dialog = document.querySelector("dialog");
const showButton = document.getElementById("add-new");
const cancelButton = document.getElementById("cancel");

showButton.addEventListener("click", () => dialog.showModal());

cancelButton.addEventListener("click", (e) => {

  dialog.close();
  e.preventDefault();
});

function Book(title, author, pages, read, id) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages. Read=${read}.`;
  };
}

function addBookToLibrary(newTitle, newAuthor, newPages, newRead, bookId) {
  const book = new Book(
    newTitle,
    newAuthor,
    newPages,
    newRead,
    (bookId = crypto.randomUUID())
  );

  myLibrary.push(book);

  addBookToDom();
}

function addBookToDom() {
  let n = myLibrary.length;
  const newCard = document.createElement("div");
  newCard.className = "book-card";
  newCard.setAttribute("data-id", `${myLibrary[n - 1].id}`);
  const newCardTitle = document.createElement("h3");
  

  const newCardAuthor = document.createElement("div");

  const newCardPages = document.createElement("div");

  const newCardRead = document.createElement("div");
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  docBody.appendChild(newCard);
 
  newCard.appendChild(newCardTitle);
  newCard.appendChild(newCardAuthor);
  newCard.appendChild(newCardPages);
  newCard.appendChild(newCardRead);
  newCard.appendChild(deleteButton);

 
  newCardTitle.textContent = `${myLibrary[n - 1].title}`;

  newCardAuthor.innerHTML = `<span class="category">Author: </span>${myLibrary[n - 1].author}`;
  newCardPages.innerHTML = `<span class="category">Pages: </span>${myLibrary[n - 1].pages}`;
  newCardRead.innerHTML = `<span class="category">Read? </span>${myLibrary[n - 1].read}`;
  deleteButton.innerHTML = "Delete this book";

  getDeleteButton();
  clearDialogFields();
  
}

function getDeleteButton() {
  let deleteButtonArray = document.querySelectorAll(".delete-button");
  deleteButtonArray.forEach((i) => {
    i.addEventListener("click", (
        
    ) => {
      let confirmText = "Are you sure you want to delete?"

      if (confirm(confirmText) == true){
     
      focus(i);
      console.log('BEGIN');

      let deleteId = i.parentElement.getAttribute("data-id");

      const indexForDeletion = myLibrary.findIndex((book) => {
        return book.id === deleteId;
      });
      

      console.log(deleteId);
      if(indexForDeletion === -1){
        console.log('not found')
      } else{
        
        i.parentElement.remove();
      console.log(`index to delete is: ${indexForDeletion}`);
      let deletedItems = [];
      console.table(myLibrary);
      deletedItems.push(myLibrary.splice(indexForDeletion, 1));
      console.table(`deletedItems: ${deletedItems}`);
      console.table(`After deletion, array is: ${myLibrary}`);
      return deletedItems;
      }
      } else{
        console.log('cancelled')
      }
     
        
      

    });
  });
}



submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  const readValue = () => (readInput.value === "yes" ? "Yes" : "No");

  addBookToLibrary(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readValue()
  );
  dialog.close();
});

function clearDialogFields() {
  titleInput.value = '';
  authorInput.value ='';
  pagesInput.value ='';

}