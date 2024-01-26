// ** Store Imports

import { useDispatch, useSelector } from 'react-redux'
import { handleRibbonClickState } from '../ribbon/ribbonSlice'

export const useOnRibbonClickState = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => {
    return state.ribbon
  })

  const setRibbonClickState = (obj) => {
    dispatch(handleRibbonClickState(obj))
  }

  return { ribbonState: store?.ribbonState, setRibbonClickState }
}


