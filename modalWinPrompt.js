export let inpValue = '';

export function modalWinPrompt(message, callbackFn) {

    let modalWin = document.createElement("myModal");
    modalWin.className = 'modalWinInp';
    let p = document.createElement('p');
    let inp = document.createElement('input');
    let btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Ввести';

    p.textContent = message;

    p.append(inp);
    p.append(btn);
    modalWin.append(p);


    document.body.prepend(modalWin);

    btn.addEventListener('click', function() {
        let inpValue = inp.value;
        modalWin.remove();
        callbackFn(inpValue);

    })

}
