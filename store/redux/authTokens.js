import { createSlice } from '@reduxjs/toolkit';

const authTokensSlice = createSlice({
    name: 'authTokens',
    initialState: {
        data: [
            {
                token: '',
                isAuthenticated: false,
                email: ''
            }
        ],   
    },

    reducers: {
        authenticate: (state, action) => {
            state.data[0] = ({token: action.payload.token, isAuthenticated: true, email: action.payload.email});
        },

        logout: (state, action) => {
            state.data[0] = ({token: '', isAuthenticated: false, email: ''});

        },
        refreshHome: (state, action) => {
        }
    }
});

export const authenticateAuthTokens = authTokensSlice.actions.authenticate;
export const logoutAuthTokens = authTokensSlice.actions.logout;
export default authTokensSlice.reducer;
