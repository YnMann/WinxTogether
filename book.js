export class Book {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.subtitle = data.subtitle;
        this.authors = data.authors;
        this.imageSrc = data.image;
        this.readerId = '';
        this.returnDate = null;
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
        let inStock = document.createElement('p');
        inStock.className = 'in-stock'
        if(this.readerId === ''){
            inStock.textContent = "Доступна";
        } else inStock.textContent = "Недоступна";
        //Все вставляю
        this.view.append(img);
        this.view.append(title);
        this.view.append(inStock);
    }

    //Выдать книгу указанному Читателю через Id 
    giveOutBook(readerId) {
        //Принимаю в метод readerId айди читателя и  устанавливаю его в свойство в книге
        this.readerId = readerId;
        //Книга выдаетс на семь дней от дня когда ее взяли
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

    }

}

