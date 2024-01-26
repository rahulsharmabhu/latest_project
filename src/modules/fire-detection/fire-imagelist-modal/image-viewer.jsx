import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Button
  } from "reactstrap"
  import DetectedLabels from "./detected-labels"
  // import ImageAnnotator from "./ImageAnnotator"
  import { Edit, Bell, Clock, Maximize2, Minimize2 } from "react-feather"
  // import PerfectScrollbar from "react-perfect-scrollbar"
  // import DetectionDialog from "././DetectionDialog"
  import { useState } from "react"
  // import { useState } from "react"
  import { useCameraData } from "../../../app-redux/hooks/useCameraData"
  
  const ImageViewer = ({ detections, setDetections }) => {
  
    const { imagesState, imageViewer, openImageViewer } = useCameraData()
    const items = imagesState
    let selectImage
    if (Array.isArray(items) && items.length > 0) {
      const resultData = items.find(val => val.cameraId === imageViewer.cameraId)
      selectImage = resultData?.items.find((val) => val.id === imageViewer.imageId)
    } else {
      selectImage = items.items?.find((value) => value.id === imageViewer.imageId)
    }
  
    const toggleImage = (imageId, cameraId) => {
      const status = imageViewer.status
      openImageViewer({ status, cameraId, imageId })
    }
  
    const [dialogStatus, setDialogStatus] = useState(false)
    const [imageSize, setImageSize] = useState(false)
  
    const toggleModalSize = () => {
      setImageSize(!imageSize)
    }
  
    return (
      <>
        <Modal
          isOpen={imageViewer.status}
          toggle={() => toggleImage(imageViewer.imageId, imageViewer.cameraId)}
          className={imageSize ? "modal-dialog-centered image_viewer_wrapper modal-xl" : "modal-dialog-centered  image_viewer_wrapper modal-lg"}
        >
          <ModalHeader className="d-flex" toggle={() => toggleImage(imageViewer.imageId, imageViewer.cameraId)}>
            {/* {selectImage?.title} */}
            <div className="camera_name">#{imageViewer.cameraId}</div>
            <div className="maximize_image">
              <Button color='gradient-secondary' onClick={toggleModalSize} size='sm'>
               {imageSize ? <Minimize2 size={16}/> : <Maximize2 size={16}/> }
              </Button>
            </div>
          </ModalHeader>
          {/* <PerfectScrollbar options={{ wheelPropagation: true }} style={{ maxHeight: "500px" }}> */}
            <ModalBody className="firedetection_image_viewer_wrapper">
              <div className="show_detections_image_viewer">
                <DetectedLabels
                  cameraId={imageViewer.cameraId}
                  imageId={imageViewer.imageId}
                  detections={detections}
                  setDetections={setDetections}
                />
              </div>
             { /* <image src={selectImage?.imageUrl} detections={selectImage?.detections} imageId={imageViewer.imageId} dialogStatus={dialogStatus} setDialogStatus={setDialogStatus} cameraId={imageViewer.cameraId}/> */}
             <img src={selectImage?.image} alt="Image" width={765} height={500}/>
            </ModalBody>
          {/* </PerfectScrollbar> */}
          <ModalFooter>
            <div className="alert_section d-flex">
              <div className="alert_time">
                <Bell size={16} /><span>12:00 A.M</span>
              </div>
              <div className="current_time">
                <Clock size={16} /> <span>01:00 P.M </span>
              </div>
            </div>
            <div className="analyse_section">
              <Button color='gradient-secondary' size='sm'><Edit size={15} />Analyse</Button>
              {!imageSize && <Button color='gradient-primary' size='sm' onClick={() => setDialogStatus(!dialogStatus)}>SUBMIT</Button> }
            </div>
          </ModalFooter>
          {/* dialougue modal starts */}
          {/* <DetectionDialog detectedimg={selectImage?.imageUrl} cameraId={cameraId} imageId={imageId} dialogStatus={dialogStatus} setDialogStatus={setDialogStatus} /> */}
          {/* dialogue modal ends */}
        </Modal>
      </>
    )
  }
  
  export default ImageViewer