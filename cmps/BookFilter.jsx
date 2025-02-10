
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

                <label htmlFor="published">Publish year</label>
                <input name='publishedDate' type="number" onChange={onHandleChange} value={filterByToEdit.publishedDate|| ''} id="publishedDate"/>

                <label htmlFor="category">Category</label>
                <select name="category" id="category" onChange={onHandleChange}>
                    <option value="">choose category</option>
                    <option value="Love">Love</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Poetry">Poetry</option>
                    <option value="Computers">Computers</option>
                    <option value="Religion">Religion</option>
                </select>
                <button>Submit</button>


            </form>

        </section>
    )
}