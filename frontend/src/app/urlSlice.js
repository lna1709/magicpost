import { createSlice } from '@reduxjs/toolkit';

export const urlSlice = createSlice({
    name: 'url',
    initialState: {
        deliveryId: '',
        shopId: '',
        username: '',
        role: '',
    },
    reducers: {
        updateDeliveryId: (state, action) => {
            const { deliveryId } = action.payload;
            console.log('w')
            state.deliveryId = deliveryId
        },
        updateShopId: (state, action) => {
            const { shopId } = action.payload;
            state.shopId = shopId
        },
        updateUsername: (state, action) => {
            const { username } = action.payload;
            state.username = username
        },
        updateRole: (state, action) => {
            const { role } = action.payload;
            state.role = role
        },
        deleteAll: (state) => {
            state.deliveryId = ''
            state.shopId = ''
            state.username = ''
            state.role = ''
        }
    },
});

export const { updateDeliveryId, updateRole, updateShopId, updateUsername, deleteAll } = urlSlice.actions;

export const selectDeliveryId = (state) => state.url.deliveryId

export const selectShopId = (state) => state.url.shopId

export const selectUsername = (state) => state.url.username

export const selectRole = (state) => state.url.role

export default urlSlice.reducer;
