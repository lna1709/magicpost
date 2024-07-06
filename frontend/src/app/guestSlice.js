import { createSlice } from '@reduxjs/toolkit';

export const guestSlice = createSlice({
    name: 'guest',
    initialState: {
        isGuest: true
    },
    reducers: {
        trueGuest: (state) => {
            state.isGuest = true;
        },
        falseGuest: (state) => {
            state.isGuest = false;
            console.log('c')
        }
    },
});

export const { trueGuest, falseGuest } = guestSlice.actions;

export const selectIsGuest = (state) => state.guest.isGuest

export default guestSlice.reducer;
