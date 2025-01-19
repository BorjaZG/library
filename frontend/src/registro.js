import axios from 'axios';

window.addBook = function() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('description').value;
    const year = document.getElementById('year').value;

    axios.post('http://localhost:8080/books', {
        title: title,
        author: author,
        description: description,
        year: year
    });
};