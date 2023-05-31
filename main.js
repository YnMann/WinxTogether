import { Book } from "./book.js";
import { Reader } from './reader.js'
const log = console.log;

const url = 'https://www.dbooks.org/api/recent';
// fetchData(url);

// async function fetchData(url){
    // let response =  fetch(url).then(response => response.json()).then(response => log(response));
// }


const xhr = new XMLHttpRequest();


xhr.onreadystatechange = (ev) => {
    if(xhr.status === 200){
        if(xhr.readyState ===xhr.DONE){
            let result = JSON.parse(xhr.response);
            log(result);
        }
    }
}

xhr.open('get', url, true);
xhr.send();

class Library {
    #userData = [];
    #giveOutBookData = [];
    constructor(){
        

    }

    newUser(){
        let user = new Reader();
        this.#userData.push(user);
    }

    return(title, authors){
        let book = 
        this.#giveOutBookData.slice

    }


}