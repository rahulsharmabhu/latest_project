// ** Store Imports

import { useDispatch, useSelector } from 'react-redux'
import { handleAngleClickState } from '../angle/angleSlice'

export const useOnAngleClickState = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => {
    return state.angle
  })

  // const resetAngleState = () => {
  //   handleAngleClickState(0)
  // }

  const setAngleClickState = (obj) => {
    dispatch(handleAngleClickState(obj))
  }

  return { angleState: store?.angleState, setAngleClickState }
}


