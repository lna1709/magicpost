import { Link, useNavigate } from 'react-router-dom'
import './GuestHome.scss'
import { useDispatch } from 'react-redux'
import { falseGuest } from '../../../app/guestSlice'
import Page from './page/Page'

const GuestHome = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const handleManagement = (e) => {
        e.preventDefault();
        dispatch(falseGuest());
        navigate('/management')
    }

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/search')
    }

    return <>
        <div className='guess-home'>
            <Page handleManagement={handleManagement} handleSearch={handleSearch} />
        </div>
    </>

}

export default GuestHome