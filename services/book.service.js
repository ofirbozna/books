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

function query(filteBY = []) {
    return storageService.query(BOOK_KEY)
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

}

function getEmptyBook(title = '', listPrice = '') {
    return { title, listPrice }
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            _createBook(`It's Just A Dog`, 100),
            _createBook('Unbored', 150),
            _createBook('Holes', 95),
            _createBook('Gwent', 300)
        ]
        saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, listPrice) {
    const book = getEmptyBook(title, listPrice)
    book.id = utilService.makeId()
    return book
}