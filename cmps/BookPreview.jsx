

export function BookPreview({ book }) {
    
    return (
        <section className="book-preview">
            <h4>{book.title}</h4>
            <h4>{book.listPrice}</h4>
        </section>
    )
} 