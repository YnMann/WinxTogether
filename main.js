import {Reader} from "./reader.js";
const log = console.log;

let data = {
    fullName: ''
    , address: ''
    , phoneNum: ''
    , image: ''
};

document.querySelector('.readers').onclick = () => {
    const reader = new Reader(data);
    // console.log(reader);
};