import { createSlice } from "@reduxjs/toolkit";

const fireAlerts = [];

const fireAlertSlice = createSlice({
    name: 'fire-alert',
    initialState: {
        fireAlertState : fireAlerts
    },
    reducers: {
        addFireAlertsState : (state, action) => {
            // state.fireAlertState = action.payload
            state.fireAlertState.push(action.payload)
        }
    },
});

export const { addFireAlertsState } = fireAlertSlice.actions;
export default fireAlertSlice.reducer;
