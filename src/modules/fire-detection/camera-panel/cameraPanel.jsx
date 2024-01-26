import {
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  Button,
  Row,
  Col,
  Badge,
  UncontrolledTooltip
} from "reactstrap"
// import { useSelector, useDispatch } from "react-redux"
// import { openImageViewer } from "../../redux/firedetectionSlice"
import PerfectScrollbar from "react-perfect-scrollbar"
import { Home, Camera, Image, HelpCircle, Target, Clock, Bell, Link2, Map, Circle } from 'react-feather'
import moment from 'moment'
import { useSkin } from "../../../app-redux/hooks/useSkin"
import { useEffect, useState } from "react"
import { useOnCameraClickState } from "../../../app-redux/hooks/useOnCameraClickState"
import { useOnRibbonClickState } from "../../../app-redux/hooks/useOnRibbonClickState"
import { useOnNewTabClickState } from "../../../app-redux/hooks/useOnNewTabClickState"

const CameraPanel = () => {

    const [selectedCameraFinal, setSelectedCameraFinal] = useState(null)
    const { selectedCamera } = useOnCameraClickState();
    const { setNewTabClickState } = useOnNewTabClickState();
    const { ribbonState } = useOnRibbonClickState();


  const handleLocation = () => {
    // setCameraPanel(!cameraPanel)
    selectCameraOnClick(selectedCamera)
  }
  const { skin } = useSkin()
  // useSelector((state) => state.firedetection.imagesdata?.items)
  // const dispatch = useDispatch()
  // const { status: statusVal } = useSelector((state) => state.firedetection.imageViewer)

  const openImage = (imageId, cameraId) => {
    // const status = !statusVal
    // dispatch(openImageViewer({ status, cameraId, imageId }))
  }

  useEffect(() => {
    console.log("selectedCamera:", selectedCamera);
    if (selectedCamera && selectedCamera.id) {
      console.log("selectedCamera ID:", selectedCamera);
      setSelectedCameraFinal(selectedCamera)
    }
  }, [selectedCamera]);

  useEffect(() => {
    console.log("selectedCamera", selectedCamera);
  },[])

  const handleGalleryPanel = (camera) => {
    console.log("camera details clicked", camera)
    // setCameraPanel(!cameraPanel)
    // dispatch(fetchImages({ cameraId: camera.id }))
    // setCameraClickState(camera)
    // setSelectedCamera(camera)

    if (ribbonState.name === 'Fire Detection') {
      const obj = {
        id: "#d12304ab-23b1-493f-8876-959998327dop41",
        type: "addToTabset",
        name: "Gallery",
        tabsetId: "#dd9004ab-23b1-493f-96d4-9a677e8fc27dop41",
        component: "image-gallery",
        isCaseTab: true,
        text: undefined,
        icon: undefined,
      };
      setNewTabClickState(obj);
    }
  }

  return (
    <>
    
      <div
        // isOpen={cameraPanel}
        // toggle={() => setCameraPanel(!cameraPanel)}
        className={"container"}
      >
        {/* <div toggle={() => setCameraPanel(!cameraPanel)}>
          Camera Details
        </div> */}
        {/* <PerfectScrollbar options={{ wheelPropagation: false }}> */}
          <div className="row">
            <div className="col-md-12 d-flex justify-content-between">
              <div className="camera_name">
                <h6>{selectedCameraFinal?.id} ({selectedCameraFinal?.camera_name.toUpperCase()})</h6>
              </div>
              <div className="camera_ques">
                <HelpCircle size={18} />
              </div>
            </div>
            <Row className="mt-2 mb-2">
              <Col className="camera_location text-center"><Map size={20} className='text-primary' onClick={() => handleLocation()} id='mapLocation' /><p>Location</p>
                <UncontrolledTooltip placement='top' target='mapLocation'>
                  View camera location on map
                </UncontrolledTooltip>
              </Col>
              <Col className="text-center">
                <div className='position-relative'>
                  <Circle size={5} className={selectedCameraFinal?.camera_status ? 'text-success badge-down' : 'text-danger badge-down'} fill={selectedCameraFinal?.camera_status ? '#28C76F' : '#ea5455'} />
                  <Camera size={20} id='upTime' />
                  <UncontrolledTooltip placement='top' target='upTime'>
                    Camera availability in last 24 hrs
                  </UncontrolledTooltip>
                </div>
                <p>23:45</p>
              </Col>
              <Col className="text-center">
                <div id='thresholds'>
                  {selectedCameraFinal?.detections.length ? (<>
                    {selectedCameraFinal.detections.filter((detection) => detection.confidenceScore >= 90).length > 0 && (
                      <Badge pill color='light-danger'>
                        {selectedCameraFinal.detections.filter((detection) => detection.confidenceScore >= 90).length}
                      </Badge>
                    )
                    }
                    {selectedCameraFinal.detections.filter((detection) => detection.confidenceScore >= 25 && detection.confidenceScore < 90).length > 0 && (
                      <Badge pill color='light-warning'>
                        {selectedCameraFinal.detections.filter((detection) => detection.confidenceScore >= 25 && detection.confidenceScore < 90).length}
                      </Badge>
                    )
                    }
                    {selectedCameraFinal.detections.filter((detection) => detection.confidenceScore > 0 && detection.confidenceScore < 25).length > 0 && (
                      <Badge pill color='light-success'>
                        {selectedCameraFinal.detections.filter((detection) => detection.confidenceScore > 0 && detection.confidenceScore < 25).length}
                      </Badge>
                    )
                    }
                  </>
                  ) : (
                    0
                  )}
                </div>
                <p>Detections</p>
                <UncontrolledTooltip placement='top' target='thresholds'>
                  Number of detections for each threshold
                </UncontrolledTooltip>
              </Col>
              {/* <Col className="camera_gallery text-center" onClick={() => handleImageModal(selectedCameraFinal.id)}> */}
              <Col className="camera_gallery text-center">
              <div id='gallery' onClick={handleGalleryPanel}>
                {/* <Image size={20} className='text-primary' onClick={() => handleImageModal(selectedCamera.id)} /> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#2e6fa1" d="M3 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 11l3.5-4.5l2.5 3l3.5-4.5l4.5 6zM16 2a2 2 0 0 1 2 2H2a2 2 0 0 1 2-2z" id='gallery'/></svg>
              </div>
              <p>Gallery</p>
              <UncontrolledTooltip placement='top' target='gallery'>
                View camera gallery
              </UncontrolledTooltip>
              </Col>
            </Row>
            <div className="camera_panel_detections mt-1">
              <Table>
                <thead>
                  <tr>
                    <th></th>
                    <th><Target size={18} id='confidenceScore' /></th>
                    <th><Clock size={18} id='timeOfDetection' /></th>
                    <th>
                    {/* <Bell size={18} id='notificationTime' /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#eee" d="m15.87 15.25l-3.37-2V8.72c0-.4-.32-.72-.72-.72h-.06c-.4 0-.72.32-.72.72v4.72c0 .35.18.68.49.86l3.65 2.19c.34.2.78.1.98-.24c.21-.35.1-.8-.25-1zm5.31-10.24L18.1 2.45c-.42-.35-1.05-.3-1.41.13c-.35.42-.29 1.05.13 1.41l3.07 2.56c.42.35 1.05.3 1.41-.13a1 1 0 0 0-.12-1.41zM4.1 6.55l3.07-2.56c.43-.36.49-.99.13-1.41a.988.988 0 0 0-1.4-.13L2.82 5.01a1 1 0 0 0-.12 1.41c.35.43.98.48 1.4.13zM12 4a9 9 0 1 0 .001 18.001A9 9 0 0 0 12 4zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7s7 3.14 7 7s-3.14 7-7 7z" id='notificationTime'/></svg>
                    </th>
                    <th> <Image size={18} id='detectionImage' /></th>
                    <UncontrolledTooltip placement='top' target='confidenceScore'>
                      Confidence score
                    </UncontrolledTooltip>
                    <UncontrolledTooltip placement='top' target='timeOfDetection'>
                      Time of detection
                    </UncontrolledTooltip>
                    <UncontrolledTooltip placement='top' target='notificationTime'>
                      Time of notification
                    </UncontrolledTooltip>
                    <UncontrolledTooltip placement='top' target='detectionImage'>
                      Click link to view detection image
                    </UncontrolledTooltip>
                  </tr>
                </thead>
                <tbody>
                  {selectedCameraFinal?.detections.length ? (<>
                    {selectedCameraFinal?.detections.map((detection) => {
                      return (
                        <tr key={detection.detectionId}>
                          <td><p className={detection.confidenceScore > 0 && detection.confidenceScore < 0.25 ? "text-success" : (detection.confidenceScore >= 0.25 && detection.confidenceScore < 0.90 ? "text-warning" : (detection.confidenceScore >= 0.90 ? "text-danger" : ""))}>{detection.detectionId}</p></td>
                          <td>{Math.round(detection.confidenceScore * 100)}%</td>
                          <td>{moment(new Date(detection.detectionTime)).format("HH:mm:ss")}</td>
                          <td>{moment(new Date(detection.notificationTime)).format("HH:mm:ss")}</td>
                          <td><Link2 className='text-primary' size={16} onClick={() => openImage(detection.frameId, selectedCameraFinal.id)} /></td>
                        </tr>
                      )
                    })
                    }
                  </>
                  ) : (
                    <tr>
                      <td colSpan={5}>
                        <div className='no-results show text-center'>
                          <h5>No Detections Found</h5>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        {/* </PerfectScrollbar> */}
      </div>
    </>
  )
}

export default CameraPanel
