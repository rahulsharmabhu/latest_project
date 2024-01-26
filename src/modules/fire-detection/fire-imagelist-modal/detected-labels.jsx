import {XCircle} from 'react-feather'
const DetectedLabels = ({setDetections, detections, cameraId, imageId }) => {

   let filterData = []
   const removeSelectedLabels = (cameraId, imageId, detec) => {     
    filterData = detections
    const result = filterData.findIndex(res => res.cameraId === cameraId && res.imageId === imageId && res.detec.id === detec.id)
    filterData.splice(result, 1)
    setDetections((finalval) => [...finalval, filterData])
  }
  
  return (
    <>
     {detections.length > 0 && detections.filter((labels) => labels.cameraId === cameraId && labels.imageId === imageId).map((res) => (
              <div className="detection_wrapper" key={res.detec.id}>
                {res.detec.title}
                <XCircle onClick={() => removeSelectedLabels(cameraId, imageId, res.detec)} size={15} />
              </div>
      ))}
    </>
  )
}

export default DetectedLabels
