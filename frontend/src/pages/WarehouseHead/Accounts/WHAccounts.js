import './WHAccounts.scss'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken, selectAccount } from '../../../app/authSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { convertText } from '../../../service/service'
import { updateRole, updateUsername } from '../../../app/urlSlice'

const WHAccounts = () => {

    const token = useSelector(selectToken)

    const shopId = useSelector(selectAccount).workAt.shopId

    const navigate = useNavigate()

    const [accounts, setAccounts] = useState()

    const [filteredData, setFilteredData] = useState({})

    const [page, setPage] = useState(1)

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const [maxPage, setMaxPage] = useState();

    const [sortField, setSortField] = useState('');
    const [direction, setDirection] = useState('');

    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    ...filteredData,
                    roles: 'EMPLOYEE',
                    workAtId: shopId
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
    }, [filteredData, page, sortField, direction])

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
            sort: sortField,
            direction
        })
    }, [page, sortField, direction])

    const handleSort = (field) => {
        if (field === sortField) {
            setDirection(direction === 'ASC' ? 'DESC' : 'ASC');
        } else {
            setSortField(field);
            setDirection('ASC');
        }
    };

    const dispatch = useDispatch()

    const handleViewDetail = (username, role) => {
        navigate(`/management/wh-detail-account`)
        dispatch(updateUsername({ username }))
        dispatch(updateRole({ role }))
    }

    const handleInputChange = (e) => {
        let value = e.target.value;
        switch (e.target.name) {
            case 'name':
                value = value.toLowerCase();
                setName(value);
                break;
            case 'username':
                value = value.toLowerCase();
                setUsername(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'email':
                value = value.toLowerCase();
                setEmail(value);
                break;
            default:
        }
    }

    useEffect(() => {
        setFilteredData({
            ...filteredData,
            nameContains: name,
            usernameContains: username,
            phoneContains: phone,
            emailContains: email,
            addressContains: address
        })
    }, [name, username, phone, email, address])

    return <>
        <div className='wh-accounts'>
            <h1>Các tài khoản trưởng điểm</h1>
            <Table>
                <thead>
                    <tr>
                        <th className='accounts-sort' onClick={() => handleSort('NAME')}>Tên</th>
                        <th className='accounts-sort' onClick={() => handleSort('USERNAME')}>Username</th>
                        <th className='accounts-sort' onClick={() => handleSort('PHONE')}>Số điện thoại</th>
                        <th className='accounts-sort' onClick={() => handleSort('EMAIL')}>Email</th>
                        <th className='accounts-sort' onClick={() => handleSort('ADDRESS')}>Địa chỉ</th>
                    </tr>
                    <tr>
                        <th><input type='text' name='name' onChange={handleInputChange}></input></th>
                        <th><input type='text' name='username' onChange={handleInputChange}></input></th>
                        <th><input type='number' name='phone' onChange={handleInputChange}></input></th>
                        <th><input type='text' name='email' onChange={handleInputChange}></input></th>
                        <th><input type='text' name='address' onChange={handleInputChange}></input></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {accounts ? accounts.map(acc => <>
                        <tr onClick={() => handleViewDetail(acc.username, acc.role)}>
                            <td>{acc.name}</td>
                            <td>{acc.username}</td>
                            <td>{acc.phone}</td>
                            <td>{acc.email}</td>
                            <td>{acc.address}</td>
                        </tr>
                    </>) : <>Loading ...</>}
                </tbody>
            </Table>
            <div className='pagination'><button onClick={prev}>Trang trước</button>
                <span>{page}/{maxPage}</span>
                <button onClick={next}>Trang sau</button></div>
        </div>
    </>
}

export default WHAccounts