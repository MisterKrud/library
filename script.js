const myLibrary = [];
const docBody = document.querySelector("body")
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

showButton.addEventListener('click', () => dialog.showModal())

cancelButton.addEventListener('click', (e) => {dialog.close()
    e.preventDefault()
})


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
    const newCard = document.createElement("div")
    newCard.className = "book-card";
   const newCardHeading = document.createElement("h4")
    const newCardTitle = document.createElement("div");
    
    
    const newCardAuthor = document.createElement("div");
   
    const newCardPages = document.createElement("div");
    
    const newCardRead = document.createElement("div");
    docBody.appendChild(newCard)
    newCard.appendChild(newCardHeading);
    newCard.appendChild(newCardTitle);
    newCard.appendChild(newCardAuthor);
    newCard.appendChild(newCardPages);
    newCard.appendChild(newCardRead);

    newCardHeading.textContent = `Book ${n} `
    newCardTitle.textContent=`Title: ${myLibrary[n-1].title}`;
  
    newCardAuthor.textContent=`Author: ${myLibrary[n-1].author}`;
    newCardPages.innerHTML=`No. of pages: ${myLibrary[n-1].pages}`;
    newCardRead.textContent=`Read yet? ${myLibrary[n-1].read}`;
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

const readValue = () => (readInput.value === "yes"? "Yes" : "No")

  addBookToLibrary(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readValue()
    
  );
  dialog.close();
});


