

export function BookPreview({ book }) {

    return (
        <section className="book-preview">
            <h4>{book.title}</h4>
            <h4>{`${book.listPrice.amount} ${book.listPrice.currencyCode}`}</h4>
        </section>
    )
} 