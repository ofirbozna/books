
export function AppHeader({onSetPage}){
    return (
        <header className="app-header">
            <section className="flex justify-between align-center">
                <h1>Miss Books</h1>
                <nav className="nav flex">
                    <a  onClick={()=>onSetPage('home')} href="#">Home</a>
                    <a onClick={()=>onSetPage('about')} href="#">About</a>
                    <a onClick={()=>onSetPage('books')} href="#">Books</a>
                </nav>
            </section>
        </header>
    )
}