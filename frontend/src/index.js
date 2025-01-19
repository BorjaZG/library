import axios from 'axios';

window.readBooks = function() {
    axios.get('http://localhost:8080/books')
        .then((response) => {
            const bookList = response.data;
            const bookUl = document.getElementById('books');

            bookList.forEach(book => {
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(book.title));
                bookUl.appendChild(li);
            });
        });
}