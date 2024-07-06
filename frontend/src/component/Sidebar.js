import { useEffect, useState } from 'react';
import Logo from '../assets/images/logo.png';
import './Sidebar.scss'
import { Link, useNavigate } from 'react-router-dom';
import { selectRole, logout, selectAccount } from '../app/authSlice';
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { selectIsGuest, trueGuest } from '../app/guestSlice';
import { updateDeliveryId, updateShopId } from '../app/urlSlice';
import { convertText } from '../service/service';

const Sidebar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoggedIn = (useSelector(selectRole) !== '')
    const isCEO = (useSelector(selectRole) === 'CEO')
    const account = useSelector(selectAccount);
    const [shopId, setShopId] = useState()
    const isWHead = account.role === 'WAREHOUSE_HEAD'
    const isPHead = account.role === 'POST_HEAD'
    const isWEmp = account.role === 'EMPLOYEE' && account.workAt.type === 'WAREHOUSE';
    const isPostHead = (useSelector(selectRole) === 'POST_HEAD')
    const isWarehouseHead = (useSelector(selectRole) === 'WAREHOUSE_HEAD')

    const handleViewOffice = () => {
        dispatch(updateShopId({ shopId }))
    }

    useEffect(() => {
        if (isWHead || isPHead) {
            setShopId(account.workAt.shopId)
        }
    }, [account.role])
    const isPEmp = account.role === 'EMPLOYEE' && account.workAt.type === 'POST';

    const goToLogin = () => {
        navigate('/management/login');;
    }

    const goToLogout = () => {
        navigate('/management/');
        dispatch(logout({}))
        toast.success('Đăng xuất thành công')
    }

    const handleToCustomer = (e) => {
        e.preventDefault()
        dispatch(trueGuest())
        navigate('/')
    }

    return <>
        <div className='sidebar'>
            <div className='sidebar-box'>
                <div className='sidebar-1'>
                    <img className='sidebar-logo' src={Logo}></img>
                    <Link to={'/management/'}>
                        <button className='sidebar-statistics sidebar-bottom'>
                            Trang chủ
                        </button>
                    </Link>
                    {!isLoggedIn &&
                        <Link to={'/'}>
                            <button className='sidebar-statistics sidebar-bottom' onClick={handleToCustomer}>
                                Quay trở lại trang của khách
                            </button>
                        </Link>}
                    {isCEO && <>
                        <Link to={'/management/offices'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Thống kê các văn phòng
                            </button>
                        </Link>
                        <Link to={'/management/create-account'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Tạo tài khoản cho trưởng điểm
                            </button>
                        </Link>
                        <Link to={'/management/accounts'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Quản lý tài khoản trưởng điểm
                            </button>
                        </Link>
                        <Link to={'/management/deliveries'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Quản lý các đơn hàng
                            </button>
                        </Link>
                    </>}
                    {isPEmp && <>
                        <Link to={'/management/te-create-shipment'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Tạo đơn vận mới cho khách
                            </button>
                        </Link>
                        <Link to={'/management/te-receive'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Quản lý đơn hàng đã nhận từ khách
                            </button>
                        </Link>
                        <Link to={'/management/te-coming'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Quản lý đơn hàng đang được chuyển đến
                            </button>
                        </Link>
                        <Link to={'/management/te-inshop'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Quản lý đơn hàng đã được nhận bởi văn phòng
                            </button>
                        </Link>
                        <Link to={'/management/te-shipping'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Quản lý đơn hàng đang giao cho khách
                            </button>
                        </Link>
                        <Link to={'/management/te-after'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Quản lý đơn hàng đã giao cho khách
                            </button>
                        </Link>
                        <Link to={'/management/te-all-print'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Xem lại các đơn đã nhận từ khách
                            </button>
                        </Link></>
                    }
                    {isWEmp && <>
                        <Link to={'/management/te-coming'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Quản lý đơn hàng đang được chuyển đến
                            </button>
                        </Link>
                        <Link to={'/management/te-inshop'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Quản lý đơn hàng đã được nhận bởi văn phòng
                            </button>
                        </Link></>
                    }
                    {isPostHead && <>
                        <Link to={'/management/ph-create-account'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Tạo tài khoản nhân viên
                            </button>
                        </Link>
                        <Link to={'/management/ph-accounts'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Quản lý tài khoản nhân viên
                            </button>
                        </Link>
                        <Link to={'/management/ph-deliveries'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Quản lý đơn tại văn phòng
                            </button>
                        </Link>
                    </>}
                    {isWarehouseHead && <>
                        <Link to={'/management/wh-create-account'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Tạo tài khoản nhân viên
                            </button>
                        </Link>
                        <Link to={'/management/wh-accounts'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Quản lý tài khoản nhân viên
                            </button>
                        </Link>
                        <Link to={'/management/wh-deliveries'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Quản lý đơn tại văn phòng
                            </button>
                        </Link>
                    </>}
                </div>
                <div className='sidebar-2'>
                    <div className='sidebar-account-box sidebar-top'>
                        {isLoggedIn ? <div>
                            <button className='sidebar-account sidebar-view-account'>{account !== undefined ? account.name : 'Tài khoản'} &nbsp;<FontAwesomeIcon icon={faChevronRight} />
                                <div className='sidebar-account-dropdown'>
                                    <button className='sidebar-account sidebar-account-dropdown-item' style={{ fontSize: '20px' }}><b>{convertText(account.role)}</b></button>
                                    <button className='sidebar-account sidebar-account-dropdown-item'><Link to={'/management/account'}>Tài khoản</Link></button>
                                    {isWHead && <button className='sidebar-account sidebar-account-dropdown-item' onClick={handleViewOffice}><Link to={`/management/wh-detail-office`}>Xem thông tin văn phòng</Link></button>}
                                    {isPHead && <button className='sidebar-account sidebar-account-dropdown-item' onClick={handleViewOffice}><Link to={`/management/ph-detail-office`}>Xem thông tin văn phòng</Link></button>}
                                    <button className='sidebar-account sidebar-account-dropdown-item' onClick={() => goToLogout()}>Đăng xuất</button>
                                </div>
                            </button>
                        </div>
                            : <div>
                                <button className='sidebar-account' onClick={() => goToLogin()}>Đăng nhập</button>
                            </div>}
                    </div>
                </div>
            </div>
        </div >
    </>
}

export default Sidebar