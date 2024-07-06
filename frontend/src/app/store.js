import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import guestReducer from './guestSlice'
import CryptoJS from 'crypto-js';
import urlReducer from './urlSlice';

const SECRET_KEY = 'my-secret-key';

const saveToLocalStorage = (state) => {
    try {
        const serialisedState = JSON.stringify(state);
        const encryptedState = CryptoJS.AES.encrypt(serialisedState, SECRET_KEY).toString();
        localStorage.setItem('state', encryptedState);
    } catch (e) {
        console.warn(e);
    }
}

const loadFromLocalStorage = () => {
    try {
        const encryptedState = localStorage.getItem('state');
        if (encryptedState === null) return undefined;
        const bytes = CryptoJS.AES.decrypt(encryptedState, SECRET_KEY);
        const originalState = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(originalState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

const store = configureStore({
    reducer: {
        auth: authReducer,
        guest: guestReducer,
        url: urlReducer
    },
    preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;