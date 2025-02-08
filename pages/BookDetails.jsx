import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ onSetSelectedBookId, selectedBookId }) {

    const [book, setBook] = useState(null)


    useEffect(() =>
        getBook()

        , [])

    function getBook() {
        bookService.get(selectedBookId)
            .then(book => setBook(book))

    }

    function setPageCount() {
        let readingLevel = 'Light'
        console.log(book.pageCount)
        if (book.pageCount > 500) readingLevel = 'Serious'
        else if (book.pageCount > 200) readingLevel = 'Descent'
        return readingLevel
    }

    function setPublishYear() {
        const year = new Date().getFullYear()
        let publishYear = book.publishedDate
        let diff = year - publishYear
        if (diff > 10) publishYear += '-vintage'
        else if (diff < 1) publishYear += '-New'
        return publishYear
    }

    function showSale(){
        if (book.listPrice.isOnSale) return 'ON SALE'
    }

    if (!book) return 'Loading...'
    return (
        <section>
            <h1>Title: {book.title}</h1>
            <h1>List Price: {`${book.listPrice.amount} ${book.listPrice.currencyCode}`}</h1>
            <h1>Page Count: {setPageCount()}</h1>
            <h1>Published: {setPublishYear()}</h1>
            <h1 className="sale">{showSale()}</h1>
            <button onClick={() => onSetSelectedBookId(null)}>back</button>
        </section>
    )

}