import './TEAfter.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { selectAccount, selectToken } from '../../../../app/authSlice'
import { Link } from 'react-router-dom'
import { convertText } from '../../../../service/service'
import { updateDeliveryId } from '../../../../app/urlSlice'
import { useNavigate } from 'react-router-dom'

const TEAfter = () => {
    const navigate = useNavigate()

    const [deliveries, setDeliveries] = useState();
    const [filterData, setFilterData] = useState();
    const [productType, setProductType] = useState();
    const [fromName, setFromName] = useState();
    const [fromAddress, setFromAddress] = useState();
    const [fromShop, setFromShop] = useState();
    const [toName, setToName] = useState();
    const [toAddress, setToAddress] = useState();
    const [toShop, setToShop] = useState();
    const [type, setType] = useState('');
    const [maxPage, setMaxPage] = useState();

    const [sort, setSort] = useState('');
    const [direction, setDirection] = useState('')

    const token = useSelector(selectToken);
    const shopId = useSelector(selectAccount).workAt.shopId

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchData = async () => {
            switch (type) {
                case '':
                    const config1 = {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        params: {
                            ...filterData,
                            currentShopId: shopId,
                            statuses: 'SENT_TO_CUSTOMER_SUCCESS',
                            sort,
                            direction,
                        }
                    }

                    const config2 = {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        params: {
                            ...filterData,
                            currentShopId: shopId,
                            statuses: 'SENT_TO_CUSTOMER_FAIL',
                            sort,
                            direction,
                        }
                    }

                    try {
                        const response1 = await axios.get(`${backendUrl}/deliveries`, config1)
                        const response2 = await axios.get(`${backendUrl}/deliveries`, config2)
                        setDeliveries(response1.data.deliveries.concat(response2.data.deliveries))
                        setMaxPage(Math.ceil((response1.data.totalElements + response2.data.totalElements) / 10))
                    } catch (error) {
                        console.log(error)
                    }
                    break;
                case 'SENT_TO_CUSTOMER_SUCCESS':
                    const config3 = {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        params: {
                            ...filterData,
                            currentShopId: shopId,
                            statuses: 'SENT_TO_CUSTOMER_SUCCESS',
                            sort,
                            direction,
                        }
                    }

                    try {
                        const response3 = await axios.get(`${backendUrl}/deliveries`, config3)
                        setDeliveries(response3.data.deliveries)
                        setMaxPage(response3.data.totalPages)
                    } catch (error) {
                        console.log(error)
                    }
                    break;
                case 'SENT_TO_CUSTOMER_FAIL':
                    const config4 = {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        params: {
                            ...filterData,
                            currentShopId: shopId,
                            statuses: 'SENT_TO_CUSTOMER_FAIL',
                            sort,
                            direction,
                        }
                    }

                    try {
                        const response4 = await axios.get(`${backendUrl}/deliveries`, config4)
                        setDeliveries(response4.data.deliveries)
                        setMaxPage(response4.data.totalPages)
                    } catch (error) {
                        console.log(error)
                    }
                    break;
            }
        }
        fetchData();
        console.log(type)
    }, [filterData, type, sort, direction])

    const handleInputChange = (e) => {
        let value = e.target.value
        switch (e.target.name) {
            case 'productType':
                setProductType(e.target.value);
                break;
            case 'type':
                setType(e.target.value);
                break;
            case 'fromName':
                value = value.toLowerCase();
                setFromName(value);
                break;
            case 'fromAddress':
                value = value.toLowerCase();
                setFromAddress(value);
                break;
            case 'fromShop':
                setFromShop(e.target.value);
                break;
            case 'toName':
                value = value.toLowerCase();
                setToName(value);
                break;
            case 'toAddress':
                value = value.toLowerCase();
                setToAddress(value);
                break;
            case 'toShop':
                setToShop(e.target.value);
                break;
            default:
                break;
        }
    }

    const [page, setPage] = useState(1);

    useEffect(() => {
        setFilterData({
            ...filterData,
            currentStatus: productType,
            fromAddressContains: fromAddress,
            toAddressContains: toAddress,
            fromNameContains: fromName,
            toNameContains: toName,
            fromShopId: fromShop,
            toShopId: toShop,
            page: page - 1
        })

    }, [productType, fromAddress, fromName, fromShop, toAddress, toName, toShop, page])

    const prev = (e) => {
        setPage(Math.max(1, page - 1))
    }

    const next = (e) => {
        setPage(page + 1)
    }

    const handleSortChange = (field) => {
        if (field === sort) {
            setDirection(direction === 'ASC' ? 'DESC' : 'ASC');
        } else {
            setSort(field);
            setDirection('ASC');
        }
    }

    const dispatch = useDispatch()

    const handleViewDetail = (deliveryId) => {
        dispatch(updateDeliveryId({ deliveryId }))
        navigate('/management/detail')
    }

    return <>
        <div className='te-after'>
            <Table>
                <thead>
                    <tr>
                        <th className='te-after-sort' onClick={() => handleSortChange('CREATED_AT')}>Thời gian trạng thái</th>
                        <th>Trạng thái</th>
                        <th>Loại hàng</th>
                        <th>Người gửi</th>
                        <th>Địa chỉ người gửi</th>
                        <th>Văn phòng gửi</th>
                        <th>Người nhận</th>
                        <th>Địa chỉ người nhận</th>
                        <th>Văn phòng nhận</th>
                        <th>Xem thông tin đơn</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th><select name='type' onChange={handleInputChange}>
                            <option value={''}>Tất cả các trạng thái</option>
                            <option value={'SENT_TO_CUSTOMER_SUCCESS'}>Gửi thành công</option>
                            <option value={'SENT_TO_CUSTOMER_FAIL'}>Gửi thất bại</option>
                        </select></th>
                        <th><select name='productType' onChange={handleInputChange}>
                            <option value={''}>Tất cả các loại hàng</option>
                            <option value={'DOCUMENT'}>DOCUMENT</option>
                            <option value={'PRODUCT'}>PRODUCT</option>
                        </select></th>
                        <th><input onChange={handleInputChange} type='text' name='fromName'></input></th>
                        <th><input onChange={handleInputChange} type='text' name='fromAddress'></input></th>
                        <th><input onChange={handleInputChange} type='number' name='fromShop'></input></th>
                        <th><input onChange={handleInputChange} type='text' name='toName'></input></th>
                        <th><input onChange={handleInputChange} type='text' name='toAddress'></input></th>
                        <th><input onChange={handleInputChange} type='number' name='toShop'></input></th>
                    </tr>
                </thead>
                <tbody>
                    {deliveries ? deliveries.map(del => (
                        <tr>
                            <td>{del.createdAt}</td>
                            <td>{convertText(del.currentStatus)}</td>
                            <td>{convertText(del.productType)}</td>
                            <td>{del.fromName}</td>
                            <td>{del.fromAddress}</td>
                            <td>{del.fromShop.commune.name} ({del.fromShop.commune.communeId})</td>
                            <td>{del.toName}</td>
                            <td>{del.toAddress}</td>
                            <td>{del.toShop.commune.name} ({del.toShop.commune.communeId})</td>
                            <td><button onClick={() => handleViewDetail(del.deliveryId)}><Link to={`/management/te-next`}>Xem</Link></button></td>
                        </tr>
                    )) : <></>}
                </tbody>
            </Table>
            <div className='te-coming-pagination'>
                <button onClick={prev}>Trang trước</button>
                <span>{page}/{maxPage}</span>
                <button onClick={next}>Trang sau</button>
            </div>
        </div>
    </>

}

export default TEAfter