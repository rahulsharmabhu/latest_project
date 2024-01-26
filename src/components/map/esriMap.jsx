import { useCallback, useEffect, useRef, useState } from "react"
import { Card, CardBody } from "reactstrap"
import { useSkin } from "../../app-redux/hooks/useSkin"
import CameraMapView from "./CameraMapView"

const EsriMap = props => {
    const { cameradata, setcurrentCamera, zoom, center } = props
    const { skin } = useSkin()
    const mapContainerRef = useRef()
    const [height, setHeight] = useState('500px')

    const onResize = useCallback(() => {
        if (mapContainerRef.current) setHeight(mapContainerRef.current.clientHeight)
    }, [])

    useEffect(() => {
        window.addEventListener("resize", onResize)
        onResize()
        return () => {
            window.removeEventListener("resize", onResize)
        }
    }, [])

    return (
        <Card className='w-100'>
            <CardBody className="overflow-hidden p-0">
                <div ref={mapContainerRef} className='h-100'>
                    <CameraMapView basemap={skin === 'dark' ? 'streets-night-vector' : 'streets-vector'} center={center} zoom={zoom} locations={cameradata} setcurrentCamera={setcurrentCamera} height={height} />
                </div>
            </CardBody>
        </Card>
    )
}

export default EsriMap