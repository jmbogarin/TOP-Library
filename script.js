"use strict";

const addBookBtn = document.querySelector('#btn-addbook');
const formNewbook = document.querySelector('#form-newbook div')

let myLibrary = [];

class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read
    }
}

function getBookData() {
    const values = []
    for (const el of formNewbook.children) {
        values.push(el.value)
    }
    return new Book(...values);
}

function addBookToLibrary(event) {
    event.preventDefault();
    const book = getBookData();
    console.dir(book)
}



addBookBtn.addEventListener('click', addBookToLibrary)