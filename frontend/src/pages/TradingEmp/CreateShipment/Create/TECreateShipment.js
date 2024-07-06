import './TECreateShipment.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { isValidEmail, isValidName, isValidPhoneNumber } from '../../../../logic/verification'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken, selectAccount } from '../../../../app/authSlice'
import { useNavigate } from 'react-router-dom'
import { updateDeliveryId } from '../../../../app/urlSlice'

const TECreateShipment = () => {

    const navigate = useNavigate()

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const shopId = (useSelector(selectAccount).workAt.shopId)
    console.log(shopId)

    const token = useSelector(selectToken)

    const [name, setName] = useState('')
    const [fromDescription, setFromDescription] = useState('')
    const [toDescription, setToDescription] = useState('')
    const [shippingFee, setShippingFee] = useState(0)
    const [weight, setWeight] = useState(0)

    const [sRCode, setSRCode] = useState()
    const [sPCode, setSPCode] = useState()
    const [sDCode, setSDCode] = useState()
    const [sWCode, setSWCode] = useState()
    const [senderName, setSenderName] = useState('')
    const [senderPhone, setSenderPhone] = useState('')

    const [sProvinceData, setSProvinceData] = useState(null)
    const [sDistrictData, setSDistrictData] = useState(null)
    const [sWardData, setSWardData] = useState(null)

    const [rRCode, setRRCode] = useState()
    const [rPCode, setRPCode] = useState()
    const [rDCode, setRDCode] = useState()
    const [rWCode, setRWCode] = useState()
    const [receiverName, setReceiverName] = useState('')
    const [receiverPhone, setReceiverPhone] = useState('')

    const [rProvinceData, setRProvinceData] = useState(null)
    const [rDistrictData, setRDistrictData] = useState(null)
    const [rWardData, setRWardData] = useState(null)

    const [type, setType] = useState('')

    const [shopRCode, setShopRCode] = useState()
    const [shopPCode, setShopPCode] = useState()
    const [shopDCode, setShopDCode] = useState()
    const [shopCommuneId, setShopCommuneId] = useState(0)

    const [shopProvinceData, setShopProvinceData] = useState(null)
    const [shopDistrictData, setShopDistrictData] = useState(null)
    const [shopCommuneData, setShopCommuneData] = useState(null)

    const handleSRegionChange = (e) => {
        setSRCode(e.target.value)
    }

    const handleSProvinceChange = (e) => {
        setSPCode(e.target.value)
    }

    const handleSDistrictChange = (e) => {
        setSDCode(e.target.value)
    }

    const handleSWardChange = (e) => {
        setSWCode(e.target.value)
    }

    const handleRRegionChange = (e) => {
        setRRCode(e.target.value)
    }

    const handleRProvinceChange = (e) => {
        setRPCode(e.target.value)
    }

    const handleRDistrictChange = (e) => {
        setRDCode(e.target.value)
    }

    const handleRWardChange = (e) => {
        setRWCode(e.target.value)
    }

    const handleShopRegionChange = (e) => {
        setShopRCode(e.target.value)
    }

    const handleShopProvinceChange = (e) => {
        setShopPCode(e.target.value)
    }

    const handleShopDistrictChange = (e) => {
        setShopDCode(e.target.value)
    }

    const handleShopCommuneChange = (e) => {
        setShopCommuneId(e.target.value)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/states/${sRCode}/provinces`, {
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = response.data.provinces;
                // Process data here
                setSProvinceData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [sRCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/provinces/${sPCode}/districts`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Thay thế token bằng token thực tế của bạn
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data.districts;
                // Xử lý dữ liệu tại đây
                setSDistrictData(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [sPCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/districts/${sDCode}/communes`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Thay thế token bằng token thực tế của bạn
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data.communes;
                // Xử lý dữ liệu tại đây
                setSWardData(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [sDCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/states/${rRCode}/provinces`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Thay thế token bằng token thực tế của bạn
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data.provinces;
                // Xử lý dữ liệu tại đây
                setRProvinceData(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [rRCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/provinces/${rPCode}/districts`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Thay thế token bằng token thực tế của bạn
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data.districts;
                // Xử lý dữ liệu tại đây
                setRDistrictData(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [rPCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/districts/${rDCode}/communes`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Thay thế token bằng token thực tế của bạn
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data.communes;
                // Xử lý dữ liệu tại đây
                setRWardData(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [rDCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/states/${shopRCode}/provinces`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Thay thế token bằng token thực tế của bạn
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data.provinces;
                // Xử lý dữ liệu tại đây
                setShopProvinceData(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [shopRCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/provinces/${shopPCode}/districts`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data.districts;
                // Xử lý dữ liệu tại đây
                setShopDistrictData(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [shopPCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/districts/${shopDCode}/communes`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data.communes;
                // Xử lý dữ liệu tại đây
                setShopCommuneData(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [shopDCode]);

    const handleInputChange = (e) => {
        switch (e.target.name) {
            case 'senderName':
                setSenderName(e.target.value);
                break;
            case 'senderPhone':
                setSenderPhone(e.target.value);
                break;
            case 'receiverName':
                setReceiverName(e.target.value);
                break;
            case 'receiverPhone':
                setReceiverPhone(e.target.value);
                break;
            case 'type':
                setType(e.target.value);
                break;
            case 'name':
                setName(e.target.value);
                break;
            case 'shippingFee':
                setShippingFee(e.target.value);
                break;
            case 'weight':
                setWeight(e.target.value);
                break;
            case 'fromDescription':
                setFromDescription(e.target.value);
                break;
            case 'toDescription':
                setToDescription(e.target.value)
                break;
            default:
                break
        }
    }

    const getAddress = async (regioncode, provincecode, districtcode) => {
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

            // Trả về province và district
            return district.name + ', ' + province.name;
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValidAll = false;
        let message = '';
        if (!isValidName(senderName)) {
            message = 'Tên người gửi không hợp lệ'
            isValidAll = false;
        } else if (!isValidPhoneNumber(senderPhone)) {
            message = 'Số điện thoại người gửi không hợp lệ'
            isValidAll = false;
        } else if (!isValidName(receiverName)) {
            message = 'Tên người nhận không hợp lệ'
            isValidAll = false;
        } else if (!isValidPhoneNumber(receiverPhone)) {
            message = 'Số điện thoại người nhận không hợp lệ'
            isValidAll = false;
        } else if (!(sRCode && sPCode && sDCode && sWCode &&
            rRCode && rPCode && rDCode && rWCode &&
            shopRCode && shopDCode && shopDCode && shopCommuneId)) {
            message = 'Thông tin địa chỉ bị thiếu';
            isValidAll = false;
        } else {
            message = 'Thông tin đã được xác nhận';
            isValidAll = true;
        }
        if (!isValidAll) {
            toast.error(message)
        } else {
            const sAddress = await getAddress(sRCode, sPCode, sDCode)
            const rAddress = await getAddress(rRCode, rPCode, rDCode)
            toast.success(message)
            let info = {
                fromCommuneId: Number(sWCode),
                toCommuneId: Number(rWCode),
                fromAddress: sAddress,
                toAddress: rAddress,
                fromPhone: senderPhone,
                toPhone: receiverPhone,
                fromName: senderName,
                toName: receiverName,
                fromShop: Number(shopId),
                toShop: Number(shopCommuneId),
                productType: type,
                name,
                fromDescription,
                toDescription,
                shippingFee: shippingFee,
                weight,
            }
            console.log(info, 'check info')
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.post(`${backendUrl}/deliveries`, info, config);

                const deliveryId = response.data.deliveryId;
                navigate(`/management/te-print`)
                dispatch(updateDeliveryId({ deliveryId }))
            } catch (error) {
                console.error('Lỗi khi gửi thông tin đơn hàng:', error);
            }
        }
    }

    return <>
        <div className='te-create-shipment'>
            <h2><b>Tạo đơn vận mới cho khách hàng</b></h2>
            <div><form onSubmit={(e) => handleSubmit(e)}>
                <div className='te-form-personal-info'>
                    <div className='te-form-sender'>
                        <h2>Thông tin người gửi</h2>
                        <div className='te-form-box'>
                            <div className='te-form-sender-info'>
                                <h3>Thông tin cá nhân</h3>
                                <label>Họ và tên</label><br></br>
                                <input name='senderName' type='text' onChange={(e) => handleInputChange(e)}></input><br></br>
                                <label>Số điện thoại người nhận</label><br></br>
                                <input name='senderPhone' type='text' onChange={(e) => handleInputChange(e)}></input><br></br>
                            </div>
                            <div className='te-form-sender-address'>
                                <h3>Điểm gửi</h3>
                                <label>Miền</label><br></br>
                                <select onChange={(e) => handleSRegionChange(e)}>
                                    <option value=''>Chọn miền</option>
                                    <option value={1}>Miền Bắc</option>
                                    <option value={2}>Miền Trung</option>
                                    <option value={3}>Miền Nam</option>
                                </select><br></br>
                                <label>Tỉnh/thành</label><br></br>
                                <select onChange={(e) => handleSProvinceChange(e)}>
                                    <option value=''>Chọn Tỉnh/thành</option>
                                    {
                                        (sProvinceData && sRCode) ? sProvinceData.map(province => <option value={province.provinceId}>{province.name}</option>) : <></>
                                    }
                                </select><br></br>
                                <label>Quận/Huyện</label><br></br>
                                <select onChange={(e) => handleSDistrictChange(e)}>
                                    <option value=''>Chọn Quận/Huyện</option>
                                    {
                                        (sDistrictData && sPCode && sRCode) ? sDistrictData.map(district => <option value={district.districtId}>{district.name}</option>) : <></>
                                    }
                                </select><br></br>
                                <label>Phường/Xã</label><br></br>
                                <select onChange={(e) => handleSWardChange(e)}>
                                    <option value=''>Chọn Phường/Xã</option>
                                    {
                                        (sWardData && sPCode && sRCode && sDCode) ? sWardData.map(ward => <option value={ward.communeId}>{ward.name}</option>) : <></>
                                    }
                                </select><br></br>
                            </div>
                        </div>
                    </div>
                    <div className='te-form-receiver'>
                        <h2>Thông tin người nhận</h2>
                        <div className='te-form-box'>
                            <div className='te-form-receiver-info'>
                                <h3>Thông tin cá nhân</h3>
                                <label>Họ và tên</label><br></br>
                                <input name='receiverName' type='text' onChange={(e) => handleInputChange(e)}></input><br></br>
                                <label>Số điện thoại người nhận</label><br></br>
                                <input name='receiverPhone' type='text' onChange={(e) => handleInputChange(e)}></input><br></br>
                            </div>
                            <div className='te-form-receiver-address'>
                                <h3>Điểm nhận</h3>
                                <label>Miền</label><br></br>
                                <select onChange={(e) => handleRRegionChange(e)}>
                                    <option value=''>Chọn miền</option>
                                    <option value={1}>Miền Bắc</option>
                                    <option value={2}>Miền Trung</option>
                                    <option value={3}>Miền Nam</option>
                                </select><br></br>
                                <label>Tỉnh/thành</label><br></br>
                                <select onChange={(e) => handleRProvinceChange(e)}>
                                    <option value=''>Chọn Tỉnh/thành</option>
                                    {
                                        (rProvinceData && rRCode) ? rProvinceData.map(province => <option value={province.provinceId}>{province.name}</option>) : <></>
                                    }
                                </select><br></br>
                                <label>Quận/Huyện</label><br></br>
                                <select onChange={(e) => handleRDistrictChange(e)}>
                                    <option value=''>Chọn Quận/Huyện</option>
                                    {
                                        (rDistrictData && rPCode && rRCode) ? rDistrictData.map(district => <option value={district.districtId}>{district.name}</option>) : <></>
                                    }
                                </select><br></br>
                                <label>Phường/Xã</label><br></br>
                                <select onChange={(e) => handleRWardChange(e)}>
                                    <option value=''>Chọn Phường/Xã</option>
                                    {
                                        (rWardData && sPCode && sRCode && sDCode) ? rWardData.map(ward => <option value={ward.communeId}>{ward.name}</option>) : <></>
                                    }
                                </select><br></br>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='te-form-shipment-info'>
                    <div className='te-form-shipment-info-1'>
                        <h2>Thông tin chi tiết đơn vận</h2>
                        <div className='te-form-shipment-big-box'>
                            <div className='te-form-shipment-1'>
                                <h4>Loại hàng</h4>
                                <select name='type' value={type} onChange={handleInputChange}>
                                    <option value={''}>-- Chọn loại --</option>
                                    <option value={'DOCUMENT'}>Tài liệu</option>
                                    <option value={'PRODUCT'}>Hàng hóa</option>
                                </select><br></br>
                                <label>Tên đơn vận: </label><br></br>
                                <input type='text' name='name' onChange={handleInputChange}></input><br></br>
                                <label>Mô tả ở điểm đi: </label><br></br>
                                <input type='textarea' name='fromDescription' onChange={handleInputChange}></input><br></br>
                                <label>Mô tả khi nhận: </label><br></br>
                                <input type='textarea' name='toDescription' onChange={handleInputChange}></input><br></br>
                                <label>Phí: </label><br></br>
                                <input type='number' name='shippingFee' onChange={handleInputChange}></input><br></br>
                                <label>Cân nặng (kg): </label><br></br>
                                <input type='number' name='weight' onChange={handleInputChange}></input><br></br>
                            </div>
                        </div>
                    </div>
                    <div className='te-form-shipment-info-2'>
                        <h2>Xác nhận điểm giao dịch đầu và cuối</h2>
                        <div className='te-confirm-offices-box'>
                            <label>Điểm giao dịch cuối</label><br></br><br></br>
                            <label>Miền</label><br></br>
                            <select onChange={(e) => handleShopRegionChange(e)}>
                                <option value=''>Chọn miền</option>
                                <option value={1}>Miền Bắc</option>
                                <option value={2}>Miền Trung</option>
                                <option value={3}>Miền Nam</option>
                            </select><br></br>
                            <label>Tỉnh/thành</label><br></br>
                            <select onChange={(e) => handleShopProvinceChange(e)}>
                                <option value=''>Chọn Tỉnh/thành</option>
                                {
                                    (shopProvinceData && shopRCode) ? shopProvinceData.map(province => <option value={province.provinceId}>{province.name}</option>) : <></>
                                }
                            </select><br></br>
                            <label>Quận/Huyện</label><br></br>
                            <select onChange={(e) => handleShopDistrictChange(e)}>
                                <option value=''>Chọn Quận/Huyện</option>
                                {
                                    (shopDistrictData && shopPCode && shopRCode) ? shopDistrictData.map(district => <option value={district.districtId}>{district.name}</option>) : <></>
                                }
                            </select><br></br>
                            <label>Phường/Xã</label><br></br>
                            <select onChange={(e) => handleShopCommuneChange(e)}>
                                <option value=''>Chọn Phường/Xã</option>
                                {
                                    (shopCommuneData && shopPCode && shopRCode && shopDCode) ? shopCommuneData.map(ward => <option value={ward.communeId}>{ward.name}</option>) : <></>
                                }
                            </select><br></br>
                        </div>
                    </div>
                </div>
                <input className='te-form-submit' type='submit' value={'Xác nhận thông tin đơn vận'} onClick={handleSubmit}></input><br></br>
            </form></div>
        </div>
    </>
}

export default TECreateShipment