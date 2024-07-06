import { useSelector } from 'react-redux';
import { selectRole } from '../../app/authSlice'

const CEO = ({ children }) => {
    const isCEO = (useSelector(selectRole) === 'CEO');

    return isCEO ? children : <div>Bạn không phải là CEO, không thể truy cập trang này</div>;
}

export default CEO