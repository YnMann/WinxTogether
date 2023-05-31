import { Book } from "./book.js";
import { Reader } from './reader.js'
const log = console.log;

//Класс Библиотека основной, будет отвечать за работу страницы
class Library {
    #userData = [];           //Data Где будут храниться новые юзеры;
    #giveOutBookData = [];    //Data или список в котором будут храниться книги, отсутствующие "взятые из библиотеки"
    constructor(){
        this.newBooksUrl = 'https://www.dbooks.org/api/recent';  //Url для получения трендовых книг/новинок
        this.searchUrl = 'https://www.dbooks.org/api/search/'    //Url для поиска
        this.trendyBooksShelf = null;      //Див/Полка с трендовыми книгами
        this.searchResult = null;          //Див/Полка с результатлм поиска
        this.reader = null;                //Пользователь на момент использования
    }

    // main(){
    //     this.newBooks();
    // }

    //Метод для добавления нового читателя библиотеки;
    //Надо будет подключить к кнопке Регистрация
    newReader(){
        //Создается юзер
        //Ерден, есть такая тема! Можно смотреть длину this.#userData и передавать ее в твой класс, чтобы обозначить ID верно
        //то есть если длина this.#userData = 0
        //let user = new Reader(this.#userData.length) здесь this.#userData.length = 0;
        //ты получаешь ноль и присваиваешь его своему свойству this.id = 0 в конструкторе и т.д.
        let user = new Reader();
        //После регистрации читатель автоматически входит в библиотеку, становится current читателем
        this.reader = user;
        //Пушится в дату со всеми читателями this.#userData
        this.#userData.push(user);
    }

    //Метод для возврата книги
    //надо подклюсить на кнопку Сдать
    return(title, authors){
        //У нас есть data с книгами которые недоступны/используются читателями.
        //Делаем перебор ДАТЫ чтобы просмотреть каждую книгу и сравнить с введенным названием и авторами
        for(let book of this.#giveOutBookData){
            //Когда находим совпадение
            if(book.title === title && book.authors === authors){
                //Вызываем метод Возврата у книги, чтобы очистить ее свойства читатель book.readerId 
                //и день возврата book.returnDatе
                book.returnBook();
                //У нашего пользователя также обнуляем свойства? Пока не знаю какие именно
                //Одним словом Пользователь тоже вернул книгу
                this.reader.removeBook();
                //И удаляем книгу из нашей ДАТЫ, где хранится список недоступных книг
                let index = this.#giveOutBookData.indexOf(book);
                this.#giveOutBookData.slice(index, 1);
            }
        }
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
