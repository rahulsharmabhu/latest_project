// ** Store Imports

import { useDispatch, useSelector } from 'react-redux'
import { handleDownloadClickState } from '../common/commonSlice'

export const useOnDownloadClickState = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => {
    return state.common
  })

  const setDownloadClickState = (obj) => {
    // resetAngleState()
    dispatch(handleDownloadClickState(obj))
  }

  return { downloadState: store?.downloadState, setDownloadClickState }
}


