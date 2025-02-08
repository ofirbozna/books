import { bookService } from "../services/book.service.js";
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from '../pages/BookDetails.jsx'
import { BookFilter } from "../cmps/BookFilter.jsx";

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
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


    function onSetFilterBy(filterBy) {
        setFilterBy({...filterBy})
    }

    if (!books) return 'Loading..'
    return (
        <section>
            <h1>Book list</h1>
            {selectedBookId
                ? <BookDetails selectedBookId={selectedBookId} onSetSelectedBookId={onSetSelectedBookId} />
                : <React.Fragment>
                    <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy}/>
                    <BookList books={books} onRemoveBook={onRemoveBook} onSetSelectedBookId={onSetSelectedBookId} />
                </React.Fragment>}
        </section>
    )
}