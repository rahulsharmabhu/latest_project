import React, { useState } from 'react'
import { useOnFireAlert } from '../../../app-redux/hooks/useOnFireAlert'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Badge, Col, Label, Row, Button } from "reactstrap"
import { Crosshair, PlusCircle, MinusCircle, MapPin, ArrowUp, Camera, Zap, Compass, GitMerge, Sun, Clock } from "react-feather"
import Chart from 'react-apexcharts'
import PerfectScrollbar from "react-perfect-scrollbar";
import '../../../assets/css/fire-detection.css'


const FireAlertPanel = () => {
 
  const { fireAlertState } = useOnFireAlert()

  const [open, setOpen] = useState('')

  const toggle = id => {
      open === id ? setOpen() : setOpen(id)
  }

  const options = {
    chart: {
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            blur: 3,
            left: 1,
            top: 1,
            opacity: 0.1
        }
    },
    colors: ['#f0ad4e'],
    plotOptions: {
        radialBar: {
            offsetY: 10,
            startAngle: -150,
            endAngle: 150,
            hollow: {
                size: '45%'
            },
            track: {
                background: '#f0ad4e',
                strokeWidth: '50%'
            },
            dataLabels: {
                name: {
                    show: false
                },
                value: {
                    color: '#f0ad4e',
                    fontFamily: 'Montserrat',
                    fontSize: '1rem',
                    offsetY: 5
                    // fontWeight: '600'
                }
            }
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#f0ad4e'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
        }
    },
    stroke: {
        lineCap: 'round'
    },
    grid: {
        padding: {
            bottom: 30
        }
    }
}

const optionsDanger = {
    chart: {
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            blur: 3,
            left: 1,
            top: 1,
            opacity: 0.1
        }
    },
    colors: ['#d9534f'],
    plotOptions: {
        radialBar: {
            offsetY: 10,
            startAngle: -150,
            endAngle: 150,
            hollow: {
                size: '45%'
            },
            track: {
                background: '#d9534f',
                strokeWidth: '50%'
            },
            dataLabels: {
                name: {
                    show: false
                },
                value: {
                    color: '#d9534f',
                    fontFamily: 'Montserrat',
                    fontSize: '1rem',
                    offsetY: 5
                    // fontWeight: '600'
                }
            }
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#f0ad4e'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
        }
    },
    stroke: {
        lineCap: 'round'
    },
    grid: {
        padding: {
            bottom: 30
        }
    }
}

  const renderAlerts = () => {
    return (
        <>
            {
                fireAlertState.length ? (
                  <>
                    <Accordion toggle={toggle} open={open}>
                        {fireAlertState.map((item, i) => {
                            return (
                                <AccordionItem key={i} className="fire-alert-header">
                                    <AccordionHeader targetId={`${i}`}>
                                        <div className="detection_header_wrapper">
                                            <div className="detection_header_first">
                                                <div className="detection_badge">
                                                    <Badge key={i}>
                                                        # {item.detectionData.cameraId}
                                                    </Badge>
                                                </div>
                                                <div className="detection_indications d-flex">
                                                    <div className="detection_icon">
                                                        {item.detectionData.percentage < 50 ? (
                                                            <>
                                                                {/* ☀️ */}
                                                                <Sun size={16} color='#f0ad4e' />
                                                            </>
                                                        ) : (
                                                            <>
                                                                🔥
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="detection_plus_icon">
                                                    { /* open ? <MinusCircle size={18} /> : <PlusCircle size={18} /> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="detection_header_second">
                                                <div className="detection_camera_name">
                                                    <p className="text-white">{item.title}</p>
                                                </div>
                                                <div className="detection_camera_id pt-1">
                                                    <p>CAMERA ID : {item.detectionData.cameraId}</p>
                                                </div>
                                                {/* <div className="detection_camera_time pt-1">
                                                    <p>Time Since Detection : {item.detectionData.timeSinceLastDetection}</p>
                                                </div> */}
                                            </div>
                                            <div className="detection_camera_map_info d-flex">
                                                <div className="detection_chart">
                                                    {item.percentage < 50 ? (
                                                        <Chart options={options} series={[item.detectionData.percentage]} type='radialBar' height={120} width={120} />
                                                    ) : (
                                                        <Chart options={optionsDanger} series={[item.detectionData.percentage]} type='radialBar' height={120} width={120} />
                                                    )}
                                                </div>
                                                <div className="detection_info mt-2">
                                                    <Label><MapPin size={15}/><small> 45.987585 : -85.94846</small></Label>
                                                    <br/>
                                                    <Label><Clock size={15}></Clock> <small>
                                                        {item.detectionData.detectionTime}
                                                    </small></Label>
                                                    <br />
                                                    <Label className="detection_alert_time">
                                                        <Clock size={15}/>
                                                         <small> 23 mins</small>
                                                    </Label>
                                                </div>
                                            </div>
                                            <div className="detection_camera_map_info d-flex text-center ps-2">
                                                {/* <div className="detection_chart"> 
                                                <div className='canvas-wrapper mb-1'>
                                                    <ImageAnnotator currentImage={img1} detections={detections} height={200} width={200} />
                                                    {/* </div> 
                                                </div> */}
                                            </div>
                                        </div>
                                    </AccordionHeader>
                                    <AccordionBody accordionId={`${i}`}>
                                        <Row className="detection_details">
                                            <Col className="col-2">
                                                <Compass size={20} color='#f0ad4e' />
                                            </Col>
                                            <Col className="col-10">
                                                <small>{item.detectionData.coordinates}</small>
                                            </Col>
                                        </Row>
                                    </AccordionBody>
                                </AccordionItem>
                            )
                        })}
                    </Accordion>
                     </>
                ) : (
                    <div className='no-results show text-center pt-4'>
                        <h6>No Alerts to display!</h6>
                    </div>
                )
            }
        </>
    )
}

  return (
    <PerfectScrollbar
    className='scrollable-container fire_alerts_data'
    options={{
      wheelPropagation: false
    }}
    >
    {renderAlerts()}
    </PerfectScrollbar>
  )
}

export default FireAlertPanel