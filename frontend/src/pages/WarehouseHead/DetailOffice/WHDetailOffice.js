import './WHDetailOffice.scss'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../app/authSlice';
import axios from 'axios';
import { convertText } from '../../../service/service';
import { selectShopId } from '../../../app/urlSlice';

const WHDetailOffice = () => {

    const shopId = useSelector(selectShopId);

    const [detail, setDetail] = useState(null)

    const backendUrl = process.env.REACT_APP_BACKEND_URL

    const token = useSelector(selectToken)

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

    return <>
        <div className='detail-office'>
            <h1>Thông tin chi tiết văn phòng</h1>
            {detail ? <>
                <span><b>Shop Id: </b>{detail.shopId}</span><br></br>
                <span><b>Địa chỉ: </b>{detail.commune.name} ({detail.commune.communeId})</span><br></br>
                <span><b>Số nhân viên: </b>{detail.employeeNumber}</span><br></br>
                <span><b>Loại văn phòng: </b>{convertText(detail.type)}</span><br></br>
                <span><b>Số đơn đang tới văn phòng: </b>{detail.comingDeliveryNumber}</span><br></br>
                <span><b>Số đơn đang ở văn phòng: </b>{detail.currentDeliveryNumber}</span><br></br>
                <span><b>Số đơn đã đi khỏi văn phòng: </b>{detail.goneDeliveryNumber}</span><br></br>
            </> : <></>}
        </div>
    </>
}

export default WHDetailOffice