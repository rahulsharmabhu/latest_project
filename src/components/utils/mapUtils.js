import ArcGISMap from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery"
import Expand from "@arcgis/core/widgets/Expand"

export default async function createMapView(container, currentBaseMap, center, zoom) {

    const webmap = new ArcGISMap({
        basemap: currentBaseMap
    })

    const mapOptions = {
        container,
        map: webmap,
        center,
        zoom
    }

    mapOptions.ui = {
        components: ['zoom']
    }

    const mapView = new MapView(mapOptions)

    const basemapGallery = new BasemapGallery({
        view: mapView,
        container: document.createElement("div")
    })

    const bgExpand = new Expand({
        view: mapView,
        content: basemapGallery
    })
    mapView.ui.add(bgExpand, "top-right")

    return mapView
}
