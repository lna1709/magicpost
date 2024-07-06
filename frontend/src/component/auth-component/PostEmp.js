import { useSelector } from 'react-redux';
import { selectAccount } from '../../app/authSlice'

const PostEmp = ({ children }) => {
    const account = useSelector(selectAccount);
    const isPEmp = account.role === 'EMPLOYEE' && account.workAt.type === 'POST';

    return isPEmp ? children : <div>Bạn không phải là Nhân viên điểm giao dịch, không thể truy cập trang này</div>;
}

export default PostEmp