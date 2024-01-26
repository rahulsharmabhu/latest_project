import React, { useEffect, useState } from 'react'
import EsriMap from '../../../components/map/esriMap'
import { useCameraData } from '../../../app-redux/hooks/useCameraData'
// import {
//   fetchCameras,
//   STATUSES,
//   selectCamera
// } from "../../../app-redux/fire-detection/fireCameraSlice"

const FireMap = () => {
  const [currentCamera, setcurrentCamera] = useState(null)
  const [zoom, setZoom] = useState(2)
  const [center, setCenter] = useState([-70, 25])
  // const [cameradata, setCameradata] = useState([])
  const { cameraState } = useCameraData()
  
  const cameradata = [
    {
        id: 1,
        camera_name: "brisbane",
        bearings: 0,
        elevation: 0,
        latitude: -27.470125,
        longitude: 153.021072,
        ControlComment: "control comment",
        camera_status: true,
        camera_control: false,
        camera_control_comment: "control comment",
        detections: [
            {
                detectionId: 9294,
                confidenceScore: 0.93,
                detectionTime: "2023-02-03T05:31:12.473",
                notificationTime: "2023-02-03T16:31:05.387",
                frameId: 13717
            },
            {
                detectionId: 9295,
                confidenceScore: 0.93,
                detectionTime: "2023-02-03T05:31:13.88",
                notificationTime: "2023-02-03T16:31:13.803",
                frameId: 13717
            }
        ]
    }
]
  useEffect(() => {
    setcurrentCamera(null) // needs to be removed
    // dispatch(fetchCameras())
}, [])

// const selectCameraOnClick = (camera) => {
//     if (zoom < 4) {
//         setZoom(4)
//     } else {
//         setZoom(zoom)
//     }
//     setCenter([camera.latitude, camera.longitude])
//     // dispatch(selectCamera(camera))
// }

  return (
    <div>
      <EsriMap cameradata={cameradata} setcurrentCamera={setcurrentCamera} zoom={zoom} center={center} />
    </div>
  )
}

export default FireMap