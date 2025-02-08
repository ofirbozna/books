import { bookService } from "../services/book.service.js";
import { BookList } from '../cmps/BookList.jsx'

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)

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

    return (
        <section>
            <h1>Book list</h1>
            {books && <BookList books={books} />}
        </section>
    )
}