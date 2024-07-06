import './Page.scss'
import Home from '../pages/Home';
import { Route, Routes } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Login from '../pages/Login';
import NotLogged from './auth-component/NotLogged';
import Offices from '../pages/CEO/Offices/Offices';
import CEO from './auth-component/CEO';
import CreateAccount from '../pages/CEO/CreateAcc/CreateAccount';
import TradingEmp from './auth-component/TradingEmp';
import TECreateShipment from '../pages/TradingEmp/CreateShipment/Create/TECreateShipment';
import PostHead from './auth-component/PostHead';
import PHCreateAccount from '../pages/PostHead/CreateAcc/PHCreateAccount';
import TEDetail from '../pages/TradingEmp/CreateShipment/Detail/TEDetail';
import TENext from '../pages/TradingEmp/InShopDeliveries/Detail/TENext'
import TEReceive from '../pages/TradingEmp/InShopDeliveries/All/TEReceive';
import TEComing from '../pages/TradingEmp/ComingDeliveries/All/TEComing';
import WHCreateAccount from '../pages/WarehouseHead/CreateAcc/WHCreateAccount';
import WarehouseHead from './auth-component/WarehouseHead';
import TEConfirmReceive from '../pages/TradingEmp/ComingDeliveries/Detail/TEConfirmReceive';
import TEInShop from '../pages/TradingEmp/GoingToShipping/All/TEInShop';
import TEShipToCus from '../pages/TradingEmp/GoingToShipping/PostDetail/TEShipToCus';
import TEShipping from '../pages/TradingEmp/ShippingDeliveries/All/TEShipping';
import TEConfirmShipping from '../pages/TradingEmp/ShippingDeliveries/Detail/TEConfirmShipping';
import TEAfter from '../pages/TradingEmp/AfterShipping/All/TEAfter';
import DetailOffice from '../pages/CEO/DetailOffice/DetailOffice';
import Accounts from '../pages/CEO/Accounts/Accounts';
import DetailAccount from '../pages/CEO/DetailAcc/DetailAccount';
import Deliveries from '../pages/CEO/Deliveries/Deliveries';
import TEWNext from '../pages/TradingEmp/GoingToShipping/WarehouseDetail/TEWNext';
import Account from '../pages/Account';
import NeedLogged from '../component/auth-component/NeedLogged'
import PHAccounts from '../pages/PostHead/Accounts/PHAccounts';
import PHDetailAccount from '../pages/PostHead/DetailAcc/PHDetailAccount';
import PHDetailOffice from '../pages/PostHead/DetailOffice/PHDetailOffice';
import WHDetailOffice from '../pages/WarehouseHead/DetailOffice/WHDetailOffice';
import WHDetailAccount from '../pages/WarehouseHead/DetailAccount/WHDetailAccount';
import WHAccounts from '../pages/WarehouseHead/Accounts/WHAccounts';
import PostEmp from './auth-component/PostEmp';
import Detail from '../pages/Detail'

import { selectExpiredAt, logout } from '../app/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import DeliveryDetail from '../pages/CEO/DeliveryDetail/DeliveryDetail';
import PHDeliveries from '../pages/PostHead/Deliveries/PHDeliveries';
import ModifyAccount from '../pages/CEO/ModifyAcc/ModifyAccount';
import PHModifyAccount from '../pages/PostHead/ModifyAcc/PHModifyAccount';
import GuestHome from '../pages/Guest/Home/GuestHome';
import { selectIsGuest } from '../app/guestSlice';
import GuestSearch from '../pages/Guest/Search/GuestSearch';
import WHDeliveries from '../pages/WarehouseHead/Deliveries/WHDeliveries';
import TEAllPrint from '../pages/TradingEmp/Print/All/TEAllPrint';
import TEPrint from '../pages/TradingEmp/Print/Detail/TEPrint';
import WHModifyAccount from '../pages/WarehouseHead/ModifyAcc/WHModifyAccount';

const Page = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const expiredAt = useSelector(selectExpiredAt);

    useEffect(() => {
        if (expiredAt) {
            const intervalId = setInterval(() => {
                var expiredTime = new Date(expiredAt);
                const currentTime = new Date();
                if (expiredTime < currentTime) {
                    dispatch(logout({}))
                    navigate('/management/login')
                    toast.success('Hết thời hạn đăng nhập, mời bạn đăng nhập lại')
                }
            }, 10000);

            // Hủy bỏ setInterval khi component unmount
            return () => clearInterval(intervalId);
        }
    }, [expiredAt])

    const isGuest = useSelector(selectIsGuest)

    return <>
        <div className='page'>
            <div className='page-box'>
                <Routes>
                    {isGuest && <><Route path='/' element={<GuestHome />}></Route>
                        <Route path='/search' element={<GuestSearch />}></Route></>}
                    {!isGuest && <><Route path='/management/' element={<Home />}></Route>
                        <Route path='/management/login' element={<NotLogged><Login /></NotLogged>}></Route>
                        <Route path='/management/account' element={<NeedLogged><Account /></NeedLogged>}></Route>
                        <Route path='/management/detail' element={<Detail />}></Route>

                        {/* CEO */}
                        <Route path='/management/offices' element={<CEO><Offices /></CEO>}></Route>
                        <Route path='/management/detail-office' element={<CEO><DetailOffice /></CEO>}></Route>
                        <Route path='/management/create-account' element={<CEO><CreateAccount /></CEO>}></Route>
                        <Route path='/management/accounts' element={<CEO><Accounts /></CEO>}></Route>
                        <Route path='/management/detail-account' element={<CEO><DetailAccount /></CEO>}></Route>
                        <Route path='/management/deliveries' element={<CEO><Deliveries /></CEO>}></Route>
                        <Route path='/management/delivery-detail' element={<CEO><DeliveryDetail /></CEO>}></Route>
                        <Route path='/management/modify-account' element={<CEO><ModifyAccount /></CEO>}></Route>

                        {/* TradingEmp */}
                        <Route path='/management/te-create-shipment' element={<PostEmp><TECreateShipment /></PostEmp>}></Route>
                        <Route path='/management/te-detail' element={<PostEmp><TEDetail /></PostEmp>}></Route>
                        <Route path='/management/te-shipping' element={<PostEmp><TEShipping /></PostEmp>}></Route>
                        <Route path='/management/te-confirm-shipping' element={<PostEmp><TEConfirmShipping /></PostEmp>}></Route>
                        <Route path='/management/te-after' element={<PostEmp><TEAfter /></PostEmp>}></Route>
                        <Route path='/management/te-all-print' element={<PostEmp><TEAllPrint /></PostEmp>}></Route>
                        <Route path='/management/te-print' element={<PostEmp><TEPrint /></PostEmp>}></Route>

                        <Route path='/management/te-receive' element={<TradingEmp><TEReceive /></TradingEmp>}></Route>
                        <Route path='/management/te-next' element={<TradingEmp><TENext /></TradingEmp>}></Route>
                        <Route path='/management/te-w-next' element={<TradingEmp><TEWNext /></TradingEmp>}></Route>
                        <Route path='/management/te-coming' element={<TradingEmp><TEComing /></TradingEmp>}></Route>
                        <Route path='/management/te-confirm-receive' element={<TradingEmp><TEConfirmReceive /></TradingEmp>}></Route>
                        <Route path='/management/te-inshop' element={<TradingEmp><TEInShop /></TradingEmp>}></Route>
                        <Route path='/management/te-shiptocus' element={<TradingEmp><TEShipToCus /></TradingEmp>}></Route>

                        {/* PostHead */}
                        <Route path='/management/ph-create-account' element={<PostHead><PHCreateAccount /></PostHead>}></Route>
                        <Route path='/management/ph-accounts' element={<PostHead><PHAccounts /></PostHead>}></Route>
                        <Route path='/management/ph-detail-account' element={<PostHead><PHDetailAccount /></PostHead>}></Route>
                        <Route path='/management/ph-detail-office' element={<PostHead><PHDetailOffice /></PostHead>}></Route>
                        <Route path='/management/ph-deliveries' element={<PostHead><PHDeliveries /></PostHead>}></Route>
                        <Route path='/management/ph-modify-account' element={<PostHead><PHModifyAccount /></PostHead>}></Route>

                        {/* WarehouseHead */}
                        <Route path='/management/wh-create-account' element={<WarehouseHead><WHCreateAccount /></WarehouseHead>}></Route>
                        <Route path='/management/wh-accounts' element={<WarehouseHead><WHAccounts /></WarehouseHead>}></Route>
                        <Route path='/management/wh-detail-account' element={<WarehouseHead><WHDetailAccount /></WarehouseHead>}></Route>
                        <Route path='/management/wh-detail-office' element={<WarehouseHead><WHDetailOffice /></WarehouseHead>}></Route>
                        <Route path='/management/wh-deliveries' element={<WarehouseHead><WHDeliveries /></WarehouseHead>}></Route>
                        <Route path='/management/wh-modify-account' element={<WarehouseHead><WHModifyAccount /></WarehouseHead>}></Route>
                    </>}
                </Routes>
                <Toaster toastOptions={{
                    style: {
                        background: 'black',
                        color: 'white',
                    }
                }} />
            </div>
        </div>
    </>
}

export default Page;