import {
    Modal,
    ModalBody,
    ModalHeader,
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Form,
    Label,
    Input,
    InputGroup,
    InputGroupText,
    Row,
    Col,
    Button
  } from "reactstrap"
import { useState, useEffect } from 'react'
import PerfectScrollbar from "react-perfect-scrollbar"
import { Filter, Search } from "react-feather"
import { useCameraData } from "../../../app-redux/hooks/useCameraData"
import Nouislider from 'nouislider-react'
import "nouislider/distribute/nouislider.css";
import Flatpickr from 'react-flatpickr'
import "flatpickr/dist/flatpickr.css";
//import '@styles/react/libs/flatpickr/flatpickr.scss'
// import {fetchImages} from "../../redux/firedetectionSlice"
// import {useSelector, useDispatch} from "react-redux"

const FilterCameraGallery = ({cameraId, openFilterPanel, setOpenFilterPanel, setFilterKeys}) => {
  
  const toggleFilterPanel = () => {
    setOpenFilterPanel(!openFilterPanel)
  }

  // const dispatch = useDispatch()

  const { cameraState:cameradata,  detectiontypeState : detectiontype } = useCameraData()


  const [open, setOpen] = useState('1')
  const [minValue, setMinValue] = useState('0')
  const [maxValue, setMaxValue] = useState('100')
  const [dateRange, setDateRange] = useState()
  const [detectionEvent, setDetectionEvent] = useState()
  const [confidentScore, setConfidentScore] = useState({minValue: 0, maxValue: 100})
  const [detectionFrom, setDetectionFrom] = useState()
  const [detectionTypeLables, setDetectionType] = useState([])
  const [camera, setCamera] = useState([])
  const [cameraDataVal, setCameraDataVal] = useState(null)
  const [starttime, setStartTime] = useState(new Date())
  const [endtime, setEndTime] = useState(new Date())
  const [startdate, setStartDate] = useState(new Date())
  const [enddate, setEndDate] = useState(new Date())

  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }

  const today = new Date()
  let dateFilter
  if (dateRange === 'last hour') {
    dateFilter = new Date(today.getTime() - (1000 * 60 * 60))
  } else if (dateRange === 'last day') {
    dateFilter = new Date(today.getTime() - (1000 * 60 * 60 * 24))
  } else if (dateRange === 'last week') {
    dateFilter = new Date(today.getTime() - (1000 * 60 * 60 * 24 * 7))
  }

  const filterDateVal = Date.parse(dateFilter) 
      
  const displayConfidentScoreRange = (event) => {
    setMaxValue(event[1])
    setMinValue(event[0])
  }

  useEffect(() => {
    if (camera === 'list') {
      setCameraDataVal(cameradata)
    } else if (camera === 'current') {
      setCameraDataVal(cameraId)
    } else if (camera === 'all') {
      setCameraDataVal('all')
    }
  }, [camera])
    
  let confidenceScoreVal = {}
  let cameraFilter
  const filterCameraImages = () => {
      if (confidentScore === 'custom') {
        confidenceScoreVal = { maxValue : Math.round(maxValue), minValue : Math.round(minValue) }
      } else {
        confidenceScoreVal = confidentScore
      }
      if (camera === 'current') {
        cameraFilter = cameraId
      } else {
        cameraFilter = camera
      }
      setFilterKeys({cameraId, detectionEvent, confidenceScoreVal, filterDateVal, dateRange, cameraFilter, detectionType, detectionFrom})
     // dispatch(fetchImages({cameraId, detectionEvent, confidenceScoreVal, filterDateVal, cameraFilter, detectionType, detectionFrom}))
  }

  const clearFilterData = () => {
      setFilterKeys()
     // dispatch(fetchImages({cameraId}))
  }

  
  const handleDetectionType = (e) => {
    const { value, checked } = e.target     
    if (checked) {
        setDetectionType([...detectionTypeLables, parseInt(value)])
      } else {
        setDetectionType(detectionTypeLables.filter((e) => e !== parseInt(value)))
      }
  }

  const handleCamera = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setCamera([...camera, value])
    } else {
      setCamera(camera.filter((e) => e !== value))
    }
  }

  return (
    <>
    <Modal
     isOpen={openFilterPanel}
     toggle={() => toggleFilterPanel()}
     className={"modal-dialog modal-sm filter_camera_panel convention_14"}
     >
     <ModalHeader toggle={() => toggleFilterPanel()}>
      <div>
       Filter by
      <Button outline size="sm" onClick={() => clearFilterData()}>Clear All</Button>
      <Button color='secondary' size='sm' onClick={() => filterCameraImages()}><Filter size={15}/>Apply Filter</Button>
      </div>
     </ModalHeader>
     <PerfectScrollbar options={{ wheelPropagation: false }} style={{ maxHeight: "500px" }}>
     <ModalBody className="">
     <Form>
     <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId='1'>Custom Search</AccordionHeader>
        <AccordionBody accordionId='1'>
        <div>
            <InputGroup className='input-group-merge mb-2'>
                <InputGroupText>
                    <Search size={14} />
                    </InputGroupText>
                <Input placeholder='search...' />
            </InputGroup>
        </div>
        </AccordionBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader targetId='2'>Camera</AccordionHeader>
        <AccordionBody accordionId='2'>
            <div className="camera_filter">
                <div className="all_camera">
                <Label className='form-check-label' for='all_camera'>All</Label>
                <Input
                  type='radio'
                  name='camera'
                  value={camera}
                  checked={camera === 'all'}
                  onChange={() => setCamera('all')}
                  id='all_camera'
                  style={{float:'right'}}
                />
                </div>
                <div className="current_selected pt-1">
                <Label className='form-check-label' for='current_selected'>Current Selected</Label>
                <Input
                  type='radio'
                  name='camera'
                  value={camera}
                  checked={camera === 'current'}
                  onChange={() => setCamera('current')}
                  id='current_selected'
                  style={{float:'right'}}
                />
                </div>
                <div className="list pt-1">
                <Label className='form-check-label' for='list'>List</Label>
                <Input
                  type='radio'
                  name='camera'
                  value={camera}
                  checked={camera === 'list'}
                  onChange={() => setCamera('list')}
                  id='list'
                  style={{float:'right'}}
                />
                </div>
                {Array.isArray(cameraDataVal) ? cameraDataVal.map((val) => <><div className="pt-1" key={val.id}><Label className='form-check-label' for='list'>#{val.id}</Label>
                <Input
                  type='checkbox'
                  checked={camera.includes(String(val.id)) || false}
                  value={val.id}
                  onChange={handleCamera}
                  id='no_smoke'
                  style={{float:'right'}}
                /></div></>) : ''}
            </div>
        </AccordionBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader targetId='3'>Detection Event</AccordionHeader>
        <AccordionBody accordionId='3'>
            <div className="detection_event">
                <div className="yes">
                <Label className='form-check-label' for='detection_event'>Yes</Label>
                <Input
                  type='radio'
                  name='detection_event'
                  value={detectionEvent}
                  checked={detectionEvent}
                  onChange={() => setDetectionEvent(true)}
                  id='yes'
                  style={{float:'right'}}
                />
                </div>
                <div className="no pt-1">
                <Label className='form-check-label' for='detection_event'>No</Label>
                <Input
                  type='radio'
                  name='detection_event'
                  value={detectionEvent}
                  checked={detectionEvent === false}
                  onChange={() => setDetectionEvent(false)}
                  id='no'
                  style={{float:'right'}}
                />
                </div>
            </div>
        </AccordionBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader targetId='4'>Detection Type</AccordionHeader>
        <AccordionBody accordionId='4'>
            <div className="detection_type">
                <div className="yes">
                <Label className='form-check-label' for='detection_type'>AI Detection</Label>
                <Input
                  type='radio'
                  name='detection_type'
                  value={detectionFrom}
                  checked={detectionFrom === 'ai'}
                  onChange={() => setDetectionFrom('ai')}
                  id='yes'
                  style={{float:'right'}}
                />
                </div>
                <div className="no pt-1">
                <Label className='form-check-label' for='detection_type'>Mannual Detection</Label>
                <Input
                  type='radio'
                  name='detection_type'
                  value={detectionFrom}
                  checked={detectionFrom === 'mannual'}
                  onChange={() => setDetectionFrom('mannual')}
                  id='no'
                  style={{float:'right'}}
                />
                </div>
            </div>
        </AccordionBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader targetId='5'>Labels</AccordionHeader>
        <AccordionBody accordionId='5'>
            <div className="labels">
              {(Array.isArray(detectiontype) && detectiontype.length > 0) && detectiontype.map((val) => <>
                <div className="no_smoke pt-1" key={val.id}>
                <Label className='form-check-label' for='labels'>{val.title}</Label>
                <Input
                  type='checkbox'
                  name='labels'
                  checked={detectionTypeLables.includes(parseInt(val.id)) || false}
                  value={val.id}
                  onChange={handleDetectionType}
                  id='no_smoke'
                  style={{float:'right'}}
                />
                </div>
              </>)}
            </div>
        </AccordionBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader targetId='6'>Confident Score</AccordionHeader>
        <AccordionBody accordionId='6'>
           <div className="confident_score">
                <div className="0_20">
                <Label className='form-check-label' for='confident_score'>0-20</Label>
                <Input
                  type='radio'
                  name='confident_score'
                  value={confidentScore}
                  checked={(confidentScore.minValue === 0 && confidentScore.maxValue === 20)}
                  onChange={() => setConfidentScore({minValue: 0, maxValue: 20})}
                  id='0-20'
                  style={{float:'right'}}
                />
                </div>
                <div className="21_40 pt-1">
                <Label className='form-check-label' for='confident_score'>21-40</Label>
                <Input
                  type='radio'
                  name='confident_score'
                  value={confidentScore}
                  checked={(confidentScore.minValue === 21 && confidentScore.maxValue === 40)}
                  onChange={() => setConfidentScore({minValue: 21, maxValue: 40})}
                  id='21-40'
                  style={{float:'right'}}
                />
                </div>
                <div className="41_60 pt-1">
                <Label className='form-check-label' for='confident_score'>41-60</Label>
                <Input
                  type='radio'
                  name='confident_score'
                  value={confidentScore}
                  checked={(confidentScore.minValue === 41 && confidentScore.maxValue === 60)}
                  onChange={() => setConfidentScore({minValue: 41, maxValue: 60})}
                  id='41-60'
                  style={{float:'right'}}
                />
                </div>
                <div className="61_80 pt-1">
                <Label className='form-check-label' for='confident_score'>61-80</Label>
                <Input
                  type='radio'
                  name='confident_score'
                  value={confidentScore}
                  checked={(confidentScore.minValue === 61 && confidentScore.maxValue === 80)}
                  onChange={() => setConfidentScore({minValue: 61, maxValue: 80})}
                  id='61-80'
                  style={{float:'right'}}
                />
                </div>
                <div className="81_100 pt-1">
                <Label className='form-check-label' for='confident_score'>81-100</Label>
                <Input
                  type='radio'
                  name='confident_score'
                  value={confidentScore}
                  checked={(confidentScore.minValue === 81 && confidentScore.maxValue === 100)}
                  onChange={() => setConfidentScore({minValue: 81, maxValue: 100})}
                  id='81-100'
                  style={{float:'right'}}
                />
                </div>
                <div className="custom_range pt-1">
                  <Label className='form-check-label' for='custom_range'>Custom Range</Label>
                    <Input
                    type='radio'
                    name='confident_score'
                    value={confidentScore}
                    checked={confidentScore === 'custom'}
                    onChange={() => setConfidentScore('custom')}
                    id='custom'
                    style={{float:'right'}}
                  />
                  {confidentScore === 'custom' && <div className="sm-12 pt-1 range_slider">
                  <Nouislider
                    connect={true}
                    start={[0, 100]}
                    tooltips={true}
                    animate={true}
                    onChange={displayConfidentScoreRange}
                    behaviour={'drag-tap'}
                    range={{
                      min: 0,
                      max: 100
                    }}
                  />
                  <p className="pt-1">Selected Range - <b>{Math.round(minValue)} - {Math.round(maxValue)}</b></p>
                  </div> }
                </div>
            </div>
        </AccordionBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader targetId='7'>Date Range</AccordionHeader>
        <AccordionBody accordionId='7'>
        <div className="date_range">
                <div className="last_hour">
                <Label className='form-check-label' for='last_hour'>Last Hour</Label>
                <Input
                  type='radio'
                  name='date_range'
                  value={dateRange}
                  checked={dateRange === 'last hour'}
                  onChange={() => setDateRange('last hour')}
                  id='all_date_range'
                  style={{float:'right'}}
                />
                </div>
                <div className="last_day pt-1">
                <Label className='form-check-label' for='last_day'>Last Day</Label>
                <Input
                  type='radio'
                  name='date_range'
                  value={dateRange}
                  checked={dateRange === 'last day'}
                  onChange={() => setDateRange('last day')}
                  id='last_day'
                  style={{float:'right'}}
                />
                </div>
                <div className="last_week pt-1">
                <Label className='form-check-label' for='last_week'>Last Week</Label>
                <Input
                  type='radio'
                  name='date_range'
                  value={dateRange}
                  checked={dateRange === 'last week'}
                  onChange={() => setDateRange('last week')}
                  id='last_week'
                  style={{float:'right'}}
                />
                </div>
                <div className="custom_date pt-1">
                <Label className='form-check-label' for='custom_date'>Custom Date</Label>
                  <Input
                    type='radio'
                    name='date_range'
                    value={dateRange}
                    checked={dateRange === 'custom'}
                    onChange={() => setDateRange('custom')}
                    id='custom_date'
                    style={{float:'right'}}
                  />
                  { dateRange === 'custom' && 
                    <>
                    <Row className="pt-1">
                       <Col className='col-lg-5 col-md-5 col-5'>
                          <Label className='form-check-label pb-1' for='ex1-inactive'>
                           Start Time
                          </Label>
                          <Flatpickr
                          className='form-control'
                          value={starttime}
                          id='timepicker'
                          options={{
                             enableTime: true,
                             noCalendar: true,
                             dateFormat: 'H:i',
                             time_24hr: false
                            }}
                          onChange={date => setStartTime(date)}
                          />
                        </Col>
                        <Col className='col-lg-2 col-md-2 col-2 py-2'>
                            <Label>To</Label>
                        </Col>
                        <Col className='col-lg-5 col-md-5 col-5'>
                        <Label className='form-check-label pb-1' for='ex1-inactive'>End Time</Label>
                                        <Flatpickr
                                            className='form-control'
                                            value={endtime}
                                            id='timepicker'
                                            options={{
                                            enableTime: true,
                                            noCalendar: true,
                                            dateFormat: 'H:i',
                                            time_24hr: false
                                            }}
                                            onChange={date => setEndTime(date)}
                                        />
                         </Col>
                  </Row>
                  <Row className="pt-1">
                       <Col className='col-lg-5 col-md-5 col-5'>
                          <Label className='form-check-label pb-1' for='ex1-inactive'>
                           Start Date
                          </Label>
                          <Flatpickr
                          className='form-control'
                          value={startdate}
                          id='datepicker'
                          options={{
                            altInput: true,
                            altFormat: 'F j, Y',
                            dateFormat: 'Y-m-d'
                            }}
                          onChange={date => setStartDate(date)}
                          />
                        </Col>
                        <Col className='col-lg-2 col-md-2 col-2 py-2'>
                            <Label>To</Label>
                        </Col>
                        <Col className='col-lg-5 col-md-5 col-5'>
                        <Label className='form-check-label pb-1' for='ex1-inactive'>End Date</Label>
                                        <Flatpickr
                                            className='form-control'
                                            value={enddate}
                                            id='datepicker'
                                            options={{
                                              altInput: true,
                                              altFormat: 'F j, Y',
                                              dateFormat: 'Y-m-d'
                                            }}
                                            onChange={date => setEndDate(date)}
                                        />
                         </Col>
                  </Row>
                  </> }
                </div>
            </div>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
    </Form>
    </ModalBody>
     </PerfectScrollbar>
   </Modal>
   </>
  )
}

export default FilterCameraGallery