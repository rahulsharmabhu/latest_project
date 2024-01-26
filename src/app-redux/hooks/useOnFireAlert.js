// ** Store Imports

import { useDispatch, useSelector } from 'react-redux'
import { addFireAlertsState } from '../fire-detection/fireAlertSlice'

export const useOnFireAlert = () => {

    const dispatch = useDispatch()
    const store = useSelector(state => {return state.fire})

    const setFireAlertNotificationState = (obj) => {
        dispatch(addFireAlertsState(obj))
    }

    return { fireAlertState: store?.fireAlertState , setFireAlertNotificationState}
}