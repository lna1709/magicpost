import toast from 'react-hot-toast'
import './CreateAccount.scss'
import { useState, useEffect } from 'react'
import { isValidEmail, isValidName, isValidPhoneNumber } from '../../../logic/verification'
import axios from 'axios'
import { selectToken } from '../../../app/authSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CreateAccount = () => {

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const token = useSelector(selectToken)

    const navigate = useNavigate()

    const [user, setUser] = useState({
        name: '',
        username: '',
        password: '',
        email: '',
        phone: '',
        cccd: '',
    })

    const [provinceData, setProvinceData] = useState(null)
    const [districtData, setDistrictData] = useState(null)
    const [wardData, setWardData] = useState(null)
    const [rCode, setRCode] = useState()
    const [pCode, setPCode] = useState()
    const [dCode, setDCode] = useState()
    const [communeId, setCommuneId] = useState(0)

    const [shopRCode, setShopRCode] = useState(0)
    const [shopPCode, setShopPCode] = useState(0)
    const [shopDCode, setShopDCode] = useState(0)
    const [shopWCode, setShopWCode] = useState(0)
    const [shopId, setShopId] = useState(0)
    const [shopProvinceData, setShopProvinceData] = useState(null)
    const [shopDistrictData, setShopDistrictData] = useState(null)
    const [shopWardData, setShopWardData] = useState(null)
    const [shopData, setShopData] = useState(null)

    const [role, setRole] = useState('')

    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleRegionChange = (e) => {
        setRCode(e.target.value)
    }

    const handleProvinceChange = (e) => {
        setPCode(e.target.value)
    }

    const handleDistrictChange = (e) => {
        setDCode(e.target.value)
    }

    const createNewAccount = (user) => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${backendUrl}/accounts`, user, {
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = response.data;
                // Process data here
                toast.success('Tạo tài khoản thành công!')
                console.log(data);
                navigate('/management/')
            } catch (error) {
                toast.error('Tạo tài khoản không thành công!')
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }

    const handleCommuneChange = (e) => {
        setCommuneId(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const address = await getAddress(rCode, pCode, dCode, communeId)
        if (Object.values(user).some(value => value === '')) {
            toast.error('Không được để trường nào trống!')
        } else if (!isValidName(user.name)) {
            toast.error('Tên chưa đúng định dạng')
        } else if (!isValidEmail(user.email)) {
            toast.error('Email chưa đúng định dạng!')
        } else if (!isValidPhoneNumber(user.phone)) {
            toast.error('Số điện thoại chưa đúng định dạng!')
        } else if (role === '') {
            toast.error('Chưa chọn vai trò cho tài khoản!')
        } else if (!(rCode && pCode && dCode &&
            shopRCode && shopDCode && shopPCode)) {
            toast.error('Thông tin địa chỉ chưa đủ!')
        } else {
            createNewAccount({ ...user, role, address, workAt: Number(shopId) })
        }
    }

    const handleRoleChange = (e) => {
        e.preventDefault();
        setRole(e.target.value)
    }

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/states/${shopRCode}/provinces`, {
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = response.data.provinces;
                // Process data here
                setShopProvinceData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [shopRCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/provinces/${shopPCode}/districts`, {
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = response.data.districts;
                // Process data here
                setShopDistrictData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [shopPCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/districts/${shopDCode}/communes`, {
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = response.data.communes;
                // Process data here
                setShopWardData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [shopDCode]);

    useEffect(() => {
        const fetchData = async () => {
            let type;
            if (role === 'POST_HEAD') {
                type = 'POST'
            } else if (role === 'WAREHOUSE_HEAD') {
                type = 'WAREHOUSE'
            } else {
                type = ''
            }
            try {
                const params = {
                    type,
                    communeId: shopWCode,  // Thay thế bằng ID quận/huyện thực tế của bạn
                };
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Thay thế token bằng token thực tế của bạn
                        'Content-Type': 'application/json'
                    },
                    params
                };
                const response = await axios.get('http://localhost:8090/magic-post/api/shops', config);
                const data = response.data.shops;
                console.log(shopWCode, type)
                console.log(response, 'dcm')
                // Xử lý dữ liệu tại đây
                setShopData(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [shopWCode, role]);

    const handleShopRegionChange = (e) => {
        setShopRCode(e.target.value)
    }

    const handleShopProvinceChange = (e) => {
        setShopPCode(e.target.value)
    }

    const handleShopDistrictChange = (e) => {
        setShopDCode(e.target.value)
    }

    const handleShopWardChange = (e) => {
        setShopWCode(e.target.value)
    }

    const handleShopCommuneChange = (e) => {
        setShopId(e.target.value)
    }

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

    return <>
        <div className='create-account'>
            <h2><b>Tạo tài khoản cho trưởng điểm</b></h2>
            <form onSubmit={handleSubmit}>
                <div className='ph-create-account-box'>
                    <div className='ph-create-account-box-1'>
                        <div className='box-1'>
                            <label>Tên nhân viên</label>
                            <input type='text' name='name' value={user.name} onChange={handleInputChange}></input>
                            <label>Username</label>
                            <input type='text' name='username' value={user.username} onChange={handleInputChange}></input>
                            <label>Password</label>
                            <input type='password' name='password' value={user.password} onChange={handleInputChange}></input>
                        </div>
                        <div className='box-2'>
                            <label>Email</label>
                            <input type='email' name='email' value={user.email} onChange={handleInputChange}></input>
                            <label>Số điện thoại</label>
                            <input type='text' name='phone' value={user.phone} onChange={handleInputChange}></input>
                            <label>CCCD</label>
                            <input type='text' name='cccd' value={user.idNumber} onChange={handleInputChange}></input>
                        </div>
                    </div>
                    <div className='ph-create-account-box-2'>
                        <div className='box-3'>
                            <h4>Chọn địa chỉ</h4>
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
                            </select>
                        </div>
                        <br></br>
                        <div className='box-4'>
                            <h4>Chọn địa điểm làm việc/vai trò</h4>
                            <label>Chọn vai trò</label>
                            <select onChange={handleRoleChange}>
                                <option value=''>Vai trò</option>
                                <option value='POST_HEAD'>Trưởng điểm giao dịch</option>
                                <option value='WAREHOUSE_HEAD'>Trưởng điểm tập kết</option>
                            </select>
                            <label>Miền</label>
                            <select onChange={(e) => handleShopRegionChange(e)}>
                                <option value=''>Chọn miền</option>
                                <option value={1}>Miền Bắc</option>
                                <option value={2}>Miền Trung</option>
                                <option value={3}>Miền Nam</option>
                            </select>
                            <label>Tỉnh/thành</label>
                            <select onChange={(e) => handleShopProvinceChange(e)}>
                                <option value=''>Chọn Tỉnh/thành</option>
                                {
                                    (shopProvinceData && shopRCode) ? shopProvinceData.map(province => <option value={province.provinceId}>{province.name}</option>) : <></>
                                }
                            </select>
                            <label>Quận/Huyện</label>
                            <select onChange={(e) => handleShopDistrictChange(e)}>
                                <option value=''>Chọn Quận/Huyện</option>
                                {
                                    (shopDistrictData && shopPCode && shopRCode) ? shopDistrictData.map(district => <option value={district.districtId}>{district.name}</option>) : <></>
                                }
                            </select>
                            <label>Xã/Phường</label>
                            <select onChange={(e) => handleShopWardChange(e)}>
                                <option value=''>Chọn Xã/Phường văn phòng</option>
                                {
                                    (shopPCode && shopRCode && shopDCode && shopWardData) ? shopWardData.map(ward => <option value={ward.communeId}>{ward.name}</option>) : <></>
                                }
                            </select>
                            <label>Id Văn phòng</label>
                            <select onChange={(e) => handleShopCommuneChange(e)}>
                                <option value=''>Chọn Id văn phòng</option>
                                {
                                    (shopPCode && shopRCode && shopDCode && shopWCode && shopData) ? shopData.map(shop => <option value={shop.shopId}>{shop.shopId}</option>) : <></>
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <input type='submit' value={'Hoàn thành tạo tài khoản'} className='ph-create-account-submit'></input>
            </form>
        </div>
    </>
}

export default CreateAccount