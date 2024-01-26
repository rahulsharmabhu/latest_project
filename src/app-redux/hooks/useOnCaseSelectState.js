// ** Store Imports

import { useDispatch, useSelector } from 'react-redux'
import { handleCaseSelectState, closeCase } from '../cases/caseSlice'

export const useOnCaseSelectState = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => {
        return state.case
    })

    const setCaseSelectState = (obj) => {
        dispatch(handleCaseSelectState(obj))
    }

    const setCaseStateEmpty = () => {
        dispatch(closeCase())
    }

    return { caseState: store?.caseState, setCaseSelectState, setCaseStateEmpty}
}

