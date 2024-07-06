import './DetailOffice.scss'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../../app/authSlice';
import axios from 'axios';
import { beautifyId, convertText } from '../../../service/service';
import { Link } from 'react-router-dom';
import { selectShopId, updateDeliveryId } from '../../../app/urlSlice';

const DetailOffice = () => {

    const shopId = useSelector(selectShopId);

    const [detail, setDetail] = useState(null)

    const backendUrl = process.env.REACT_APP_BACKEND_URL

    const token = useSelector(selectToken)

    const [deliveries, setDeliveries] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    shopId
                }
            }

            try {
                const response = await axios.get(`${backendUrl}/shops/${shopId}`, config)
                setDetail(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    currentShopId: shopId,
                    sort: 'UPDATED_AT',
                    direction: 'DESC',
                    page: 0,
                    size: 5
                }
            }

            try {
                const response = await axios.get(`${backendUrl}/deliveries`, config)
                console.log(response.data)
                setDeliveries(response.data.deliveries)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])

    const dispatch = useDispatch()

    const handleViewDetail = (deliveryId) => {
        dispatch(updateDeliveryId({ deliveryId }))
    }

    return <>
        <div className='detail-office'>
            <h1>Thông tin chi tiết văn phòng</h1>
            <div className='detail-box'>
                {detail ? <div className='detail'>
                    <span><b>Shop Id: </b>{detail.shopId}</span>
                    <span><b>Địa chỉ: </b>{detail.commune.name} ({detail.commune.communeId})</span>
                    <span><b>Số nhân viên: </b>{detail.employeeNumber}</span>
                    <span><b>Loại văn phòng: </b>{convertText(detail.type)}</span>
                    <span><b>Số đơn đang tới văn phòng: </b>{detail.comingDeliveryNumber}</span>
                    <span><b>Số đơn đang ở văn phòng: </b>{detail.currentDeliveryNumber}</span>
                    <span><b>Số đơn đã đi khỏi văn phòng: </b>{detail.goneDeliveryNumber}</span>
                </div> : <></>}
                <b>Các đơn hàng gần đây ở văn phòng này:</b>
                {deliveries ? deliveries.map(del => <div className='delivery'>
                    <span><b>Id đơn hàng: </b><button onClick={() => handleViewDetail(del.deliveryId)}><Link to={`/management/delivery-detail`}>{beautifyId(del.deliveryId)}</Link></button></span>
                    <span><b>Thời gian cập nhật gần nhất: </b>{del.updatedAt}</span>
                    <span><b>Người gửi: </b>{del.fromName} - {del.fromPhone}</span>
                    <span><b>Người nhận: </b>{del.toName} - {del.toPhone}</span>
                    <span><b>Văn phòng gửi: </b>{del.fromShop.commune.name} ({del.fromShop.shopId})</span>
                    <span><b>Văn phòng nhận: </b>{del.toShop.commune.name} ({del.toShop.shopId})</span>
                </div>) : <></>}
            </div>
        </div>
    </>
}

export default DetailOffice