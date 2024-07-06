import axios from 'axios';
import './GuestSearch.scss';
import { useState } from 'react';
import { beautifyId, convertText } from '../../../service/service';
import { useNavigate } from 'react-router-dom';

const GuestSearch = () => {
    const [deliveryId, setDeliveryId] = useState();
    const [delivery, setDelivery] = useState();
    const [deliveryStatuses, setDeliveryStatuses] = useState();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        const config1 = {
            params: {
                deliveryId,
                directionSort: 'DESC',
            },
        };

        try {
            const response1 = await axios.get(`${backendUrl}/deliveries/${deliveryId}`);
            setDelivery(response1.data);
            const response2 = await axios.get(`${backendUrl}/deliveries/${deliveryId}/deliveryStatuses`, config1);
            setDeliveryStatuses(response2.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitByButton = async (e) => {
        e.preventDefault();
        await handleSubmit();
    };

    const getStatusTitle = (statusDetail) => {
        switch (statusDetail.statusType) {
            case 'RECEIVED_FROM_CUSTOMER':
            case 'RECEIVED_FROM_SHOP':
            case 'COMING_TO_SHOP':
                return `${convertText(statusDetail.statusType)}` + ` ${convertText(statusDetail.shop.type)} ${statusDetail.shop.commune.name}`;

            case 'GONE_FROM_SHOP':
                return `${convertText(statusDetail.statusType)}` + ` ${convertText(statusDetail.shop.type)} ${statusDetail.shop.commune.name}`;

            case 'SENT_TO_CUSTOMER_SUCCESS':
            case 'SENT_TO_CUSTOMER_FAIL':
            case 'SHIPPING_TO_CUSTOMER':
                return `${convertText(statusDetail.statusType)}`

            default:
                return '';
        }
    };

    const handleBackToHome = (e) => {
        e.preventDefault();
        navigate('/')
    }

    return (
        <>
            <button className="guest-back-button" onClick={handleBackToHome}>
                Back to Home
            </button>
            <div className='guest-search'>
                <h2 className='guest-heading'>Tìm kiếm đơn vận qua ID:</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        onChange={(e) => setDeliveryId(e.target.value)}
                        className='guest-search-input'
                        placeholder='Nhập ID đơn hàng...'
                    />
                </form>
                <button onClick={handleSubmitByButton} className='guest-search-button'>
                    Tìm kiếm
                </button>
                {delivery && (
                    <div className='guest-delivery-info'>
                        <div className='guest-info-item'>
                            <span className='guest-label'>ID Đơn:</span>
                            <span className='guest-value'>{beautifyId(delivery.deliveryId)}</span>
                        </div>
                        <div className='guest-info-item'>
                            <span className='guest-label'>Người gửi:</span>
                            <span className='guest-value'>{delivery.fromName}</span>
                        </div>
                        <div className='guest-info-item'>
                            <span className='guest-label'>Số điện thoại người gửi:</span>
                            <span className='guest-value'>{delivery.fromPhone}</span>
                        </div>
                        <div className='guest-info-item'>
                            <span className='guest-label'>Địa chỉ người gửi:</span>
                            <span className='guest-value'>{delivery.fromAddress}</span>
                        </div>
                        <div className='guest-info-item'>
                            <span className='guest-label'>Người nhận:</span>
                            <span className='guest-value'>{delivery.toName}</span>
                        </div>
                        <div className='guest-info-item'>
                            <span className='guest-label'>Số điện thoại người nhận:</span>
                            <span className='guest-value'>{delivery.toPhone}</span>
                        </div>
                        <div className='guest-info-item'>
                            <span className='guest-label'>Địa chỉ người nhận:</span>
                            <span className='guest-value'>{delivery.toAddress}</span>
                        </div>
                        <div className='guest-info-item'>
                            <span className='guest-label'>Phí giao hàng:</span>
                            <span className='guest-value'>{delivery.shippingFee}</span>
                        </div>
                        <div className='guest-info-item'>
                            <span className='guest-label'>Cân nặng đơn:</span>
                            <span className='guest-value'>{delivery.weight}</span>
                        </div>
                        <div className='guest-info-item'>
                            <span className='guest-label'>Đơn được tạo từ:</span>
                            <span className='guest-value'>{delivery.createdAt}</span>
                        </div>
                    </div>
                )}
                {deliveryStatuses && (
                    <div className='guest-delivery-statuses'>
                        <h3 className='guest-subheading'>Lịch sử trạng thái giao hàng:</h3>
                        {deliveryStatuses.deliveryStatusDetailHistory.map((statusDetail) => (
                            <div
                                key={statusDetail.deliveryStatusId}
                                className='guest-status-item'
                            >
                                <div className='guest-status-info'>
                                    <span className='guest-label'>Ngày cập nhật:</span>
                                    <span className='guest-value'>{statusDetail.createdAt}</span>
                                </div>
                                <div className='guest-status-info'>
                                    <span className='guest-label'>Loại trạng thái:</span>
                                    <span className='guest-value'>{getStatusTitle(statusDetail)}</span>
                                </div>
                                {/* ... (các thông tin khác) */}
                            </div>
                        ))}
                    </div>
                )}
            </div></>
    );
};

export default GuestSearch