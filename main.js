import { Book } from "./book.js";
// import { Reader } from './reader.js'
const log = console.log;

const url = 'https://www.dbooks.org/api/recent';
// fetchData(url);

// async function fetchData(url){
    // let response =  fetch(url).then(response => response.json()).then(response => log(response));
// }

const xhrTrendBooks = new XMLHttpRequest();

xhrTrendBooks.onreadystatechange = (ev) => {
    if(xhrTrendBooks.status === 200){
        if(xhrTrendBooks.readyState ===xhrTrendBooks.DONE){
            let result = JSON.parse(xhrTrendBooks.response);
            log(result.books);

            let divShelf = document.querySelector('.trend-books');

            for(let i=0 ; i<10; i++){
                let book = new Book(result.books[i]);
                divShelf.append(book.view);
            }
        }
    }
}

xhrTrendBooks.open('get', url, true);
xhrTrendBooks.send();

let inputSearch = document.querySelector('#search-book');
let searchButton = document.querySelector('#search');

const xhrSearch = new XMLHttpRequest();

xhrSearch.onreadystatechange = (ev) => {
    if(xhrSearch.status === 200){
        if(xhrSearch.readyState ===xhrSearch.DONE){
            let result = JSON.parse(xhrSearch.response);
            log(result);

            let divResult = document.querySelector('.search-result');
            divResult.innerHTML = '';

            for(let i=0 ; i<10; i++){
                let book = new Book(result.books[i]);
                divResult.append(book.view);
            }
        }
    }
}

searchButton.addEventListener('click', () => {
    let text = inputSearch.value;
    log(text);

    xhrSearch.open('get', `https://www.dbooks.org/api/search/${text}`,  true);
    xhrSearch.send();
});

class Library {
    #userData = [];
    #giveOutBookData = [];
    constructor(){
        

    }

    newUser(){
        let user = new Reader();
        this.#userData.push(user);
    }

    return(title, authors){
        let book = 
        this.#giveOutBookData.slice

    }


}