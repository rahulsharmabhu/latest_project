// ** Store Imports

import { useDispatch, useSelector } from 'react-redux'
import { handleVideoClickState } from '../video/videoSlice'

export const useOnVideoClickState = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => {
    return state.video
  })

  const setVideoClickState = (obj) => {
    dispatch(handleVideoClickState(obj))
  }

  return { videoState: store?.videoState, setVideoClickState }
}


