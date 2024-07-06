import { useSelector } from 'react-redux';
import { selectToken } from '../../app/authSlice'
import { Link } from 'react-router-dom';

const NeedLogged = ({ children }) => {
    const isNeedLogged = (useSelector(selectToken) !== '');

    return isNeedLogged ? children : <div>Bạn cần <Link to={'/management/login'}>đăng nhập</Link> để truy cập trang này</div>;
}

export default NeedLogged