import { bookService } from "../services/book.service.js";
import { BookList } from '../cmps/BookList.jsx'
import {BookDetails} from '../pages/BookDetails.jsx'

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
            .then(books => {
                console.log(books)
                setBooks(books)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(prevBoooks => prevBoooks.filter(book => book.id !== bookId))
    }

    function onSetSelectedBookId(bookId) {
        setSelectedBookId(bookId)
    }

    if (!books) return 'Loading..'
    return (
        <section>
            <h1>Book list</h1>
            {selectedBookId
             ?<BookDetails selectedBookId={selectedBookId} onSetSelectedBookId={onSetSelectedBookId}/>
             : <BookList books={books} onRemoveBook={onRemoveBook} onSetSelectedBookId={onSetSelectedBookId}/>}
        </section>
    )
}