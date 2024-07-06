// Home.jsx

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDeliveryId } from '../app/urlSlice';
import './Home.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { selectToken, selectAccount } from '../app/authSlice';
import { trueGuest } from '../app/guestSlice';

const Home = () => {
    const [deliveryId, setDeliveryId] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleView = (e) => {
        if (e.keyCode === 13) {
            navigate(`/management/detail`);
            dispatch(updateDeliveryId({ deliveryId }));
            setDeliveryId('');
        }
    };

    const handleInputChange = (e) => {
        setDeliveryId(e.target.value);
    };

    const token = useSelector(selectToken)
    const account = useSelector(selectAccount)

    const handleBack = (e) => {
        e.preventDefault()
        dispatch(trueGuest())
        navigate('/')
    }

    const isLoggedIn = useSelector(selectToken) !== ''

    return (
        <div className='home'>
            <input
                value={deliveryId}
                className='sidebar-search'
                type='text'
                placeholder='Search by code'
                onKeyDown={(e) => handleView(e)}
                onChange={(e) => handleInputChange(e)}
            />
            <div className='home-banner'>
                <div className='welcome-section'>
                    <h1 className='welcome-title'>Welcome {token && <>
                        , {account.name}
                    </>}</h1>
                    <p className='welcome-content'>Chào mừng bạn đến với hệ thống quản lý vận chuyển.</p>
                </div>
            </div>
            <div className='home-buttons'>
                {!isLoggedIn && <>
                    <Link to='/management/login' className='home-button'>
                        Đăng nhập
                    </Link>
                    <Link to='/' className='home-button'>
                        <button onClick={handleBack} style={{ background: 'transparent', border: 'none' }}>
                            Quay lại trang khách hàng
                        </button>
                    </Link></>}
            </div>
        </div>
    );
};

export default Home;
