// ** Store Imports

import { useSelector, useDispatch } from 'react-redux'
import { addEsmChartState, removeEsmChartState } from '../esm/esmSlice'

export const useEsmChartData = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => { return state.esm })

    const setEsmChartData = (obj) => {
        dispatch(addEsmChartState(obj))
    }

    const removeEsmChartData = (obj) => {
        dispatch(removeEsmChartState(obj))
    }

    return { esmDataState: store?.chartDataState, setEsmChartData, removeEsmChartData }
}