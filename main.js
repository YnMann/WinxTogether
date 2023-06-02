import { Book } from "./book.js";
import { Reader } from './reader.js';
import { Form } from './form.js';
const log = console.log;

//Класс Библиотека основной, будет отвечать за работу страницы
class Library {

    constructor(){
        this.userData = [];                //Data Где будут храниться новые юзеры;
        this.giveOutBookData = [];         //Data или список в котором будут храниться книги, отсутствующие "взятые из библиотеки"
        this.newBooksUrl = 'https://www.dbooks.org/api/recent';       //Url для получения трендовых книг/новинок
        this.searchUrl = 'https://www.dbooks.org/api/search/'         //Url для поиска
        this.trendyBooksShelf = null;      //Див/Полка с трендовыми книгами
        this.searchResult = null;          //Див/Полка с результатлм поиска
        this.giveOutBooksShelf = null;     //Див/Полка для недоступных книг
        this.reader = null;                //Пользователь на момент использования
        this.pageReaderResult = null;
        this.divReader = null;              //div в котором хранится читатель. Нужен для Лог Аута
    }

    // main(){
    //     this.newBooks();
    // }

    //Метод для добавления нового читателя библиотеки;
    //Надо будет подключить к кнопке Регистрация
    newReader(data, divForReaderResult){
        //Получаю див где отображается учетка
        this.pageReaderResult = divForReaderResult;
        //Создается юзер
        let user = new Reader(data, this);
        //После регистрации читатель автоматически входит в библиотеку, становится current читателем
        this.reader = user;
        //Пушится в дату со всеми читателями this.userData
        this.userData.push(user);
        log(this.userData);
        //Автоматически войти в учетку
        this.divReader = this.reader.view;
        this.pageReaderResult.append(this.divReader);
    }

    //Метод для входа существующего юзера
    logIn(id){
        //Нахожу пользователя по айди в дате и вставляю его в див
        this.reader = this.userData[id];
        log(this.reader.view);
        this.divReader = this.reader.view;
        this.pageReaderResult.append(this.divReader);
    }

    //Метод для выхода читателя из учетки
    logOut() {
        //обнуляю current читателя
        this.reader = null;
        //Очищаю див от учетки
        this.divReader.remove();
    }

    //Метод, для получения/чтения книги
    readBook(book){
        this.giveOutBookData.push(book);
        log(this.giveOutBookData);
        this.reader.addBook(book);
        this.showGiveOutBooks(this.giveOutBooksShelf);

    // }else {
    //     for(let book of libraryBooksData){
    //         if(book.title === this.title && book.authors === this.authors) continue;
    //         else {
    //             this.library.readBook(this);
    //         }

    //         //Книга выдается на семь дней от дня когда ее взяли
    //         // let today = new Date(); // + 7 дней
    //         // this.returnDate.setDate(today.getDate() + 7);

    //         //Синхронизирую, для того чтобы убрать пометку что она Доступна в диве, ведь ее забрали
    //         this.sync();
    //     }
    // }
        }

    //Метод для возврата книги
    return(title, authors){
        //У нас есть data с книгами которые недоступны/используются читателями.
        //Делаем перебор ДАТЫ чтобы просмотреть каждую книгу и сравнить с введенным названием и авторами
        for(let book of this.giveOutBookData){
            //Когда находим совпадение
            if(book.title === title && book.authors === authors){
                //У нашего пользователя также обнуляем свойства? Пока не знаю какие именно
                //Одним словом Пользователь тоже вернул книгу
                this.reader.removeBook(book);
                //И удаляем книгу из нашей ДАТЫ, где хранится список недоступных книг
                let index = this.giveOutBookData.indexOf(book);
                this.giveOutBookData.slice(index, 1);
            }
        }
        this.showGiveOutBooks(this.giveOutBooksShelf);
    }

    //метод для получения и отображения новинок, получает в себя див куда будут вноситься полученные книги
    newBooks(divShelf){
        //присваиваю свойству в классе полученный элемент(див)
        //Пока не знаю, нужен или нет... Ощущение как будто в библиотеке синхронизацию тоже придется делать
        this.trendyBooksShelf = divShelf;
        //Делаю запрос на новинки через newBooksUrl
        let response =  fetch(this.newBooksUrl)
                        .then(response => response.json())  //представляю в виде джейсона
                        .then(response => {
                            log(response.books);
                            //отображаю 10 новинок!
                            // Никита, если нужно поменять колличесто, меняй
                            for(let i = 0; i < 10; i++){
                                if(this.giveOutBookData.length == 0){
                                    //Каждую книгу создаю при помощи класса Book внося в него его дату
                                    let book = new Book(response.books[i], this);
                                    //свойство book.view хранит див с полным отображением книги, вставляю книгу в див резудьтата поиска
                                    this.trendyBooksShelf.append(book.view);
                                }else {
                                    //Проверяю есть ли книга у меня в списке выданных
                                    for(let givenBook of this.giveOutBookData){
                                        if(response.books[i].id === givenBook.id){
                                            this.trendyBooksShelf.append(givenBook.view);
                                        }else {
                                            //Каждую книгу создаю при помощи класса Book внося в него его дату
                                            let book = new Book(response.books[i], this);
                                            //свойство book.view хранит див с полным отображением книги, вставляю книгу на "полку" с новинками
                                            this.trendyBooksShelf.append(book.view);
                                        }
                                    }
                                } 
                            }
                        });
    }

    //Метод поиска книги
    //Получет текст как название и див куда будет отображаться результат поиска
    search(text, divResult){
        //присваиваю свойству в классе полученный элемент(див)
        this.searchResult = divResult;
        //При повторном поиске очищаю див от предыдущего результата поиска
        this.searchResult.innerHTML = '';
        //Делаю запрос поиска через searchUrl
        let response = fetch(this.searchUrl + text)
                        .then(response => response.json())
                        .then(response => {
                            log(response.books)
                            //Ответ на запрос Python выходит в виде 98 книг, поэтому отображаю пока только 10
                            //Никита, если нужно поменять колличество, СМЕЛО...
                            for(let i = 0; i < 10; i++){
                                if(this.giveOutBookData.length === 0){
                                    //Каждую книгу создаю при помощи класса Book внося в него его дату
                                    let book = new Book(response.books[i], this);
                                    //свойство book.view хранит див с полным отображением книги, вставляю книгу в див резудьтата поиска
                                    this.searchResult.append(book.view);
                                }else {
                                    //Проверяю есть ли книга у меня в списке выданных
                                    for(let givenBook of this.giveOutBookData){
                                        if(response.books[i].id == givenBook.id){
                                            this.searchResult.append(givenBook.view);
                                        }else {
                                            //Каждую книгу создаю при помощи класса Book внося в него его дату
                                            let book = new Book(response.books[i], this);
                                            //свойство book.view хранит див с полным отображением книги, вставляю книгу в див резудьтата поиска
                                            this.searchResult.append(book.view);
                                        }
                                    }
                                }
                            }
                        });
    }

    showGiveOutBooks(divResult){
        this.giveOutBooksShelf = divResult;
        for(let givenBook of this.giveOutBookData){
                //отображаем книги в дате/списке выданных
                this.giveOutBooksShelf.append(givenBook.view);
        }
    }

    sync(reader){
        //обновляю данные
        // this.pageReaderResult.append(this.divReader);

    }
}


//Работа менюшки
const divsOnClick = document.querySelectorAll('.left-menu div');
const divsTarget = document.querySelectorAll('.result');
//Работа менюшки
divsOnClick.forEach(menuDiv => {
    menuDiv.addEventListener('click', () => {
        const target = menuDiv.dataset.target;
        divsTarget.forEach(div => {
            if(div.id === target){
                div.classList.add('active');
            } else {
                div.classList.remove('active');
            }
        });
    });
});

//Создаю библиотеку по классу Library
const library = new Library();
//Получаю див куда будут заноситься новинки книг через метод library.newBooks(divShelf);
let divtrendyShelf = document.querySelector('.trend-books');
library.newBooks(divtrendyShelf);
//Подключаю поиск на кнопку searchButton через метод из библиотеки library.search(text, divResult)
// И ввожу в этот метод поиска текст из инпута
let inputSearch = document.querySelector('#search-book');
let searchButton = document.querySelector('#search');
let divResult = document.querySelector('.search-result');
searchButton.addEventListener('click', () => {
    let text = inputSearch.value;
    if(text === '') divResult.innerHTML = '';
    else library.search(text, divResult);
});
// Переход в окно регистрации
let registShowButton = document.querySelector('#registr');
let registrDiv = document.querySelector('.registr');
registShowButton.addEventListener('click', () => {
    if (library.reader === null) {
        registrDiv.classList.add('active');
    }
});

// Регистрация
let registrBtn = document.querySelector('#registration');
let regInputs = document.querySelectorAll('.sign-up-input');
let divForReaderResult = document.querySelector('.read-result');
registrBtn.addEventListener('click', () => {
    let data = {};
    regInputs.forEach(input => {
        data[input.name] = input.value;
        input.value = '';
    });
    log(data);
    // Переношу полученную дату и регистрирую нового читателя в библиотеке
    library.newReader(data, divForReaderResult);
    registrDiv.classList.remove('active');
});
//Вход в существующую учетку по айди
let logInBtn = document.querySelector('#enter');
logInBtn.addEventListener('click', () => {
    let id = +prompt('Enter Your Id');
    library.logIn(id);
});
//Показываю книги в списки забранных
let divGiveOutBooks = document.querySelector('#give_out');
library.showGiveOutBooks(divGiveOutBooks);
