const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    createCard(title, author, pages, read);
}

function createCard(title, author, pages, read) {
    const content = document.getElementById('content');
    const reference = document.querySelector('div.card.circle');


    const tags = {
        container: document.createElement('div'),
        h2: document.createElement('h2'),
        author: document.createElement('p'),
        authorSpan: document.createElement('span'),
        pages: document.createElement('p'),
        pagesSpan: document.createElement('span'),
        status: document.createElement('p'),
        statusSpan: document.createElement('span'),
        btn: document.createElement('button')
    }

    const txtItem = {
        h2: document.createTextNode(title),
        author: document.createTextNode(author),
        pages: document.createTextNode(pages),
        read: document.createTextNode(read),
        btn: document.createTextNode('Remove'),
        txt1: document.createTextNode('By: '),
        txt2: document.createTextNode('Number of Pages: '),
        txt3: document.createTextNode('Status: ')
    }

    tags.container.setAttribute('class', 'card');

    tags.h2.appendChild(txtItem.h2);
    tags.container.appendChild(tags.h2);

    tags.authorSpan.appendChild(txtItem.author);
    tags.authorSpan.setAttribute('class', 'italics')
    tags.author.appendChild(txtItem.txt1);
    tags.author.appendChild(tags.authorSpan);
    tags.container.appendChild(tags.author);

    tags.pagesSpan.appendChild(txtItem.pages);
    tags.pages.appendChild(txtItem.txt2);
    tags.pages.appendChild(tags.pagesSpan);
    tags.container.appendChild(tags.pages);

    tags.statusSpan.appendChild(txtItem.read);
    tags.status.appendChild(txtItem.txt3);
    tags.status.appendChild(tags.statusSpan);
    tags.container.appendChild(tags.status);

    tags.btn.appendChild(txtItem.btn);
    tags.btn.setAttribute('type', 'button');
    tags.btn.classList.add('btn');
    tags.container.appendChild(tags.btn);

    content.insertBefore(tags.container, reference)

}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, 'Completed');
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 218, 'Completed');
addBookToLibrary('The Catcher in the Rye', 'J.D. Salinger', 277, 'Completed');

//HTML DOM CODEs

const dialog = {
    openBtn: document.querySelectorAll('button[data-model="open-btn"'),
    box: document.querySelector('dialog'),
    closeBtn: document.querySelector('button[data-model="close-btn"]'),
    uploadBtn: document.querySelector('button[data-model="upload-btn"]'),
    close () {
        this.box.close();
    },
    open () {
        this.box.showModal();
    }
}

const newBook = {
    form: document.querySelector('form'),
    title: document.querySelector('#title'),
    author: document.querySelector('#author'),
    pages: document.querySelector('#pages'),
    status: document.querySelector('#status'),
    warn: document.querySelector("output[data-model='warn']")
}

dialog.openBtn.forEach( (btn) => {
    btn.addEventListener('click', ()=> {
        dialog.open();
    });
});

dialog.closeBtn.addEventListener('click',()=> {
    dialog.close();
})

dialog.uploadBtn.addEventListener('click',()=> {
    let title = newBook.title.value;
    let author = newBook.author.value;
    let pages = newBook.pages.value;
    let status = newBook.status.value;
    if( title && author && pages && status ) {
        addBookToLibrary(title, author, pages, status);
        dialog.close();
    } else {
        let warnTxt = !(title) ? 'Title' : 
                !(author) ? 'Author' : 
                !(pages) ? 'Pages' : 'Some of the';

        newBook.warn.innerText = `Please fill, ${warnTxt} field!!!`;
    }
});