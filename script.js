"use strict";

const newBookBtn = document.querySelector('#btn-newbook');
const addBookBtn = document.querySelector('#btn-addbook');
const formNewbook = document.querySelector('#form-newbook div');
const modal = document.querySelector('#modal');
const main = document.querySelector("#main");
const modalTitle = document.querySelector("#modal-title");
const modalAuthor = document.querySelector("#modal-author");
const modalPages = document.querySelector("#modal-pages");
const modalRead = document.querySelector("#modal-read");

let myLibrary = [];

class Book {
    constructor (title, author, pages, read) {
        this.title = title ? title : 'Unknown';
        this.author = author ? author : 'Unknown';
        this.pages = pages ? pages : 0;
        this.read = read;
        this.numID = myLibrary.length;
    }
}

function getBookData() {
    return new Book(modalTitle.value, modalAuthor.value, modalPages.value, modalRead.checked);
}

function refreshLibrary() {
    main.innerHTML = ""
    for (const book of myLibrary) {
        const bookHTML = document.createElement("div")
        bookHTML.className = "book"
        bookHTML.innerHTML = 
            `
            <span class="btn-del" numID="${book.numID}"> x </span>
            <div class="title">${book.title}</div>
            <div class="author">${book.author}</div>
            <div class="pages">${book.pages} pages</div>
            <div class="modal-finished">
                <label for="read-${book.numID}">Read</label>
                <input id="read-${book.numID}" class="modal-read" type="checkbox" ${(book.read) ? "checked" : ""}>
            </div>
            `
        main.appendChild(bookHTML);
    }
}

function deleteBook (index) {
    myLibrary.splice(index, 1);
    for (const book in myLibrary) {
        myLibrary[book].numID = book
    }
    refreshLibrary();
}

function addBookToLibrary(event) {
    event.preventDefault();
    if (modalTitle.value === "") {
        alert("Title cannot be empty")
    } else {
        const book = getBookData();
        myLibrary.push(book);
        modal.classList.add("hidden");
        refreshLibrary();
        modalTitle.value = ""
        modalAuthor.value = "" 
        modalPages.value = ""
        modalRead.checked = false
    }
}

addBookBtn.addEventListener('click', addBookToLibrary)

newBookBtn.addEventListener('click', () => {modal.classList.remove("hidden")})

modal.addEventListener('click', (e) => {if (e.target.id == 'modal') {modal.classList.add("hidden")}})

main.addEventListener('click', (e) => {
    if (e.target.className === "btn-del") {
        deleteBook(e.target.attributes.numID.value)
    } else if (e.target.className === "modal-read") {
        if (myLibrary[e.target.id.replace('read-','')].read) {
            myLibrary[e.target.id.replace('read-','')].read = false
        } else {
            myLibrary[e.target.id.replace('read-','')].read = true
        }
    }  
})