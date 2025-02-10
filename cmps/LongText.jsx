
const { useState } = React
export function LongText({ txt, length = 100 }) {

    const [isReadMore, setIsReadMore] = useState(false)

    let isLongTxt = txt.length > length

    const txtToShow = isReadMore ? txt : txt.substring(0, length)

    function onReadMore() {
        console.log('readmore')
        setIsReadMore(isReadMore => !isReadMore)
    }

    return (
        <section className="description">
            <p>{isReadMore ? txtToShow : txtToShow + '...'}</p>
            {isLongTxt &&
                <button className='read-more-btn'onClick={onReadMore}>{isReadMore ? 'read less' : 'read more'}</button>}
        </section>

    )
}


