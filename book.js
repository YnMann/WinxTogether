export class Book {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.subtitle = data.subtitle;
        this.authors = data.authors;
        this.imageSrc = data.image;
        this.readerUrl = '';
        this.returnDate = null;
        this.onStock = true;

        //Создаю элемент книги
        this.view = document.createElement('div');
        this.view.id = this.title;
        this.view.className = "trend-book";
        //вставляю картинку
        let img = document.createElement('img');
        img.src = this.imageSrc;
        //Вставляю название и описание
        let title = document.createElement('h2');
        title.textContent = this.title;
        let subtitle = document.createElement('p');
        subtitle.textContent = this.subtitle;
        let onStock = document.createElement('p');
        if (this.onStock) {
            onStock.textContent = "Книга доступна"
        } else onStock.textContent = "Книга не доступна"
        //Все вставляю
        this.view.append(img);
        this.view.append(title);
        this.view.append(subtitle);
        this.view.append(onStock);
    }

    giveOutBook(reader) {
        this.readerUrl = reader;
        this.returnDate = new Date(); // + 7 дней
        this.returnDate.setDate(getDate)
        this.onStock = false;
        this.sync();
    }

    returnBook() {
        this.readerUrl = '';
        this.returnDate = null;
        this.onStock = true;
        this.sync();
    }

    sync() {
        returnMark.textContent = this.onStock;
    }

}

