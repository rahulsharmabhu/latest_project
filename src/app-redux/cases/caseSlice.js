import { createSlice } from '@reduxjs/toolkit';

const caseConfig = null;

const caseSlice = createSlice({
    name: 'case',
    initialState: {
        caseState: caseConfig
    },
    reducers: {
        handleCaseSelectState: (state, action) => {
            state.caseState = action.payload
        },
        closeCase : (state, action) => {
            state.caseState = caseConfig
        }
    }, 
});

export const { resetErrorAction, handleCaseSelectState, closeCase } = caseSlice.actions;
export default caseSlice.reducer;
