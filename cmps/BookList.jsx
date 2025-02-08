import { BookPreview } from "../cmps/BookPreview.jsx"

export function BookList({ books, onRemoveBook, onSetSelectedBookId }) {

    return (
        <section>
            <ul className='book-list'>
                {books.map(book =>
                    <li key={book.id}>
                        <BookPreview book={book}/>
                        <section>
                            <button onClick={()=>onRemoveBook(book.id)}>Delete</button>
                            <button onClick={()=> onSetSelectedBookId(book.id)}>Details</button>
                        </section>

                    </li>
                )}
            </ul>
        </section>
    )
}