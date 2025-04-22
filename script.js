function Books(title, author, pages, read) {
    if(!new.target){
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if(read===true){
            let readInfo = "read"
        } else if(read===false){
            let readInfo = "not read yet"
        } else {
            let readInfo = "unknown if read"
        }
        return(`${title} by ${author}, ${pages} pages, ${readInfo}.`)
    }
}