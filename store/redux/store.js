import { configureStore } from '@reduxjs/toolkit';

import behaviorLogsReducer from './behaviorLogs';
import usersReducer from './users';
import authTokensReducer from './authTokens';

export const store = configureStore({
    reducer: {
        behaviorLogs: behaviorLogsReducer,
        users: usersReducer,
        authTokens: authTokensReducer
    }
});
