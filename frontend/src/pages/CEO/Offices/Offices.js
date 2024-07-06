import { useEffect, useState } from 'react'
import './Offices.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken, selectAccount } from '../../../app/authSlice'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { convertText } from '../../../service/service'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { updateShopId } from '../../../app/urlSlice'

const Offices = () => {

    const navigate = useNavigate()

    const [offices, setOffices] = useState(null)

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const token = useSelector(selectToken)

    const [filteredData, setFilteredData] = useState(null)

    const [page, setPage] = useState(1)

    const [maxPage, setMaxPage] = useState();

    const [type, setType] = useState();

    const [communeId, setCommuneId] = useState();

    const [sort, setSort] = useState()

    const [direction, setDirection] = useState();

    useEffect(() => {

        const fetchData = async () => {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    ...filteredData,
                    sort,
                    direction
                }
            }
            console.log('config: ', config.params)

            try {
                const response = await axios.get(`${backendUrl}/shops`, config)
                setOffices(response.data.shops)
                setMaxPage(response.data.totalPages)
                console.log(response)
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();

    }, [filteredData, page, type, communeId, sort, direction])

    const prev = () => {
        setPage(Math.max(page - 1, 1))
    }

    const next = () => {
        setPage(Math.min(maxPage, page + 1))
    }

    useEffect(() => {
        setFilteredData({
            ...filteredData,
            page: page - 1,
            type,
            communeId
        })
    }, [page, type, communeId])

    const dispatch = useDispatch()

    const handleViewDetail = (shopId) => {
        navigate(`/management/detail-office`)
        dispatch(updateShopId({ shopId }))
    }

    const handleInputChange = (e) => {
        switch (e.target.name) {
            case 'communeId':
                setCommuneId(e.target.value);
                break;
            case 'type':
                setType(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleSort = (field) => {
        if (field === sort) {
            setDirection(direction === 'ASC' ? 'DESC' : 'ASC');
        } else {
            setSort(field);
            setDirection('ASC');
        }
    };

    const renderSortIcon = (field) => {
        if (field !== sort) {
            return <FontAwesomeIcon icon={faSort} />;
        }
        return direction === 'ASC' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />;
    };

    return <>
        <div className='offices'>
            <h2>Quản lý các văn phòng</h2>
            <Table>
                <thead>
                    <tr>
                        <th className='accounts-sort'>ID Văn phòng</th>
                        <th className='accounts-sort'>Địa chỉ (ID)</th>
                        <th>Loại văn phòng</th>
                        <th className='accounts-sort' onClick={() => handleSort('EMPLOYEE_NUMBER')}>Số nhân viên {renderSortIcon('CURRENT_DELIVERY_NUMBER')}</th>
                        <th className='accounts-sort' onClick={() => handleSort('COMING_DELIVERY_NUMBER')}>Số đơn đang đến {renderSortIcon('COMING_DELIVERY_NUMBER')}</th>
                        <th className='accounts-sort' onClick={() => handleSort('CURRENT_DELIVERY_NUMBER')}>Số đơn nhập kho {renderSortIcon('CURRENT_DELIVERY_NUMBER')}</th>
                        <th className='accounts-sort' onClick={() => handleSort('GONE_DELIVERY_NUMBER')}>Số đơn xuất kho {renderSortIcon('GONE_DELIVERY_NUMBER')}</th>

                    </tr>
                    <tr>
                        <th></th>
                        <th><input name='communeId' placeholder='Tìm kiếm theo id địa chỉ' onChange={handleInputChange}></input></th>
                        <th>
                            <select name='type' onChange={handleInputChange}>
                                <option value={''}>Tất cả</option>
                                <option value={'POST'}>Văn phòng giao dịch</option>
                                <option value={'WAREHOUSE'}>Văn phòng tập kết</option>
                            </select>
                        </th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {offices ? offices.map(off => (
                        <tr onClick={() => handleViewDetail(off.shopId)}>
                            <td>{off.shopId}</td>
                            <td>{off.commune.name} ({off.commune.communeId})</td>
                            <td>{convertText(off.type)}</td>
                            <td>{off.employeeNumber}</td>
                            <td>{off.comingDeliveryNumber}</td>
                            <td>{off.currentDeliveryNumber}</td>
                            <td>{off.goneDeliveryNumber}</td>
                        </tr>
                    )) : <></>}
                </tbody>
            </Table>
            <div className='pagination'>
                <button onClick={prev}>Trang trước</button>
                <span>{page}/{maxPage}</span>
                <button onClick={next}>Trang sau</button>
            </div>
        </div>
    </>
}

export default Offices