import { useRef, useEffect, useState } from 'react'
import createMapView from '../utils/mapUtils'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import TextSymbol from "@arcgis/core/symbols/TextSymbol"
import { loadCss } from 'esri-loader'
import CameraGreen from '../../assets/images/map/camera-green.png'
import CameraGrey from '../../assets/images/map/camera-grey.png'
import CameraYellow from '../../assets/images/map/camera-yellow.png'
import CameraRed from '../../assets/images/map/camera-red.png'
import Point from "@arcgis/core/geometry/Point"
// ** Custom Hooks
import { useSkin } from '../../app-redux/hooks/useSkin'

const CameraMapView = props => {

    const [view, setView] = useState(null)
    const [locationSelected, setLocationSelected] = useState(false)
    const { skin } = useSkin()

    const {
        basemap,
        center,
        zoom,
        locations,
        setcurrentCamera,
        height
    } = props
   
    const mapRef = useRef()

    const markerSymbolRed = {
        type: "picture-marker",
        url: CameraRed,
        width: 49,
        height: 49
    }
    const markerSymbolGreen = {
        type: "picture-marker",
        url: CameraGreen,
        width: 25,
        height: 25
    }
    const markerSymbolYellow = {
        type: "picture-marker",
        url: CameraYellow,
        width: 25,
        height: 25
    }
    const markerSymbolGrey = {
        type: "picture-marker",
        url: CameraGrey,
        width: 25,
        height: 25
    }

    useEffect(() => {
        loadCss()
        const createMap = async () => {
            const generatedView = await createMapView(mapRef.current, basemap, center, zoom)
            generatedView.on("click", function (event) {
                generatedView.hitTest(event)
                    .then(function (response) {
                        const graphic = response.results[0].graphic
                        if (graphic && graphic.attributes && graphic.attributes.cameraId) {
                            setcurrentCamera(null)
                            setcurrentCamera(graphic.attributes.cameraId)
                        }
                    })
            })
            setView(generatedView)
        }
        createMap()
        return () => {
            if (view) {
                view?.destroy()
            }
        }
    }, [])

    useEffect(() => {
        if (!view) {
            return
        }
        view.map.basemap = basemap
        // view.map.layout = Layout(height = '100%')
    }, [view, basemap])

    useEffect(() => {
        if (!view) {
            return
        }
        view.map.basemap = skin === 'dark' ? 'streets-night-vector' : 'streets-vector'
    }, [view, skin])

    useEffect(() => {
        if (!view) {
            return
        }
        if (!locationSelected) {
            view.center = center
            view.zoom = zoom
            setLocationSelected(true)
        } else {
            const options = {
                animate: true,
                speedFactor: 1,
                duration: undefined,
                maxDuration: 8000,
                easing: "out-quint"
            }
            const point = new Point({
                latitude: center[0],
                longitude: center[1]
            })
            view.goTo({
                target: point,
                zoom
            }, options)
        }
    }, [view, center, zoom])

    useEffect(() => {
        if (view !== null && view.map !== null) {
            if (locations.length > 0) {
                let found = null
                view.map.layers.forEach(layer => {
                    if (layer.id === 'locationLayer') {
                        found = layer
                    }
                })
                if (found !== null) {
                    view.map.layers.remove(found)
                }
                const graphicsLayer = new GraphicsLayer()
                graphicsLayer.id = 'locationLayer'
                view.map.layers.add(graphicsLayer)
                locations.forEach(location => {
                    const maxDetection = location.detections.length > 0 ? Math.max(...location.detections.map(detection => detection.confidenceScore)) : 0
                    let markerSymbol
                    if (location.detections.length === 0) {
                        markerSymbol = markerSymbolGrey
                    } else if (location.detections.length > 0 && maxDetection < 0.25) {
                        markerSymbol = markerSymbolGreen
                    } else if (location.detections.length > 0 && maxDetection >= 0.25 && maxDetection < 0.90) {
                        markerSymbol = markerSymbolYellow
                    } else {
                        markerSymbol = markerSymbolRed
                    }

                    const graphic = new Graphic({
                        geometry: {
                            type: 'point',
                            ...location
                        },
                        symbol: markerSymbol,
                        attributes: {
                            cameraId: location.id ? location.id : null
                        }
                    })

                    graphicsLayer.add(graphic)

                    const textSymbol = new TextSymbol({
                        color: skin === 'dark' ? 'white' : 'black',
                        text: location.camera_name.toUpperCase(),
                        xoffset: 0,
                        yoffset: -25,
                        font: {
                            size: 12,
                            weight: "bolder"
                        }
                    })

                    const textGraphic = new Graphic({
                        geometry: {
                            type: 'point',
                            ...location
                        },
                        symbol: textSymbol,
                        attributes: {
                            cameraId: location.id ? location.id : null
                        }                    
                    })
                    graphicsLayer.add(textGraphic)

                    if (location.detections.length > 0) {
                        const svgMarker = "M38.6,0H5.3C2.4,0,0,2.4,0,5.3V32c0,2.9,2.4,5.3,5.3,5.3h9.8l7.3,6.7l6.7-6.7h9.6c2.9,0,5.3-2.4,5.3-5.3V5.3 C44,2.4,41.6,0,38.6,0z"
                        const symbol = {
                            type: "simple-marker",
                            path: svgMarker,
                            text: "2",
                            xoffset: 0,
                            yoffset: 24,
                            color: "black",
                            size: "22px",
                            font: {
                                size: 12,
                                weight: "bolder",
                                color: "white"
                            }
                        }
                        const svgGraphic = new Graphic({
                            geometry: {
                                type: 'point',
                                ...location
                            },
                            symbol,
                            attributes: {
                                cameraId: location.id ? location.id : null
                            }
                        })
                        graphicsLayer.add(svgGraphic)

                        const detectionSymbol = new TextSymbol({
                            color: 'white',
                            text: location.detections.length,
                            xoffset: 0,
                            yoffset: 23,
                            font: {
                                size: 8,
                                // family: `"Montserrat", Helvetica, Arial, serif`,
                                weight: "bolder"
                            }
                        })

                        const detectionGraphic = new Graphic({
                            geometry: {
                                type: 'point',
                                ...location
                            },
                            symbol: detectionSymbol,
                            attributes: {
                                cameraId: location.id ? location.id : null
                            }
                        })
                        graphicsLayer.add(detectionGraphic)
                    }
                })
            }
        }
    }, [locations])

    return <div ref={mapRef} className='mapContainer' style={{ height }} />

}

export default CameraMapView