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
        let img = document.createElement('img');
        img.src = this.imageSrc;
        //Вставляю название и описание
        let title = document.createElement('p');
        title.textContent = this.title;
        if(this.readerId === ''){
            this.view.style.border = '3px solid green';    //зеленая рамка- книга доступна
        } else this.view.style.border = '3px solid red';   //красная рамка- недоступна
        //Все вставляю
        this.view.append(img);
        this.view.append(title);

        this.view.addEventListener('click', () => this.bookDetails());
    }

    //Выдать книгу указанному Читателю через Id 
    giveOutBook() {
        
        this.library.readBook(this);
        //Принимаю в метод readerId айди читателя и  устанавливаю его в свойство в книге
        let reader = this.library.reader;
        this.readerId = reader.id;
                // if(book.title === this.title && book.authors === this.authors) continue;
                // else {
                //     this.library.readBook(this);
                // }
    
                //Книга выдается на семь дней от дня когда ее взяли
                // let today = new Date(); // + 7 дней
                // this.returnDate.setDate(today.getDate() + 7);
    
                //Синхронизирую, для того чтобы убрать пометку что она Доступна в диве, ведь ее забрали
                this.sync();
        
    }

    //Возвращение книги
    returnBook() {
        //И ввожу в библиотеке ее в список выданных
        this.library.return(this.title, this.authors);
        //Обнуляю все данные и через синхронизацию пометку Недоступна меняю на Доступно, т.к. книгу Вернули
        this.readerUrl = '';
        this.returnDate = null;
        this.sync();
    }

    sync() {
        //Если в ридерАйди пусто, книга без читателя и Доступна
        if(this.readerId === ''){
               this.view.style.border = '3px solid green';    //зеленая рамка- книга доступна
        } else this.view.style.border = '3px solid red';   //красная рамка- недоступна
    }

    bookDetails(){
        let response =  fetch(this.searchBookByIdUrl + this.id)
                        .then(response => response.json())  //представляю в виде джейсона
                        .then(response => {
                            log(response);
                            this.viewDetailedInformation(response);
                        });

    }

    viewDetailedInformation(data){
        //Создаю основу для развернутой информации
        let baseDiv = document.createElement('div');
        baseDiv.className = 'osnova';
        let bookDiv = document.createElement('div');
        bookDiv.className = 'alert';
        let img = document.createElement('img');
        img.src = this.imageSrc;
        let title = document.createElement('h2');
        title.textContent = this.title;
        //ввожу детальзированную дату в список
        let descriptionList = document.createElement('table');
        for(let i in data){
            let tr = document.createElement('tr')
            if(i === 'description' || i  === 'authors' 
                || i  === 'publisher' || i === 'years'
                || i === 'pages') {
                let titleTd = document.createElement('td');
                titleTd.textContent = i.slice(0,1).toUpperCase() + i.slice(1);
                let propertyTd = document.createElement('td');
                propertyTd.textContent = data[i].slice(0,1).toUpperCase() + data[i].slice(1);
                tr.append(titleTd);
                tr.append(propertyTd);
                descriptionList.append(tr);
            }
        }
        //Создаю кнопку для чтения
        let buttonRead = document.createElement('button');
        buttonRead.id = 'read_book';
        buttonRead.className= 'btn';
        buttonRead.textContent = 'Читать';
        //Событие на кнопку ЧИТАТЬ книгу
        buttonRead.addEventListener('click', (ev) => {
            //Чтобы не удалялся див
            ev.stopPropagation();

            //обозначаю эту книгу выданной
            if(this.library.reader !== null){
                this.giveOutBook(this.library.reader);
                let successMessage = alert("You've added this book to yourself");
            } else {
                let errorMessage = alert('First, LOG IN to your account');
            }
            baseDiv.remove();
        });
        //Создаю кнопку для возврата
        let buttonReturn = document.createElement('button');
        buttonReturn.id = 'return_book';
        buttonReturn.className= 'btn';
        buttonReturn.textContent = 'Вернуть';
        //Событие на кнопку ВЕРНУТЬ книгу
        buttonReturn.addEventListener('click', (ev) => {
            ev.stopPropagation();

            if(this.library.reader !== null){
                this.returnBook();
                this.library.return(this.title, this.authors);
                let successMessage = alert("You gave this book to the library");
            } else {
                let errorMessage = alert('First, LOG IN to your account');
            }
            baseDiv.remove();
        });

        bookDiv.append(title);
        bookDiv.append(img);
        bookDiv.append(descriptionList);
        bookDiv.append(buttonRead);
        bookDiv.append(buttonReturn);

        baseDiv.append(bookDiv);
        document.body.append(baseDiv);

        baseDiv.addEventListener('click', () => {
            baseDiv.remove();
        });
    }


}

