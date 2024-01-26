import { useState, useEffect } from "react"
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Spinner,
  Button,
  Table
} from "reactstrap"
// import { useDispatch } from "react-redux"
// import { fetchImages } from "../../redux/firedetectionSlice"
// import "@styles/react/libs/charts/apex-charts.scss"
import { Camera, Circle, Sun } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
// import ImagesListModal from "./ImagesListModal"
// import CameraPanel from "./CameraPanel"
import { useCameraData } from '../../../app-redux/hooks/useCameraData'
import CameraPanel from "./cameraPanel"
import ImagesListModal from "../fire-imagelist-modal"
import { useOnNewTabClickState } from "../../../app-redux/hooks/useOnNewTabClickState"
import { useOnRibbonClickState } from "../../../app-redux/hooks/useOnRibbonClickState"
import { useOnCameraClickState } from "../../../app-redux/hooks/useOnCameraClickState"


const CameraList = props => {
  const {
    // cameradata,
    camerastatus,
    // STATUSES,
    currentCamera,
    selectCameraOnClick
  } = props

  // const dispatch = useDispatch()

  const [imageModal, setImageModal] = useState(false)
  const [cameraPanel, setCameraPanel] = useState(false)
  const { setNewTabClickState } = useOnNewTabClickState();
  const { ribbonState } = useOnRibbonClickState();
  const [cameraId, setCameraId] = useState(null)
  const [detections, setDetections] = useState([])
  const [showMoreop, setShowMoreop] = useState({
    options: false,
    imageId: null,
    cameraId: null
  })
  const [showMoreOpCam, setshowMoreOpCam] = useState({
    options: false,
    imageId: null,
    cameraId: null
  })
  // const [selectedCamera, setSelectedCamera] = useState(null)
  const { setCameraClickState } = useOnCameraClickState();

  const { cameraState: cameradata } = useCameraData()
  // const handleImageModal = (cameraId) => {
  //   setImageModal(!imageModal)
  //   setCameraId(cameraId)
  // }


  const handleCameraPanel = (camera) => {
    console.log("camera details clicked", camera)
    setCameraPanel(!cameraPanel)
    // dispatch(fetchImages({ cameraId: camera.id }))
    setCameraClickState(camera)
    // setSelectedCamera(camera)

    if (ribbonState.name === 'Fire Detection') {
      const obj = {
        id: "#d12304ab-23b1-493f-8876-9a677e8fc27dop41",
        type: "addToTabset",
        name: "Camera Details",
        tabsetId: "#dd9004ab-23b1-493f-96d4-9a677e8fc27dop41",
        component: "camera-details",
        isCaseTab: true,
        text: undefined,
        icon: undefined,
      };
      setNewTabClickState(obj);
    }
  }

  useEffect(() => {
    console.log("currentCamera", currentCamera);

    if (currentCamera) {
      const found = cameradata.find(c => c.id === currentCamera)
      if (found) {
        handleCameraPanel(found)
      }
      else {
        handleCameraPanel(1)
      }
    }
  }, [currentCamera])


  const getHighestDetection = (data) => {
    return data.detections.length > 0 ? (Math.max(...data.detections.map(detection => detection.confidenceScore)) * 100) : 0
  }
  // Render the dynamic camera list details
  const renderCameras = () => {
    return (
      <>
        {cameradata?.length ? (<Table className="cameraTable mb-0"><tbody>
          {cameradata.map((item, i) => {
            return (
              <tr key={i}>
                <td>
                  <Row className="mb-3">
                    <Col className='col-10 cameraHeader'>
                      Camera #{item.id}
                    </Col>
                    <Col className='text-end col-2'>
                      {getHighestDetection(item) < 50 ? (
                        <Sun size={16} color='#f0ad4e' />
                      ) : (
                        <>
                          🔥
                        </>
                      )}
                    </Col>
                  </Row>
                  <Row className='m-top-75 mb-1 camera_title'>
                    <Col>
                      <h6>{item.camera_name.toUpperCase()}</h6>
                    </Col>
                    <Col className="text-end">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#ff3d3d" d="m15.87 15.25l-3.37-2V8.72c0-.4-.32-.72-.72-.72h-.06c-.4 0-.72.32-.72.72v4.72c0 .35.18.68.49.86l3.65 2.19c.34.2.78.1.98-.24c.21-.35.1-.8-.25-1zm5.31-10.24L18.1 2.45c-.42-.35-1.05-.3-1.41.13c-.35.42-.29 1.05.13 1.41l3.07 2.56c.42.35 1.05.3 1.41-.13a1 1 0 0 0-.12-1.41zM4.1 6.55l3.07-2.56c.43-.36.49-.99.13-1.41a.988.988 0 0 0-1.4-.13L2.82 5.01a1 1 0 0 0-.12 1.41c.35.43.98.48 1.4.13zM12 4a9 9 0 1 0 .001 18.001A9 9 0 0 0 12 4zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7s7 3.14 7 7s-3.14 7-7 7z" /></svg>
                      <span className="alarmDisplay">&nbsp;23 mins</span>
                    </Col>
                  </Row>
                  <Row className='m-top-75'>
                    <Col className="col-2">
                      <div className='position-relative'>
                        <Circle size={5} className={item.camera_status ? 'text-success badge-down camera-list-badge-down' : 'text-danger badge-down camera-list-badge-down'} fill={item.camera_status ? '#28C76F' : '#ea5455'} />
                        <Camera size={20} />
                      </div>
                    </Col>
                    {/* <Col className='text-start col-10'><p>23:45</p></Col> */}
                  </Row>
                  <Row className="mt-1">
                    <Col>
                      {item?.detections.length ? (<>
                        {item.detections.filter((detection) => detection.confidenceScore >= 0.90).length > 0 && (
                          <Badge pill color='light-danger'>
                            {item.detections.filter((detection) => detection.confidenceScore >= 0.90).length}
                          </Badge>
                        )
                        }
                        {item.detections.filter((detection) => detection.confidenceScore >= 0.25 && detection.confidenceScore < 0.90).length > 0 && (
                          <Badge pill color='light-warning'>
                            {item.detections.filter((detection) => detection.confidenceScore >= 0.25 && detection.confidenceScore < 0.90).length}
                          </Badge>
                        )
                        }
                        {item.detections.filter((detection) => detection.confidenceScore > 0 && detection.confidenceScore < 0.25).length > 0 && (
                          <Badge pill color='light-success'>
                            {item.detections.filter((detection) => detection.confidenceScore > 0 && detection.confidenceScore < 0.25).length}
                          </Badge>
                        )
                        }
                      </>
                      ) : (
                        0
                      )}
                    </Col>
                    <Col className='text-end'>
                      <Button color='secondary' size='sm' onClick={() => handleCameraPanel(item)}>
                        Details
                      </Button>
                    </Col>
                  </Row>
                </td>
              </tr>
            )
          })}
        </tbody>
        </Table>
        ) : <h4 className="text-center my-5">
          <Spinner className="pl-1" />
        </h4>}
      </>
    )
  }

  // render the static camera list details

  return (
    <>
      <Card className="w-100 convention_13">
        <CardHeader className="border-bottom-0">
          <CardTitle tag="h6">Available Cameras</CardTitle>
        </CardHeader>
        <hr className="m-0" />
        <PerfectScrollbar
          className='list-group camera_list_wrapper '
          options={{ wheelPropagation: false }}
          containerRef={ref => {
            if (ref) {
              ref._getBoundingClientRect = ref.getBoundingClientRect

              ref.getBoundingClientRect = () => {
                const original = ref._getBoundingClientRect()

                return { ...original, height: Math.floor(original.height) }
              }
            }
          }}
        >
          <CardBody className='p-0 camera_list'>
            {/* {camerastatus === STATUSES.LOADING ? (<h4 className="text-center my-5">
                <Spinner className="pl-1" />
              </h4>) : camerastatus === STATUSES.ERROR ? (
              <h6 className="text-center my-5">
                No Cameras To Display
              </h6>
            ) : ( */}
            {renderCameras()}
            {/* )} */}
          </CardBody>
        </PerfectScrollbar>
      </Card>
      {/* <ImagesListModal
        setDetections={setDetections}
        setShowMoreop={setShowMoreop}
        showMoreOpCam={showMoreOpCam}
        setshowMoreOpCam={setshowMoreOpCam}
        cameraId={cameraId}
        showMoreop={showMoreop}
        detections={detections}
        imageModal={imageModal}
        setImageModal={setImageModal}
      /> */}
      {/* {selectedCamera && (<CameraPanel
        selectedCamera={selectedCamera}
        cameraPanel={cameraPanel}
        setCameraPanel={setCameraPanel}
        handleImageModal={handleImageModal}
        selectCameraOnClick={selectCameraOnClick}
      />
      )} */}
    </>
  )
}

export default CameraList