"use strict";

const newBookBtn = document.querySelector('#btn-newbook');
const addBookBtn = document.querySelector('#btn-addbook');
const formNewbook = document.querySelector('#form-newbook div');

const modal = document.querySelector('#modal');

const main = document.querySelector("#main");

let myLibrary = [];

class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.numID = myLibrary.length;
    }
}

function getBookData() {
    const values = []
    for (const el of formNewbook.children) {
        values.push(el.value)
    }
    return new Book(...values);
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
            <label>Read<input type="checkbox" ${(book.read === "on") ? "checked" : ""}></label>
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
    const book = getBookData();
    myLibrary.push(book);
    modal.classList.add("hidden");
    refreshLibrary();
    for (const el of formNewbook.children) {
        el.value = ""
        el.checked = false
    }
}

addBookBtn.addEventListener('click', addBookToLibrary)

newBookBtn.addEventListener('click', () => {modal.classList.remove("hidden")})

modal.addEventListener('click', (e) => {if (e.target.id == 'modal') {modal.classList.add("hidden")}})

main.addEventListener('click', (e) => {
    if (e.target.className === "btn-del") {
        deleteBook(e.target.attributes.numID.value)
    }
    
})