export function modalWin(message) {

    let modalWin = document.createElement("myModal");
    modalWin.className = 'modalWin';
    let p = document.createElement('p');

    p.textContent = message;

    modalWin.append(p);

    document.body.prepend(modalWin);

    modalWin.addEventListener('click', () =>{
        modalWin.remove();
    })
}

