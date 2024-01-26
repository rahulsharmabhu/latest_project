// ** Store Imports

import { useDispatch, useSelector } from 'react-redux'
import { selectCamera, closedetectionDialog } from '../fire-detection/fireCameraSlice'

export const useOnCameraClickState = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => {
        return state.camera
    })

    const setCameraClickState = (obj) => {
        dispatch(selectCamera(obj))
    }

    const setCameraStateEmpty = () => {
        dispatch(closedetectionDialog())
    }

    return { selectedCamera: store?.selectedCamera, setCameraClickState, setCameraStateEmpty}
}

