import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: false,
        accessToken: null,
        typeToken: null,
        avatar: null,
        admin: {},
    },
    reducers: {
        login: (state, response) => {
            state.admin = response.payload.data;
            state.accessToken = response.payload.access_token;
            state.typeToken = response.payload.type_token;
            state.avatar = response.payload.avatar;
            state.isLogin = true;
        },

    },
})

export const { login } = authSlice.actions;

export default authSlice.reducer;