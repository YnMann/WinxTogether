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
        this.tdAvatar = document.createElement('img');
        this.tdAvatar.src = this.avatarUrl;
        let newAvatarBtn = document.createElement('button');
        newAvatarBtn.id = 'new_photo';
        newAvatarBtn.className = 'btn';
        newAvatarBtn.textContent = 'New Photo';
        //Навешиваю установку нового фото на кнопку
        newAvatarBtn.addEventListener('click', () => {
            this.changePhoto();
        })
        avatarDiv.append(this.tdAvatar);
        avatarDiv.append(newAvatarBtn);
        // Name & id
        let header = document.createElement('div');
        header.className = 'basicInfo'
        let fullName = document.createElement('h2');
        fullName.textContent = 'Hello ' + this.fullName;
        let id = document.createElement('p');
        id.textContent = 'Your ID #' + this.id;
        let logOutBtn = document.createElement('button');
        logOutBtn.id = 'log_out';
        logOutBtn.className = 'btn';
        logOutBtn.textContent = 'Log Out';
        //Навешиваю выход из учетки на кнопку
        logOutBtn.addEventListener('click', () => {
            this.library.logOut();
        })
        header.append(fullName);
        header.append(id);
        header.append(logOutBtn);
        
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
        this.tdPhone = document.createElement('td');
        this.tdPhone.textContent = this.phoneNum;
        let tdNewPhone = document.createElement('td');
        let newPhoneBtn = document.createElement('button');
        newPhoneBtn.id = 'new_phone';
        newPhoneBtn.className = 'btn';
        newPhoneBtn.textContent = 'New phone number';
        //Навешиваю установку нового номера телефона на кнопку
        newPhoneBtn.addEventListener('click', () => {
            this.changePhoneNum();
        })
        tdNewPhone.append(newPhoneBtn);

        trPhoneNum.append(tdPhoneName);        
        trPhoneNum.append(this.tdPhone);        
        trPhoneNum.append(tdNewPhone);        
        table.append(trPhoneNum);
        //cтрока в таблице с адрессом(название, значение, кнопка для нового)
        let trAddres = document.createElement('tr');
        let tdAddresName = document.createElement('td');
        tdAddresName.textContent = 'Addres';
        this.tdAddres = document.createElement('td');
        this.tdAddres.textContent = this.addres;
        let tdNewAddres = document.createElement('td');
        let newAddresBtn = document.createElement('button');
        newAddresBtn.id = 'new_addres';
        newAddresBtn.className = 'btn';
        newAddresBtn.textContent = 'New Addres';
        //Навешиваю установку адреса на кнопку
        newAddresBtn.addEventListener('click', () => {
            this.changeAddress();
        })
        tdNewAddres.append(newAddresBtn);

        trAddres.append(tdAddresName);        
        trAddres.append(this.tdAddres);        
        trAddres.append(tdNewAddres);        
        table.append(trAddres);
        //строка для книг в списке прочитанных
        let trListOfReaderBooks = document.createElement('tr');
        this.tdListOfBooks = document.createElement('td');
        this.tdListOfBooks.colSpan = '3';
        if(this.listOfBooks.length === 0){
            let hTwo = document.createElement('h2');
            hTwo.textContent = 'There are no books in the list';
            this.tdListOfBooks.append(hTwo);
        } else {
            for(let book of this.listOfBooks){
                this.tdListOfBooks.append(book.view);
            }
        }
        trListOfReaderBooks.append(this.tdListOfBooks);
        table.append(trListOfReaderBooks);

        this.view.append(header);
        this.view.append(avatarDiv);
        this.view.append(table);

        return this.view;
    };

    //Меняю фото url
    changePhoto() {
        let url = prompt('Enter the address of the photo: ');
        if(url !== ''){
            this.avatarUrl = url;
            this.sync();
        }
    };

    //Меняю адресс
    changeAddress() {
        let addres = prompt('Enter your address: ');
        if(addres !== ''){
            this.address = addres;
            this.sync();
        }
    };

    //Меняю номер телефона
    changePhoneNum() {
        let phoneNumber = prompt('Enter your Phone number: ');
        if(phoneNumber !== ''){
            this.phoneNum = phoneNumber;
            this.sync();
        }
    };

    //Метод для добавления книг в список
    showReaderBooks(){
        if(this.listOfBooks.length === 0){
            let hTwo = document.createElement('h2');
            hTwo.textContent = 'There are no books in the list';
            this.tdListOfBooks.append(hTwo);
        } else {
            for(let book of this.listOfBooks){
                this.tdListOfBooks.append(book.view);
            }
        }
    }

    //Удаляю книгу из списка
    removeBook (book) {
        for(let i in this.listOfBooks){
            if(this.listOfBooks[i].title === book.title && this.listOfBooks[i].authors === book.authors){
                this.listOfBooks.slice(i, 1);
            }
        }
    };

    //Добавляю книгу в свой список
    addBook(book) {
        this.listOfBooks.push(book);
        log(this.listOfBooks);
        log('reader ' + this.listOfBooks);
    };

    sync(){
        //update this.view elements properties
        this.tdAvatar.src = this.avatarUrl;
        this.tdPhone.textContent = this.phoneNum;
        this.tdAddres.textContent = this.addres;
        //обновляю данные в дате библиотеки
        this.library.sync(this);
    };
}