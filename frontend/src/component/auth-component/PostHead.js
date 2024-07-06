import { useSelector } from 'react-redux';
import { selectRole } from '../../app/authSlice'

const PostHead = ({ children }) => {
    const isPostHead = (useSelector(selectRole) === 'POST_HEAD');

    return isPostHead ? children : <div>Bạn không phải là Post Head, không thể truy cập trang này</div>;
}

export default PostHead