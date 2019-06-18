// book class
class book { 
    constructor(title, author, isbn){
        this.title = title,
        this.author = author,
        this.isbn = isbn
    }
}

//UI changes

class UI {
    static insertBooks(){
        const storedBooks = [
            {
                title: 'HTML',
                author: 'John Doe',
                isbn: '1234'
            },
            {
                title: 'Java',
                author: 'Traversy',
                isbn: '1454'
            }
        ];
        const book = storedBooks;
        book.forEach((book) => UI.addBookToList(book))
    }

    static showAlert(message, alert) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${alert}`;
        const alertMsg = document.createTextNode(message);
        alertDiv.appendChild(alertMsg);
        const container = document.querySelector('.container');
        const form = document.querySelector('.book-form');
        container.insertBefore(alertDiv, form)

        //remove alert
        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 2500)

    }

    static addBookToList(book){
        var list = document.querySelector('#book-list')
        var row = document.createElement('tr')
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a class="btn btn-sm btn-danger delete" href="#">X</a></td>
        `
        list.appendChild(row)

    }
    static removeBook(el){
        console.log(el.parentElement.parentElement.remove())
    }
    static clearFields(){
        document.querySelector('#title').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#isbn').value = ''
    }
}

// Event: Display books
document.addEventListener('DOMContentLoaded', UI.insertBooks())

//Event: add book to UI
document.querySelector('.book-form').addEventListener('submit', (e) => {
    //prevent defaults
    e.preventDefault();

    //get values from form
    var title = document.querySelector("#title").value;
    var author = document.querySelector("#author").value;
    var isbn = document.querySelector("#isbn").value;

    //validate
    if (title === '' || author === '' || isbn === '' ) {
        UI.showAlert('Please fill all the fields', 'danger')
        
    } else {

        //instantiate book
        var newbook = new book(title, author, isbn);

        //show success message
        UI.showAlert('Book added!', 'success')

        //add to UI
        UI.addBookToList(newbook)

        //clear fields
        UI.clearFields()

    }

})
//Event: remove
     
document.querySelector('#book-list').addEventListener('click', (e) => {
    //show remove msg
    UI.showAlert('Book removed!', 'danger')

    UI.removeBook(e.target)
})
