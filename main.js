import { Book } from "./book.js";
import { Reader } from './reader.js'
const log = console.log;

class Library {
    #userData = [];
    #giveOutBookData = [];
    constructor(){
        this.newBooksUrl = 'https://www.dbooks.org/api/recent';
        this.searchUrl = 'https://www.dbooks.org/api/search/'
        this.trendyBooksShelf = null;
        this.searchResult = null;
    }

    main(){
        this.newBooks();
    }

    newUser(){
        let user = new Reader();
        this.#userData.push(user);
    }

    return(title, authors){
        let book = 
        this.#giveOutBookData.slice
    }

    newBooks(divShelf){
        this.trendyBooksShelf = divShelf;
        let response =  fetch(this.newBooksUrl)
                        .then(response => response.json())
                        .then(response => {
                            log(response.books);
                            for(let i = 0; i < 10; i++){
                              let book = new Book(response.books[i]);
                              this.trendyBooksShelf.append(book.view);
                            }
                        });
    }

    search(text, divResult){
        this.searchResult = divResult;
        this.searchResult.innerHTML = '';
        let response = fetch(this.searchUrl + text)
                        .then(response => response.json())
                        .then(response => {
                            log(response.books)
                            for(let i = 0; i < 10; i++){
                                let book = new Book(response.books[i]);
                                this.searchResult.append(book.view);
                            }
                        });
    }
}

// const url = 'https://www.dbooks.org/api/recent';

// let response =  fetch(url).then(response => response.json()).then(response => log(response));

let data = {
    fullName: ''
    , address: ''
    , phoneNum: ''
    , image: ''
};

//Создаю библиотеку по классу Library
const library = new Library();
//Получаю див куда будут заноситься новинки книг через метод library.newBooks(divShelf);
let divShelf = document.querySelector('.trend-books');
library.newBooks(divShelf);
//Подключаю поиск на кнопку searchButton через метод из библиотеки library.search(text, divResult)
// И ввожу в этот метод поиска текст из инпута
let inputSearch = document.querySelector('#search-book');
let searchButton = document.querySelector('#search');
let divResult = document.querySelector('.search-result');
searchButton.addEventListener('click', () => {
    let text = inputSearch.value;
    library.search(text, divResult);
})
