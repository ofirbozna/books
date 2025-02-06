import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React
export function BookIndex() {

    const [books, setBooks] = useState(null)

    function loadBooks() {
        bookService.query()
            .then(books => {
                console.log(books)
                setBooks(books)
            })

    }

    useEffect(() => {
        loadBooks()
    }, [])

    return (
        <section>
            <h1>Book list</h1>
        </section>
    )
}