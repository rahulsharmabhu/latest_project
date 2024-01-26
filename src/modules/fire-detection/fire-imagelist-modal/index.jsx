import React, { useState } from 'react'
import {
  Col,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  ModalFooter,
  Accordion,
  Input,
  AccordionBody,
  Spinner,
  AccordionHeader,
  AccordionItem
} from "reactstrap"
import { useCameraData } from '../../../app-redux/hooks/useCameraData'
import { Filter, MoreVertical, Plus } from "react-feather"
import FilterCameraGallery from './filter-gallery'
import PerfectScrollbar from "react-perfect-scrollbar"
import DetectedLabels from './detected-labels'
import DetectionOptions from './detection-options'
import ImageViewer from './image-viewer'
import Toast from '../../../components/toast'
import CanvasModel from './custom-image-innovator'
import { useEffect } from 'react'
import CustomImageInnovator from './custom-image-innovator'
import { drawRectanglesOnCanvas } from '../../../components/draw-rectangles'
import ImageWithCanvas from './canvas-image'
import { useOnCameraClickState } from '../../../app-redux/hooks/useOnCameraClickState'

const ImagesListModal = ({
  setImageModal,
  imageModal,
  showMoreOpCam,
  setshowMoreOpCam,
  detections,
  setDetections,
  setShowMoreop,
  cameraId,
  showMoreop
}) => {

  const [openFilterPanel, setOpenFilterPanel] = useState(false)
  const [showCustomImageInnovator, setShowCustomImageInnovator] = useState(false);
  const [selectedImageDetections, setSelectedImageDetections] = useState(null);
  const { imagesState } = useCameraData()
  const { selectedCamera } = useOnCameraClickState();
  const [loading, setLoading] = useState('')
  const [detectionLabels, showDetectionLabels] = useState([])
  const [customRectangles, setCustomRectangles] = useState([])
  const imagelistData = imagesState.find((val) => val.cameraId === selectedCamera.id)
  const imagelist = imagelistData?.items
  const imagesDataVal = []
  const [filterKeys, setFilterKeys] = useState()

  const openCameraFilterPanel = () => {
    setOpenFilterPanel(true)
  }

  const updateRectanglesInc = (newRectanglesData) => {
      setCustomRectangles(newRectanglesData);
  }

  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }

  let filterData = []

  const handleDetection = (detec, cameraId, imageId) => {
    filterData = detections
    if (imageId.length > 0) {
      imageId.forEach(value => {
        const newIndex = filterData.findIndex(res => res.cameraId === cameraId && res.imageId === value && res.detec.id === detec.id)
        if (newIndex > -1) {
          filterData.splice(newIndex, 1)
        } else {
          filterData.push({ cameraId, imageId: value, detec })
        }
      })
      setDetections([...filterData])
    } else {
      const index = filterData.findIndex(res => res.cameraId === cameraId && res.imageId === imageId && res.detec.id === detec.id)
      const detection = { cameraId, imageId, detec }
      if (index > -1) {
        filterData.splice(index, 1)
        setDetections([...filterData])
      } else {
        setDetections([...filterData, detection])
      }
    }
  }

  const handelInfiniteScroll = (event) => {
    const target = event.target
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      if (limit <= imagelist?.length) {
        setLimit((prev) => prev + 4)
        setLoading(true)
      } else {
        setLoading(false)
      }
    }
  }

  const moreOptionsCam = (imageId, cameraId, showopcam) => {
    if (detectionLabels.length > 0) {
      setshowMoreOpCam({ ...showMoreOpCam, options: showopcam, imageId, cameraId })
    } else {
      Toast("Please select one or multiple images you want to apply the labels!", "error")
    }
  }

  const moreOptions = (imageId, cameraId, showop) => {
    setShowMoreop({ ...showMoreop, options: showop, imageId, cameraId })
  }


  const handleSelectImage = (e) => {
    const { value, checked } = e.target
    if (checked) {
      showDetectionLabels([...detectionLabels, parseInt(value)])
    } else {
      showDetectionLabels(detectionLabels.filter((e) => e !== parseInt(value)))
    }
  }

  const openImage = (imageId, cameraId) => {
    setSelectedImageDetections(cameraId);
    setShowCustomImageInnovator(true);
  };

  useEffect(() => {
console.log("showMoreOpCam.options",showMoreOpCam?.options);
  },[])


  return (
    <>
      <CustomImageInnovator
        isOpen={showCustomImageInnovator}
        toggle={() => setShowCustomImageInnovator(false)}
        detections={selectedImageDetections}
        onRectanglesChange={updateRectanglesInc}
      />

      <div
        // isOpen={imageModal}
        // toggle={() => setImageModal(!imageModal)}
        className={"m-2"}
        // scrollable={true}
      >

        {/* <div toggle={() => setImageModal(!imageModal)}> */}
          <div className="d-flex justify-content-between m-2">
            <div className="camera_info">
              Camera ID : #{selectedCamera.id}
            </div>
            {imagelist?.length > 0 && <div className="filter_button">
              <Button className="d-flex" onClick={openCameraFilterPanel} color='secondary' size='sm'>
                <Filter size={16} />
                <div>Camera Filter</div>
              </Button>
            </div>}
            <FilterCameraGallery cameraId={cameraId} openFilterPanel={openFilterPanel} setOpenFilterPanel={setOpenFilterPanel} setFilterKeys={setFilterKeys} />
          </div>
        {/* <PerfectScrollbar options={{ wheelPropagation: false }} onScroll={handelInfiniteScroll}> */}
          <div className="images_list">
            {/* <div className="filter_menu_info">
              {imagelist?.length > 0 &&
                <>
                  <div className={showMoreOpCam?.options && cameraId === cameraId ? "more_options_menu more_border_color" : "more_options_menu"} onClick={() => moreOptionsCam(null, cameraId, !showMoreOpCam?.options)}>
                    <Button color='secondary' size='sm'>
                      <Plus size={16} />
                      <p>Add Label</p>
                    </Button>
                  </div>
                  <PerfectScrollbar
                    className={
                      showMoreOpCam?.options && showMoreOpCam.cameraId === cameraId ? "more_options_camera more_back_color" : "more_options_camera"
                    }
                    options={{ wheelPropagation: false }}
                    style={{ maxHeight: "120px" }}
                  >
                    <DetectionOptions
                      imageId=''
                      showMoreOpCam={showMoreOpCam}
                      handleDetection={handleDetection}
                      cameraId={cameraId}
                      detectionLabels={detectionLabels}
                      detections={detections}
                    />
                  </PerfectScrollbar>
                </>
              }
            </div> */}
            {filterKeys === undefined ? '' : <ShowFilterKeywords filterKeys={filterKeys} />}
            <Row className="mt-3">
              {imagelist?.length > 0 ? imagelist.slice(0, 3).map((image) => (
                <Col
                  className="col-3 col-md-3 col-lg-3 fire_detection_image_container"
                  key={image.id}
                >
                  <div className="firedetection_image_wrapper">
                    <div
                      className={
                        showMoreop?.options && showMoreop.imageId === image.id ? "image_menu image_menu_border_color" : "image_menu"
                      }
                      onClick={() => moreOptions(image.id, cameraId, !showMoreop.options)}
                    >
                      <MoreVertical size={16} />
                    </div>
                    <div className="select-image">
                      <Input
                        type='checkbox'
                        name='labels'
                        checked={detectionLabels.includes(parseInt(image.id)) || false}
                        value={image.id}
                        onChange={handleSelectImage}
                        id={image.id}
                        style={{ float: 'right' }}
                      />
                    </div>
                    {/* <div className="show_detections">
                      <DetectedLabels
                        cameraId={cameraId}
                        imageId={image.id}
                        detections={detections}
                        setDetections={setDetections}
                      />
                    </div> */}
                    <PerfectScrollbar
                      className={
                        showMoreop?.options && showMoreop?.imageId === image.id ? "more_options options_back_color" : "more_options"
                      }
                      options={{ wheelPropagation: false }}
                      style={{ maxHeight: "120px" }}
                    >
                      <DetectionOptions
                        imageId={image.id}
                        showMoreop={showMoreop}
                        handleDetection={handleDetection}
                        detectionLabels={detectionLabels}
                        cameraId={cameraId}
                        detections={detections}
                      />
                    </PerfectScrollbar>
                    <div onClick={() => openImage(image.id, image)}>
                      <ImageWithCanvas
                        key={image.id}
                        image={image}
                        originalImageWidth={269}
                        originalImageHeight={200}
                        customRectangles={customRectangles}
                      />
                    </div>
                  </div>


                </Col>
              )) : (Array.isArray(imagesDataVal) && imagesDataVal.length > 0) ? imagesDataVal.map((value) => <>
                <Accordion className='accordion-border filtered-data' open={open} toggle={toggle} key={value.id}>
                  <AccordionItem>
                    <AccordionHeader targetId={value.cameraId}>{value.cameraId} ({value.items.length} pics) </AccordionHeader>
                    <AccordionBody accordionId={value.cameraId}>
                      <Row>
                        {value.items.map((data) => <Col className="col-3 col-md-3 col-lg-3 fire_detection_image_container"
                          key={data.id}
                        >
                          <div className="firedetection_image_wrapper">
                            <div
                              className={
                                showMoreop.options && showMoreop.imageId === data.id ? "image_menu image_menu_border_color" : "image_menu"
                              }
                              onClick={() => moreOptions(data.id, cameraId, !showMoreop.options)}
                            >
                              <MoreVertical size={16} />
                            </div>
                            <div className="show_detections">
                              <DetectedLabels
                                cameraId={cameraId}
                                imageId={data.id}
                                detections={detections}
                                setDetections={setDetections}
                              />
                            </div>
                            <PerfectScrollbar
                              className={
                                showMoreop.options && showMoreop.imageId === data.id ? "more_options options_back_color" : "more_options"
                              }
                              options={{ wheelPropagation: false }}
                              style={{ maxHeight: "120px" }}
                            >
                              <DetectionOptions
                                imageId={data.id}
                                showMoreop={showMoreop}
                                handleDetection={handleDetection}
                                detectionLabels={detectionLabels}
                                cameraId={cameraId}
                                detections={detections}
                              />
                            </PerfectScrollbar>
                            <div className={data?.detections?.length > 0 ? "image detected_image" : "image"} onClick={() => openImage(data.id, value.cameraId)}>
                              <div className='canvas-wrapper'>
                                <image src={data?.image} detections={data?.detections} height={200} width={360} />
                              </div>
                            </div>
                          </div></Col>)
                        }
                      </Row>
                    </AccordionBody>
                  </AccordionItem>
                </Accordion>
              </>) : <h5 className="text-center pt-4 pb-4">There are no results for the current filter set. Please change the filter settings!</h5>}
              <div className="text-center col-12 mt-2 mb-1">{loading === '' ? '' : loading ? <Spinner color="primary" className="pl-1" /> : <h5>you have got all images!</h5>}</div>
            </Row>
          </div>
        {/* </PerfectScrollbar> */}
      </div>
      <ImageViewer
        detections={detections}
        setDetections={setDetections}
      />
    </>
  )
}

export default ImagesListModal