const log = console.log;

export class Reader {
    // Данные по умолчанию
    fullName = '';
    address = '';
    listOfBooks = '';
    image = '';
    phoneNum = undefined;
    dateRegist = undefined;

    constructor (data) {
        this.data = data;
        // Проверка на заполняемость
        let check = false;
        for (let i in this.data)
            if (this.data[i] !== '') check = true;

        if (check === false) this.view(false);
        else this.view(true); 

        this.fullName = data.fullName;
        this.address = data.address;    
        this.phoneNum = data.phoneNum;
        this.image = data.image;
        // Создание уникальных id
        this.id = () => {
            let res = '';
            for (let i = 0; i <= 10; i++) 
                res += Math.trunc(Math.random () * (9 - 0)) + 0;

            return res;
        };
    }

    view (flag) {
        // Создаем список данных
        const ulList = document.createElement('ul');

        const dataField = {
            fullname: document.createElement('li') 
            , image: document.createElement('li') 
            , address: document.createElement('li') 
            , phone: document.createElement('li')
            , listOfBooks: document.createElement('li')
            , dataRegist: document.createElement('li')
        };

        for (let i in dataField) 
            ulList.appendChild(dataField[i])
        
        // Проверка на заполнение данных
        const date = new Date();
        const day = date.getDay();
        const month = date.getMonth();
        const year = date.getFullYear();
        const dateRes = `${day} ${month} ${year} year`;

        if (flag === false) {
            const namesRow = [
                'fullname: '
                , ''
                , 'address: '
                , 'phone: '
                , 'listOfBooks: '
                , 'dataRegist: '
            ];

            for (let i = 0; i <= dataField; i++)  
                dataField[i].append(namesRow);
        }
        else {
            const currData = {
                fullname: ''
                , image: ''
                , address: '' 
                , phone: ''
                , listOfBooks: ''
                , dataRegist: ''
            };

            let preOut = [];
            for (let i in namesRow) 
                preOut.push(namesRow[i]);
        }   

        let out = document.querySelector('.vivod');
        out.append(ulList);
    };

    changePhoto () {

    };

    changeAddress () {

    };

    changePhoneNum () {
        
    };

    removeBook () {

    };

    addBook () {

    };

    sync () {

    };
}