import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, LayersControl, LayerGroup, FeatureGroup, Circle } from "react-leaflet";
import L from 'leaflet';
import './map.css'
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { cameras } from "./mapData";
import fireIcon from '../../assets/images/fire.png'
import waterIcon from '../../assets/images/water.png'
import windIcon from '../../assets/images/wind.png'
import { EditControl } from "react-leaflet-draw";
import { Icon } from '@iconify/react';
import KML from 'react-leaflet-kml'

const CAMERAS_TYPES = ["Fire", "Water", "Wind"];

const Map = ({ latitude , longitude  }) => {
  const [positions, setPositions] = useState([]);
  const mapRef = useRef(null);
  const [fireVisible, setFireVisible] = useState(false);
  const [waterVisible, setWaterVisible] = useState(false);
  const [windVisible, setWindVisible] = useState(false);
  const [isLayerShow, setIsLayerShow] = useState(false)
  const [kml, setKml] = useState(null)
  const kmlLayerRef = useRef(null)

  const fireIconCustom = new L.Icon({
    iconUrl: fireIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  const waterIconCustom = new L.Icon({
    iconUrl: waterIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  const windIconCustom = new L.Icon({
    iconUrl: windIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  const iconMapping = {
    "Fire": fireIconCustom,
    "Water": waterIconCustom,
    "Wind": windIconCustom
  };
  const groupedByType = {};

  // Group cameras by type
  cameras.forEach((cameras) => {
    const type = cameras.type;
    if (!groupedByType[type]) {
      groupedByType[type] = [];
    }
    groupedByType[type].push(cameras);
  });

  useEffect(() => {
    if (isValidCoordinate(latitude) && isValidCoordinate(longitude)) {
      const newPosition = [latitude, longitude];
      setPositions((prevPositions) => [...prevPositions, newPosition]);
      // UNCOMMENT THIS LINE AND REMOVE PARAMETER VALUE TO MAKE MAP WORK
      mapRef.current.flyTo(newPosition, 13);        
    }
  }, [latitude, longitude]);

  const isValidCoordinate = (coord) => {
    return typeof coord === 'number' && !isNaN(coord);
  };

  const _onCreated = e => {
    // alert("test");

    let type = e.layerType;
    let layer = e.layer;
    if (type === "marker") {
      // Do marker specific actions
      console.log("_onCreated: marker created", e);
    } else {
      console.log("_onCreated: something else created:", type, e);
    }

    console.log("Geojson", layer.toGeoJSON());
    console.log("coords", layer.getLatLngs());
  };

  const handleLayerClick = () => {
    if(isLayerShow){
      setIsLayerShow(false)
    } else {
      setIsLayerShow(true)
    }
  }

  //kml 
  useEffect(() => {
    fetch('/assets/Macquarie.kml')
    .then(res => res.text())
    .then(kmlText => {
      const parser = new DOMParser();
      const kmlDom = parser.parseFromString(kmlText, 'text/xml');
      setKml(kmlDom)
    })
  },[])


  useEffect(() => {
    if(kml && kmlLayerRef.current){
      if(!kmlLayerRef.current._map){
        kmlLayerRef.current.addTo(mapRef.current)
      }

      kmlLayerRef.current.eachLayer((layer) => {
        if(layer instanceof L.Marker){
          layer.on('click', (e) => {
            alert(`KML Marker Latitude: ${e.latlng.lat} \nKML Marker Longitude: ${e.latlng.lng}`)
          })
        }
      })
    }
  },[kml])

  return (
    <div className="d-flex h-100 w-100">
      <div className="d-flex flex-column flex-shrink-0 bg-light">
        <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
          <div className="btn-group dropend">
            <button className="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              onClick={handleLayerClick}
            >
              <Icon icon="lucide:layers" />
            </button>
            {
              isLayerShow && (
                <ul className="dropdown-menu d-flex flex-column mt-2 ms-5">
                  <li>
                    <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setFireVisible(!fireVisible) }}>
                      <input type="checkbox" checked={fireVisible} onChange={() => setFireVisible(!fireVisible)} /> Fire
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setWaterVisible(!waterVisible) }}>
                      <input type="checkbox" checked={waterVisible} onChange={() => setWaterVisible(!waterVisible)} /> Water
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setWindVisible(!windVisible) }}>
                      <input type="checkbox" checked={windVisible} onChange={() => setWindVisible(!windVisible)} /> Wind
                    </a>
                  </li>
                </ul>
              )
            }

          </div>
        </ul>
      </div>

      <div className="w-100">
        <MapContainer
          className="w-100 h-100"
          center={positions.length > 0 ? positions[positions.length - 1] : [-41.1592436, 146.1949914]}
          zoom={5}
          ref={mapRef}
        >

          {fireVisible && groupedByType["Fire"]?.map((cameras) => (
            <Marker key={cameras.id} position={cameras.coordinates} icon={iconMapping["Fire"]}>
              <Popup>{cameras.name}</Popup>
            </Marker>
          ))}

          {waterVisible && groupedByType["Water"]?.map((cameras) => (
            <Marker key={cameras.id} position={cameras.coordinates} icon={iconMapping["Water"]}>
              <Popup>{cameras.name}</Popup>
            </Marker>
          ))}

          {windVisible && groupedByType["Wind"]?.map((cameras) => (
            <Marker key={cameras.id} position={cameras.coordinates} icon={iconMapping["Wind"]}>
              <Popup>{cameras.name}</Popup>
            </Marker>
          ))}


          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {positions.length > 0 && (
            <Marker
              position={positions[positions.length - 1]}
            // eventHandlers={{
            //   click: () => {
            //     alert(`Location Marker clicked!`);
            //     console.log("Marker is clicked");
            //   }
            // }}
            >
              <Popup>
                Latest Position
              </Popup>
            </Marker>
          )}
          <LayersControl position="topright">
            {CAMERAS_TYPES.map((type, index) => (
              <LayersControl.Overlay key={index} name={type}>
                <LayerGroup>
                  {groupedByType[type]?.map((cameras) => (
                    <Marker key={cameras.id} position={cameras.coordinates} icon={iconMapping[type]}>
                      <Popup>{cameras.name}</Popup>
                    </Marker>
                  ))}
                </LayerGroup>
              </LayersControl.Overlay>
            ))}
          </LayersControl>
          {positions.length > 1 && (
            <Polyline positions={positions} color="red" dashArray="2, 10" />
          )}
          <FeatureGroup>
            <EditControl
              position='topright'
              onCreated={_onCreated}
              draw={{
                rectangle: false
              }}
            />
            <Circle center={[51.51, -0.06]} radius={200} />
          </FeatureGroup>

          {kml && <KML kml={kml} ref={kmlLayerRef} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;

