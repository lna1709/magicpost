import './DeliveryDetail.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { beautifyId, convertText } from '../../../service/service';
import { useDispatch, useSelector } from 'react-redux';
import { selectDeliveryId, updateShopId } from '../../../app/urlSlice';

const DeliveryDetail = () => {

    const deliveryId = useSelector(selectDeliveryId)

    const [delivery, setDelivery] = useState()

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                params: {
                    deliveryId
                }
            }

            const response = await axios.get(`${backendUrl}/deliveries/${deliveryId}`, config);
            setDelivery(response.data)
        }
        fetchData()
    }, [])

    const dispatch = useDispatch()

    const handleViewShop = (shopId) => {
        dispatch(updateShopId({ shopId }))
    }

    return <>
        <div className='delivery-detail'>
            {delivery ? (
                <>
                    <h1>Thông tin đơn hàng</h1>

                    <div className='basic-info'>
                        <b className='info-title'>Thông tin cơ bản:</b>
                        <div className='info-row'>
                            <div className='info-label'>ID</div>
                            <div className='info-value'>{beautifyId(delivery.deliveryId)}</div>
                        </div>
                        <div className='info-row'>
                            <div className='info-label'>Tên đơn hàng</div>
                            <div className='info-value'>{delivery.name}</div>
                        </div>
                        <div className='info-row'>
                            <div className='info-label'>Mô tả</div>
                            <div className='info-value'>{delivery.description}</div>
                        </div>
                        <div className='info-row'>
                            <div className='info-label'>Cân nặng - Chi phí</div>
                            <div className='info-value'>{delivery.weight}kg/{delivery.shippingFee}VND</div>
                        </div>
                    </div>

                    <div className='sender-info'>
                        <b className='info-title'>Thông tin phía gửi:</b>
                        <div className='info-row'>
                            <div className='info-label'>Người gửi</div>
                            <div className='info-value'>{delivery.fromName}</div>
                        </div>
                        <div className='info-row'>
                            <div className='info-label'>Số điện thoại người gửi</div>
                            <div className='info-value'>{delivery.fromPhone}</div>
                        </div>
                        <div className='info-row'>
                            <div className='info-label'>Địa chỉ người gửi</div>
                            <div className='info-value'>{delivery.fromAddress}</div>
                        </div>
                        <div className='info-row'>
                            <div className='info-label'>Văn phòng gửi</div>
                            <div className='info-value'>
                                <button onClick={() => handleViewShop(delivery.fromShop.shopId)}>
                                    <Link to={`/management/detail-office`}>{delivery.fromShop.commune.name}({delivery.fromShop.shopId})</Link>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='receiver-info'>
                        <b className='info-title'>Thông tin phía nhận:</b>
                        <div className='info-row'>
                            <div className='info-label'>Người nhận</div>
                            <div className='info-value'>{delivery.toName}</div>
                        </div>
                        <div className='info-row'>
                            <div className='info-label'>Số điện thoại người nhận</div>
                            <div className='info-value'>{delivery.toPhone}</div>
                        </div>
                        <div className='info-row'>
                            <div className='info-label'>Địa chỉ người nhận</div>
                            <div className='info-value'>{delivery.toAddress}</div>
                        </div>
                        <div className='info-row'>
                            <div className='info-label'>Văn phòng nhận</div>
                            <div className='info-value'>
                                <button onClick={() => handleViewShop(delivery.toShop.shopId)}>
                                    <Link to={`/management/detail-office`}>{delivery.toShop.commune.name}({delivery.toShop.shopId})</Link>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='order-status'>
                        <b className='info-title'>Trạng thái đơn hàng:</b>
                        <div className='info-row'>
                            <div className='info-label'>Trạng thái hiện tại</div>
                            <div className='info-value'>{convertText(delivery.currentStatus)}</div>
                        </div>
                        <div className='info-row'>
                            <div className='info-label'>Văn phòng hiện tại</div>
                            <div className='info-value'>
                                <button onClick={() => handleViewShop(delivery.currentShop.shopId)}>
                                    <Link to={`/management/detail-office`}>{delivery.currentShop.commune.name}({delivery.currentShop.shopId})</Link>
                                </button>
                            </div>
                        </div>
                        <div className='info-row'>
                            <div className='info-label'>Thời gian tạo đơn</div>
                            <div className='info-value'>{delivery.createdAt}</div>
                        </div>
                        <div className='info-row'>
                            <div className='info-label'>Thời gian cập nhật trạng thái cuối cùng</div>
                            <div className='info-value'>{delivery.updatedAt}</div>
                        </div>
                    </div>
                </>
            ) : <></>}
        </div>
    </>
}

export default DeliveryDetail