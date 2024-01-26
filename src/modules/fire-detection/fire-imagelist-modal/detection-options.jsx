import { Check } from "react-feather"
import { useEffect } from "react"
import { useCameraData } from "../../../app-redux/hooks/useCameraData"

const DetectionOptions = ({
  cameraId,
  handleDetection,
  imageId,
  showMoreop,
  showMoreOpCam,
  detectionLabels,
  detections
}) => {


  const { detectiontypeState : detectiontype } = useCameraData()

  const detectVal = (imageId, detecId) => {
    const result = detections.find(value => value.imageId === imageId && value.detec.id === detecId)
    return result ? result.imageId : undefined
  }

  const detectValCam = (cameraId, detecId) => {
    const result = detections.find(value => value.cameraId === cameraId && value.detec.id === detecId)
    return result ? result.cameraId : undefined
  }

  const handleDetectionData = (detec, cameraId) => {
    // const resultdata = detectionLabels.map(val => parseInt(val))
    handleDetection(detec, cameraId, detectionLabels)
  }

  return (
    <>
      {showMoreop !== undefined ? showMoreop.options && showMoreop.imageId === imageId && (
        <div>
          <ul>
            {detectiontype?.map((detec) => (
                <li
                  key={detec.id}
                  onClick={() => handleDetection(detec, cameraId, imageId)}
                >
                {detectVal(imageId, detec.id) === imageId && <Check size={17}/>}
                {detec.title}
                </li>
            ))}
          </ul>
        </div>
      ) : null }

      {showMoreOpCam !== undefined ? showMoreOpCam.options && showMoreOpCam.cameraId === cameraId && (
         <div>
         <ul>
           {detectiontype?.map((detec) => (
               <li
                 key={detec.id}
                 onClick= {() => handleDetectionData(detec, cameraId)}
               >
               {detectValCam(cameraId, detec.id) === cameraId && <Check size={17}/>}
               {detec.title}
               </li>
           ))}
         </ul>
       </div>
      ) : null }

    </>
  )
}

export default DetectionOptions
