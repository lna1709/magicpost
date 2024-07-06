import { useSelector } from 'react-redux';
import { selectRole } from '../../app/authSlice'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NotLogged = ({ children }) => {

    const navigate = useNavigate();
    const isLoggedIn = (useSelector(selectRole) !== '');

    return !isLoggedIn ? children : <div>Bạn đăng nhập rồi, hãy trở về <Link to={'/management'}>Trang chủ</Link></div>;
}

export default NotLogged