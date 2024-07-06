import { useSelector } from 'react-redux';
import { selectRole } from '../../app/authSlice'

const WarehouseHead = ({ children }) => {
    const isWarehouseHead = (useSelector(selectRole) === 'WAREHOUSE_HEAD');

    return isWarehouseHead ? children : <div>Bạn không phải là Warehouse Head, không thể truy cập trang này</div>;
}

export default WarehouseHead