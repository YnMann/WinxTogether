const log = console.log;

export class Book {
    constructor(data, library) {
        this.library = library;
        this.id = data.id;
        this.title = data.title;
        this.subtitle = data.subtitle;
        this.authors = data.authors;
        this.imageSrc = data.image;
        this.readerId = '';
        this.returnDate = null;
        this.searchBookByIdUrl = 'https://www.dbooks.org/api/book/';  //Url для поиска, нужный для метода readBook
        //Создаю элемент книги
        this.view = document.createElement('div');
        this.view.id = this.id;
        this.view.className = "trend-book";
        //вставляю картинку
        this.imgElement = document.createElement('img');
        this.imgElement.src = this.imageSrc;
        //Вставляю название и описание
        this.titleElement = document.createElement('p');
        this.titleElement.textContent = this.title;
        if(this.readerId === ''){
            this.view.style.border = '2px solid green';    //зеленая рамка- книга доступна
        } else this.view.style.border = '2px solid red';   //красная рамка- недоступна
        //Все вставляю
        this.view.append(this.imgElement);
        this.view.append(this.titleElement );

        this.view.addEventListener('click', () => this.bookDetails());
    }

    //Выдать книгу указанному Читателю через Id 
    giveOutBook(readerId) {
        //Принимаю в метод readerId айди читателя и  устанавливаю его в свойство в книге
        this.readerId = readerId;
        //Книга выдается на семь дней от дня когда ее взяли
        let today = new Date(); // + 7 дней
        this.returnDate.setDate(today.getDate() + 7);
        //Синхронизирую, для того чтобы убрать пометку что она Доступна в диве, ведь ее забрали
        this.sync();
    }

    //Возвращение книги
    returnBook() {
        //Обнуляю все данные и через синхронизацию пометку Недоступна меняю на Доступно, т.к. книгу Вернули
        this.readerUrl = '';
        this.returnDate = null;
        this.sync();
    }

    sync() {
        //Если в ридерАйди пусто, книга без читателя и Доступна
        if(this.readerId === ''){
            inStock.textContent = "Доступна";
        } else inStock.textContent = "Недоступна"; //Если есть свойство указывающее на читателя, то книга Недоступна
    }

    bookDetails(){
        let response =  fetch(this.searchBookByIdUrl + this.id)
                        .then(response => response.json())  //представляю в виде джейсона
                        .then(response => {
                            log(response);
                            this.viewDetailedInformation(response);
                            // let givenBook = new Book(response, library);
                            // //Помечаю книгу как выданную
                            // givenBook.giveOutBook(this.reader.id);
                            // //добавляю книгу читателю
                            // // передаю ее чтобы потом можно было отображать в списке читателя)
                            // this.reader.addBook(givenBook);
                            // //Пушу книгу в дату со списком недоступных книг
                            // this.#giveOutBookData.push(givenBook);
                        });

    }

    viewDetailedInformation(data){
        //Создаю основу для развернутой информации
        let baseDiv = document.createElement('div');
        baseDiv.className = 'osnova';
        let alert = document.createElement('div');
        alert.className = 'alert';
        //ввожу детальзированную дату в список
        let descriptionList = document.createElement('table');
        for(let i in data){
            if(data[i] === this.title || data[i]  === this.id || data[i]  === this.url) continue;
            else {
                let li = document.createElement('li');
                li.textContent = data[i] ;
                descriptionList.append(li);
            }
        }
        //Создаю кнопку для читения
        let buttonRead = document.createElement('button');
        buttonRead.id = 'read_book';
        buttonRead.textContent = 'Читать';
        //Создаю кнопку для возврата
        let buttonReturn = document.createElement('button');
        buttonReturn.id = 'return_book';
        buttonReturn.textContent = 'Вернуть';

        alert.append(this.imgElement);
        alert.append(descriptionList);
        alert.append(buttonRead);
        alert.append(buttonReturn);

        baseDiv.append(alert);
        document.body.append(baseDiv);
    }


}

