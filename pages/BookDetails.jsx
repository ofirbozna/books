import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ onSetSelectedBookId, selectedBookId }) {

const [book ,setBook] = useState(null)


useEffect(()=>
    getBook()
)
    function getBook() {
        bookService.get(selectedBookId)
            .then(book => setBook(book))

    }

    if(!book) return 'Loading...'
    return (
        <section>
            <h1>Title: {book.title}</h1>
            <h1>List Price: {book.listPrice}</h1>
            <button onClick={() => onSetSelectedBookId(null)}>back</button>
        </section>
    )

}