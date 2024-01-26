// ** Store Imports

import { useSelector, useDispatch } from 'react-redux'
import { setImageViewer } from '../fire-detection/fireCameraSlice'

export const useCameraData = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => {return state.camera})

    const openImageViewer = (obj) => {
        dispatch(setImageViewer(obj))
    }

    return { cameraState: store?.cameradata, imagesState: store?.imagesdata, detectiontypeState: store?.detectiontype, imageViewer : store?.imageViewer, openImageViewer }
}