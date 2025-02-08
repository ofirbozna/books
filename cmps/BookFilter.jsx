
const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFiltetByToEdit] = useState({ ...filterBy })


    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])


    function onHandleChange(ev) {
        let { value, type, name } = ev.target

        if (type === 'number') value = +value
        setFiltetByToEdit(prevFilteBy => ({ ...prevFilteBy, [name]: value }))
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }
    
    return (
        <section className="book-filter">
            <h1>Filter Books</h1>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="title">Title:</label>
                <input name="title" onChange={onHandleChange} value={filterByToEdit.title} type="text" id="title" />

                <label htmlFor="price">Price limit:</label>
                <input name="listPrice" onChange={onHandleChange} value={filterByToEdit.listPrice || ''} type="number" id="price" />
                <button>Submit</button>
            </form>

        </section>
    )
}