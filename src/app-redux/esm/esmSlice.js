import { createSlice } from "@reduxjs/toolkit";

const chartData = [];

const esmSlice = createSlice({
    name: 'esm-chart',
    initialState: {
        chartDataState: chartData
    },
    reducers: {
        addEsmChartState: (state, action) => {
            // state.fireAlertState = action.payload
            state.chartDataState.push(action.payload)
        },
        removeEsmChartState: (state, action) => {
            const pos = state.chartDataState.findIndex(x => x.id === action.payload);
            if (pos >= 0) {
                state.chartDataState.splice(pos, 1)
            }
        }
    },
});

export const { addEsmChartState, removeEsmChartState } = esmSlice.actions;
export default esmSlice.reducer;
