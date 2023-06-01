export class Form {
    constructor () {
        this.data = [];
        
        this.confirm = document.createElement('button');

        this.module = document.createElement('div');
        this.module_control = document.createElement('div');

        // Закрытия окна...
        this.closeWindow = document.createElement('button');

        this.closeWindow.onclick = () => this.modalHide();
    }
 
    modalHide() {
        let deleteElement = document.querySelectorAll('.modal');
        
        for (let i = 0; i < deleteElement.length; i++) {
            deleteElement[i].remove();
        }
    }

    show () {
        // Создаем список данных
        const fullNameInp = document.createElement('input')
            , imageInp = document.createElement('input')
            , addressInp = document.createElement('input')
            , phoneInp = document.createElement('input')
            , addNewUser = document.createElement('button')

        addNewUser.textContent = 'Добавить нового пользователя';
        addNewUser.classList.add('addNewUser');

        fullname.placeholder = 'ФИО';
        image.placeholder = 'Вставьте картинку';
        address.placeholder = 'Адрес';
        phone.placeholder = 'Телефонный номер';

        this.module_control.append(fullNameInp);
        this.module_control.append(imageInp);
        this.module_control.append(addressInp);
        this.module_control.append(phoneInp);
            
        this.module.classList.add('modal');
        this.module.style.display = 'block';
        this.module_control.classList.add('module-control');

        // Обработчик для ввода во второй input, только цифр
        phoneInp.addEventListener('input', (ev) => {
            ev.target.value = ev.target.value.replace(/[^0-9]/gi, '');
        });

        this.confirm.classList.add('confirm');
        this.confirm.innerHTML = 'Заполнить';

        this.closeWindow.classList.add('close');
        this.closeWindow.innerHTML = 'Закрыть';

        this.module.append(this.module_control);
        document.body.append(this.module);
    }
}