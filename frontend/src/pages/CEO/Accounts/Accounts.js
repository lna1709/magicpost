import './Accounts.scss'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectToken } from '../../../app/authSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { selectUsername, selectRole, updateUsername, updateRole } from '../../../app/urlSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

import { convertText } from '../../../service/service'

const Accounts = () => {

    const token = useSelector(selectToken)

    const navigate = useNavigate()

    const [accounts, setAccounts] = useState()

    const [roles, setRoles] = useState('POST_HEAD, WAREHOUSE_HEAD')

    const [filteredData, setFilteredData] = useState({})

    const [page, setPage] = useState(1)

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const [maxPage, setMaxPage] = useState();

    const [sort, setSort] = useState('');
    const [direction, setDirection] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    ...filteredData,
                }
            }

            try {
                const response = await axios.get(`${backendUrl}/accounts`, config)
                setAccounts(response.data.accounts)
                setMaxPage(response.data.totalPages)
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [filteredData, page, sort, direction])

    const prev = () => {
        setPage(Math.max(page - 1, 1))
    }

    const next = () => {
        setPage(Math.min(maxPage, page + 1))
    }

    const [name, setName] = useState()
    const [username, setUsername] = useState()
    const [address, setAddress] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [shopId, setShopId] = useState()

    useEffect(() => {
        setFilteredData({
            ...filteredData,
            page: page - 1,
            sortBy: sort,
            direction,
            nameContains: name,
            usernameContains: username,
            phoneContains: phone,
            emailContains: email,
            addressContains: address,
            workAtId: shopId,
            roles
        })
    }, [page, sort, direction, name, username, phone, email, address, shopId, roles])

    const handleInputChange = (e) => {
        let value = e.target.value;
        switch (e.target.name) {
            case 'name':
                value = value.toLowerCase()
                setName(value)
                break;
            case 'username':
                value = value.toLowerCase()
                setUsername(value)
                break;
            case 'address':
                value = value.toLowerCase()
                setAddress(value)
                break;
            case 'email':
                value = value.toLowerCase()
                setEmail(value)
                break;
            case 'phone':
                setPhone(value)
                break;
            case 'shopId':
                setShopId(value)
                break;
            case 'roles':
                setRoles(value)
                break;
            default:
                break
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

    const dispatch = useDispatch()

    const handleViewDetail = (username, role) => {
        console.log(username, 'uu')
        dispatch(updateUsername({ username }))
        dispatch(updateRole({ role }))
        navigate(`/management/detail-account`)
    }

    return <>
        <div className='accounts'>
            <h1>Các tài khoản trưởng điểm</h1>
            <Table>
                <thead>
                    <tr>
                        <th className='accounts-sort' onClick={() => handleSort('NAME')}>Tên {renderSortIcon('NAME')}</th>
                        <th className='accounts-sort' onClick={() => handleSort('USERNAME')}>Username {renderSortIcon('USERNAME')}</th>
                        <th className='accounts-sort' onClick={() => handleSort('ADDRESS')}>Địa chỉ {renderSortIcon('ADDRESS')}</th>
                        <th>Vai trò</th>
                        <th className='accounts-sort' onClick={() => handleSort('EMAIL')}>Email {renderSortIcon('EMAIL')}</th>
                        <th className='accounts-sort' onClick={() => handleSort('PHONE')}>Số điện thoại {renderSortIcon('PHONE')}</th>
                        <th>Id Văn phòng</th>
                        <th>Id Địa chỉ Văn phòng</th>
                        <th>Địa chỉ Văn phòng </th>
                        <th>Số nhân viên</th>
                        <th>Số đơn đang tồn</th>
                    </tr>
                    <tr>
                        <th><input type='text' name='name' onChange={handleInputChange}></input></th>
                        <th><input type='text' name='username' onChange={handleInputChange}></input></th>
                        <th><input type='text' name='address' onChange={handleInputChange}></input></th>
                        <th><select name='roles' onChange={handleInputChange}>
                            <option value={['POST_HEAD', 'WAREHOUSE_HEAD']}>Tất cả</option>
                            <option value={['POST_HEAD']}>Trưởng điểm giao dịch</option>
                            <option value={['WAREHOUSE_HEAD']}>Trưởng điểm tập kết</option>
                        </select></th>
                        <th><input type='text' name='email' onChange={handleInputChange}></input></th>
                        <th><input type='number' name='phone' onChange={handleInputChange}></input></th>
                        <th><input type='number' name='shopId' onChange={handleInputChange}></input></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {accounts ? accounts.map(acc => <>
                        <tr onClick={() => handleViewDetail(acc.username, acc.role)}>
                            <td>{acc.name}</td>
                            <td>{acc.username}</td>
                            <td>{acc.address}</td>
                            <td>{convertText(acc.role)}</td>
                            <td>{acc.email}</td>
                            <td>{acc.phone}</td>
                            <td>{acc.workAt.shopId}</td>
                            <td>{acc.workAt.commune.communeId}</td>
                            <td>{acc.workAt.commune.name}</td>
                            <td>{acc.workAt.employeeNumber}</td>
                            <td>{acc.workAt.currentDeliveryNumber}</td>
                        </tr>
                    </>) : <>Loading ...</>}
                </tbody>
                <div className='accounts-pagination'>
                    <button onClick={prev}>Trang trước</button>
                    <span>{page}/{maxPage}</span>
                    <button onClick={next}>Trang sau</button>
                </div>
            </Table>
        </div>
    </>
}

export default Accounts