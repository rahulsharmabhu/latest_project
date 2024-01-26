import { useDispatch, useSelector } from 'react-redux'
import { handleNewTabClickState } from '../tab/newTabSlice'

export const useOnNewTabClickState = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => {
    return state.tab
  })

  const setNewTabClickState = (obj) => {
    dispatch(handleNewTabClickState(obj))
  }

  return { newTabState: store?.newTabState, setNewTabClickState }
}


