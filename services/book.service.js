import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"
import { saveToStorage, loadFromStorage } from "./storage.service.js"


const BOOK_KEY = 'books'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getEmptyBook
}

function query(filterBy = {}) {
    console.log(filterBy)
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.listPrice) {
                books = books.filter(book => book.listPrice.amount <= filterBy.listPrice)
            }
            if (filterBy.publishedDate) {
                books = books.filter(book => book.publishedDate >= filterBy.publishedDate)
            }

            if (filterBy.category) {
                books = books.filter(book => book.categories.includes(filterBy.category))
            }
            return books
        })

}


function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}


function getDefaultFilter() {
    return { title: '', listPrice: '' }

}

function getEmptyBook(title = '', listPrice = '') {
    return { title, listPrice }
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [utilService.makeLorem(1)],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(20),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `http://www.coding-academy.org/books-photos/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR", isOnSale: Math.random() > 0.7
                }
            }
            books.push(book)
        }

        saveToStorage(BOOK_KEY, books)
        console.log('books', books)
    }
}

// function _createBooks() {
//     let books = loadFromStorage(BOOK_KEY)
//     if (!books || !books.length) {
//         books = [
//             _createBook(`It's Just A Dog`, 100),
//             _createBook('Unbored', 150),
//             _createBook('Holes', 95),
//             _createBook('Gwent', 300)
//         ]
//         saveToStorage(BOOK_KEY, books)
//     }
// }

// function _createBook(title, listPrice) {
//     const book = getEmptyBook(title, listPrice)
//     book.id = utilService.makeId()
//     return book
// }