import { useState } from 'react';
import './Login.scss'
import toast from 'react-hot-toast';
import axios from 'axios';
import { login, updateToken } from '../app/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const backendUrl = process.env.REACT_APP_BACKEND_URL

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChange = (e) => {
        switch (e.target.name) {
            case 'username':
                setUsername(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username) {
            toast.error('Không được để trống username')
        } else if (!password) {
            toast.error('Không được để trống mật khẩu')
        } else {
            await loginWithApi(`${backendUrl}/accounts/token`, `${backendUrl}/accounts/profile`, username, password)
                .then(data => {
                    console.log(data);
                    if (!data || !data.success) {
                        toast.error(data.error)
                    } else {
                        // Dispatch updateToken action
                        const token = data.token;
                        const expiredAt = data.expiredAt
                        dispatch(updateToken({ token, expiredAt }));

                        toast.success('Đăng nhập thành công')
                        const account = data.account // account information from the second API

                        // Dispatch login action
                        dispatch(login({ account }))
                        navigate('/management/')
                    }
                });
        }
    }

    async function loginWithApi(url, authUrl, username, password) {
        const data = {
            username,
            password,
        };

        try {
            // Gửi POST request để nhận token
            const tokenResponse = await axios.post(`${url}`, data);
            const token = tokenResponse.data.token;
            const expiredAt = tokenResponse.data.expiredAt;

            // if (!token) {
            //     throw new Error('Không thể nhận token!');
            // }
            // Sử dụng token trong header của GET request
            const response = await axios.get(`${authUrl}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (response) {
                return {
                    success: true,
                    account: response.data,
                    token: tokenResponse.data.token,
                    expiredAt: tokenResponse.data.expiredAt // Trả về tài khoản hợp lệ đầu tiên
                };
            } else {
                throw new Error('Không thể nhận thông tin tài khoản!');
            }
        } catch (error) {
            console.error(error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    //------------------------------

    return <>
        <div className="login">
            <div className='login-box'>
                <h3>Đăng nhập vào Magic Post</h3>
                <form className='login-form' onSubmit={(e) => handleLogin(e)}>
                    <input type='text' name='username' placeholder='Nhập username' onChange={(e) => handleInputChange(e)}></input>
                    <input type='password' name='password' placeholder='Nhập mật khẩu' onChange={(e) => handleInputChange(e)}></input>
                    <input type='submit' value={'Đăng nhập'} className='login-submit'></input>
                </form>
            </div>
        </div>
    </>
}

export default Login;