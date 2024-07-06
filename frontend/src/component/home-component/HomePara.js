import './HomePara.scss'

const HomePara = (props) => {

    const { title, content, list } = props

    return <>
        <div className='homepara'>
            <h1 className='homepara-title'>{title}</h1>
            <p className='homepara-content'>{content}</p>
            <ul className='homepara-list'>
                {list.map(item => {
                    return <li className='homepara-list-item'>{item}</li>
                })}
            </ul>
        </div>
    </>
}

export default HomePara