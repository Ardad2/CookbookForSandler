import { createSlice } from '@reduxjs/toolkit';

const behaviorLogsSlice = createSlice({
    name: 'behaviorLogs',
    initialState: {
        behaviorLogs: [],   
    },

    reducers: {
        addBehavior: (state, action) => {
            state.behaviorLogs.push(action.payload);
        },
        removeBehavior: (state, action) => {
            state.behaviorLogs.splice(state.behaviorLogs.indexOf(action.payload.id), 1);

        }
    }
});

export const addBehavior = behaviorLogsSlice.actions.addBehavior;
export const removeBehavior = behaviorLogsSlice.actions.removeBehavior;
export default behaviorLogsSlice.reducer;

