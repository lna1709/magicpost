import './Detail.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { beautifyId, convertText } from '../service/service';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAll, selectDeliveryId } from '../app/urlSlice';

const Detail = () => {

    const dispatch = useDispatch();

    const deliveryId = useSelector(selectDeliveryId)

    const [delivery, setDelivery] = useState()

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                params: {
                    deliveryId
                }
            }

            try {
                const response = await axios.get(`${backendUrl}/deliveries/${deliveryId}`, config);
                setDelivery(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const renderBasicInfo = () => (
        <Table>
            <thead>
                <tr>
                    <th colSpan='4'>Thông tin cơ bản</th>
                </tr>
                <tr>
                    <th>ID</th>
                    <th>Tên đơn hàng</th>
                    <th>Mô tả khi gửi</th>
                    <th>Mô tả khi nhận</th>
                    <th>Cân nặng - Chi phí</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{beautifyId(delivery.deliveryId)}</td>
                    <td>{delivery.name}</td>
                    <td>{delivery.fromDescription}</td>
                    <td>{delivery.toDescription}</td>
                    <td>{delivery.weight}kg/{delivery.shippingFee}VND</td>
                </tr>
            </tbody>
        </Table>
    );

    const renderSenderInfo = () => (
        <div className='sender-info'>
            <h2>Thông tin người gửi</h2>
            <p><strong>Nguời gửi:</strong> {delivery.fromName}</p>
            <p><strong>Số điện thoại người gửi:</strong> {delivery.fromPhone}</p>
            <p><strong>Địa chỉ người gửi:</strong> {delivery.fromAddress}</p>
            <p><strong>Văn phòng gửi:</strong> {delivery.fromShop.commune.name} ({delivery.fromShop.shopId})</p>
        </div>
    );

    const renderRecipientInfo = () => (
        <div className='recipient-info'>
            <h2>Thông tin người nhận</h2>
            <p><strong>Nguời nhận:</strong> {delivery.toName}</p>
            <p><strong>Số điện thoại người nhận:</strong> {delivery.toPhone}</p>
            <p><strong>Địa chỉ người nhận:</strong> {delivery.toAddress}</p>
            <p><strong>Văn phòng nhận:</strong> {delivery.toShop.commune.name} ({delivery.toShop.shopId})</p>
        </div>
    );

    const renderStatusInfo = () => (
        <div className='status-info'>
            <h2>Trạng thái đơn hàng</h2>
            <p><strong>Trạng thái hiện tại:</strong> {convertText(delivery.currentStatus)}</p>
            <p><strong>Văn phòng hiện tại:</strong> {delivery.currentShop.commune.name} - {convertText(delivery.currentShop.type)} ({delivery.currentShop.shopId})</p>
            <p><strong>Thời gian tạo đơn:</strong> {delivery.createdAt}</p>
            <p><strong>Thời gian cập nhật trạng thái cuối cùng:</strong> {delivery.updatedAt}</p>
        </div>
    );

    return (
        <div className='detail'>
            {delivery ? (
                <>
                    <h1>Thông tin đơn hàng</h1>
                    {renderBasicInfo()}
                    {renderSenderInfo()}
                    {renderRecipientInfo()}
                    {renderStatusInfo()}
                </>
            ) : (
                <p>Đơn hàng không tồn tại hoặc chưa được tải thông tin xong</p>
            )}
        </div>
    );
}

export default Detail