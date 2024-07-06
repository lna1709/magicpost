import './WHModifyAccount.scss'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken, selectAccount } from '../../../app/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { convertText } from '../../../service/service';
import { selectRole, selectUsername, updateRole, updateUsername } from '../../../app/urlSlice';

const WHModifyAccount = () => {

    const shopId = useSelector(selectAccount).workAt.shopId;

    const username = useSelector(selectUsername);
    const role = useSelector(selectRole);

    const [detail, setDetail] = useState(null)

    const backendUrl = process.env.REACT_APP_BACKEND_URL

    const token = useSelector(selectToken)

    const navigate = useNavigate()

    const [rCode, setRCode] = useState()
    const [pCode, setPCode] = useState()
    const [dCode, setDCode] = useState()
    const [communeId, setCommuneId] = useState()
    const [password, setPassword] = useState()

    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [cccd, setCccd] = useState();

    const [provinceData, setProvinceData] = useState(null)
    const [districtData, setDistrictData] = useState(null)
    const [wardData, setWardData] = useState(null)

    const handleRegionChange = (e) => {
        setRCode(e.target.value)
    }

    const handleProvinceChange = (e) => {
        setPCode(e.target.value)
    }

    const handleDistrictChange = (e) => {
        setDCode(e.target.value)
    }

    const handleCommuneChange = (e) => {
        setCommuneId(e.target.value)
    }

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    usernameContains: username.toLowerCase(),
                    roles: role,
                    workAtId: shopId
                }
            }

            try {
                const response = await axios.get(`${backendUrl}/accounts`, config)
                setDetail(response.data.accounts[0])
                console.log(response.data.accounts[0])
                setEmail(response.data.accounts[0].email);
                setPhone(response.data.accounts[0].phone);
                setAddress(response.data.accounts[0].address);
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])

    const getAddress = async (regioncode, provincecode, districtcode, wardcode) => {
        try {
            // Thiết lập header cho request
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            // Gọi API1 để lấy các province dựa vào regioncode
            const response1 = await axios.get(`${backendUrl}/states/${regioncode}/provinces`, config);
            const province = response1.data.provinces.find(province => province.provinceId == provincecode);

            // Lọc province có provinceId = provincecode
            if (!province) {
                throw new Error('Không tìm thấy province!');
            }

            // Gọi API2 để lấy district dựa vào provincecode
            const response2 = await axios.get(`${backendUrl}/provinces/${provincecode}/districts`, config);
            const district = response2.data.districts.find(district => district.districtId == districtcode);

            // Lọc district có districtId = districtcode
            if (!district) {
                throw new Error('Không tìm thấy district!');
            }

            const response3 = await axios.get(`${backendUrl}/districts/${districtcode}/communes`, config);
            const ward = response3.data.communes.find(commune => commune.communeId == wardcode);

            // Trả về province và district
            return district.name + ', ' + province.name + ', ' + ward.name;
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/states/${rCode}/provinces`, {
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = response.data.provinces;
                // Process data here
                setProvinceData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [rCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/provinces/${pCode}/districts`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Thay thế token bằng token thực tế của bạn
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data.districts;
                // Xử lý dữ liệu tại đây
                setDistrictData(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [pCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/districts/${dCode}/communes`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Thay thế token bằng token thực tế của bạn
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data.communes;
                // Xử lý dữ liệu tại đây
                setWardData(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [dCode]);

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
                const address = await getAddress(rCode, pCode, dCode, communeId)
                const body = {
                    username: username,
                    password: password,
                    name: detail.name,
                    email: email,
                    phone: phone,
                    address: address,
                    cccd: cccd
                }

                if (body.password === '') {
                    delete body.password;
                }

                const response = await axios.patch(`${backendUrl}/accounts/profile`, body, config)
                toast.success('Sửa đổi thành công!')
                console.log(response)
                navigate(`/management/ph-detail-account`)
                dispatch(updateUsername({ username }))
                dispatch(updateRole({ role }))
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }

    const handleCancel = (e) => {
        e.preventDefault()
        navigate(`/management/ph-detail-account`)
        dispatch(updateUsername({ username }))
        dispatch(updateRole({ role }))
    }

    return <>
        <div className='modify-account'>
            {detail ? (
                <>
                    <h3>{detail.name} - {convertText(detail.role)}</h3>
                    <span><b>Username: </b>{detail.username}</span><br />
                    <label><b>Mật khẩu: </b></label>&nbsp;
                    <input type="password" onChange={e => setPassword(e.target.value)} /><br />
                    <label><b>Email: </b></label>&nbsp;
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} /><br />
                    <label><b>Số điện thoại: </b></label>&nbsp;
                    <input type="text" value={phone} onChange={e => setPhone(e.target.value)} /><br />
                    <label><b>Address: </b></label>&nbsp;
                    <label>Miền</label>
                    <select onChange={(e) => handleRegionChange(e)}>
                        <option value=''>Chọn miền</option>
                        <option value={1}>Miền Bắc</option>
                        <option value={2}>Miền Trung</option>
                        <option value={3}>Miền Nam</option>
                    </select>
                    <label>Tỉnh/thành</label>
                    <select onChange={(e) => handleProvinceChange(e)}>
                        <option value=''>Chọn Tỉnh/thành</option>
                        {
                            (provinceData && rCode) ? provinceData.map(province => <option value={province.provinceId}>{province.name}</option>) : <></>
                        }
                    </select>
                    <label>Quận/Huyện</label>
                    <select onChange={(e) => handleDistrictChange(e)}>
                        <option value=''>Chọn Quận/Huyện</option>
                        {
                            (districtData && pCode && rCode) ? districtData.map(district => <option value={district.districtId}>{district.name}</option>) : <></>
                        }
                    </select>
                    <label>Xã/Phường</label>
                    <select onChange={(e) => handleCommuneChange(e)}>
                        <option value=''>Chọn Xã/Phường</option>
                        {
                            (pCode && rCode && dCode && wardData) ? wardData.map(commune => <option value={commune.communeId}>{commune.name}</option>) : <></>
                        }
                    </select><br></br>
                    <label><b>Căn cước công dân: </b></label>
                    <input type="text" onChange={e => setCccd(e.target.value)} /><br />
                    <span><b>Id Văn phòng: </b>{detail.workAt.shopId}</span><br />
                    <span><b>Địa chỉ Văn phòng: </b>{detail.workAt.commune.name} - ({detail.workAt.commune.communeId})</span><br />
                    <span><b>Số nhân viên đang quản lý: </b>{detail.workAt.employeeNumber}</span><br />
                    <button onClick={handleSubmit}>Xác nhận sửa thông tin</button>
                    <button onClick={handleCancel}>Hủy sửa đổi</button>
                </>
            ) : (
                <>Loading...</>
            )}
        </div>
    </>
}

export default WHModifyAccount