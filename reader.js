const log = console.log;

export class Reader {

    constructor (data, library) {
        this.library = library;                            //нужна для соединения данных библиотеки и читателя
        this.id = library.userData.length;                           //Будет заполнятся в зависимости от базы библиотеки
        this.fullName = data.fullName;     //
        this.addres = data.addres;    
        this.phoneNum = data.phoneNum;
        this.avatarUrl = data.image;
        this.dateRegist = new Date();                  //дата регистрации
        this.listOfBooks = [];

        this.readerDetailedInformation();
    }

    readerDetailedInformation() {
        //Элемент, представляющий читателя в DOM
        this.view = document.createElement('div');
        this.view.id = this.id;
        this.view.className = 'reader';
        //фото
        let avatarDiv = document.createElement('div');
        avatarDiv.className = 'avatar';
        let avatar = document.createElement('img');
        avatar.src = this.avatarUrl;
        let newAvatarBtn = document.createElement('button');
        newAvatarBtn.id = 'new_photo';
        newAvatarBtn.className = 'btn';
        newAvatarBtn.textContent = 'New Photo';
        avatarDiv.append(avatar);
        avatarDiv.append(newAvatarBtn);
        // Name & id
        let header = document.createElement('div');
        header.className = 'basicInfo'
        let fullName = document.createElement('h2');
        fullName.textContent = 'Hello ' + this.fullName;
        let id = document.createElement('p');
        id.textContent = 'Your ID #' + this.id;
        header.append(fullName);
        header.append(id);
        
        //таблица с подробностями
        let table = document.createElement('table');
        //строка даты регистрации
        let trDateRegist = document.createElement('tr');
        let tdDateRegistName = document.createElement('td');
        tdDateRegistName.textContent = 'Incorporation date';
        let tdDateRegist = document.createElement('td');
        tdDateRegist.colSpan = '2';
        tdDateRegist.textContent = this.dateRegist;

        trDateRegist.append(tdDateRegistName);
        trDateRegist.append(tdDateRegist);
        table.append(trDateRegist);
        //строка в таблице с номером
        let trPhoneNum = document.createElement('tr');
        let tdPhoneName = document.createElement('td');
        tdPhoneName.textContent = 'Phone number';
        let tdPhone = document.createElement('td');
        tdPhone.textContent = this.phoneNum;
        let tdNewPhone = document.createElement('td');
        let newPhoneBtn = document.createElement('button');
        newPhoneBtn.id = 'new_phone';
        newPhoneBtn.className = 'btn';
        newPhoneBtn.textContent = 'New phone number';
        tdNewPhone.append(newPhoneBtn);

        trPhoneNum.append(tdPhoneName);        
        trPhoneNum.append(tdPhone);        
        trPhoneNum.append(tdNewPhone);        
        table.append(trPhoneNum);
        //cтрока в таблице с адрессом(название, значение, кнопка для нового)
        let trAddres = document.createElement('tr');
        let tdAddresName = document.createElement('td');
        tdAddresName.textContent = 'Addres';
        let tdAddres = document.createElement('td');
        tdAddres.textContent = this.addres;
        let tdNewAddres = document.createElement('td');
        let newAddresBtn = document.createElement('button');
        newAddresBtn.id = 'new_addres';
        newAddresBtn.className = 'btn';
        newAddresBtn.textContent = 'New Addres';
        tdNewAddres.append(newAddresBtn);

        trAddres.append(tdAddresName);        
        trAddres.append(tdAddres);        
        trAddres.append(tdNewAddres);        
        table.append(trAddres);
        //строка для книг в списке прочитанных
        let trListOfReaderBooks = document.createElement('tr');
        let tdListOfBooks = document.createElement('td');
        tdListOfBooks.colSpan = '3';
        if(this.listOfBooks.length === 0){
            let hTwo = document.createElement('h2');
            hTwo.textContent = 'There are no books in the list';
            tdListOfBooks.append(hTwo);
        } else {
            for(let book of this.listOfBooks){
                tdListOfBooks.append(book.view);
            }
        }
        trListOfReaderBooks.append(tdListOfBooks);
        table.append(trListOfReaderBooks);

        this.view.append(header);
        this.view.append(avatarDiv);
        this.view.append(table);

        return this.view;
    };

    //Меняю фото url
    changePhoto (url) {
        this.avatarUrl = url;
    };

    //Меняю адресс
    changeAddress (address) {
        this.address = address;
    };

    //Меняю номер телефона
    changePhoneNum (phoneNumber) {
        this.phoneNum = phoneNumber;
    };

    //Удаляю книгу из списка
    removeBook (book) {
        for(let readerBook of this.listOfBooks){
            if(readerBook == book){
                let index = this.listOfBooks.indexOf(book);
                this.listOfBooks.slice(index, 1);
            }
        }
    };

    //Добавляю книгу в свой список
    addBook(book) {
        this.listOfBooks.push(book);
    };

    sync () {

    };
}