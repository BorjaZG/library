import axios from 'axios';

window.readBooks = function() {
    axios.get('http://localhost:8080/books')
        .then((response) => {
            const bookList = response.data;
            const bookUl = document.getElementById('books');

            bookList.forEach(book => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.appendChild(document.createTextNode(book.title + ' (' + book.year + ') ' + book.description));
                bookUl.appendChild(li);
            });
        });
}