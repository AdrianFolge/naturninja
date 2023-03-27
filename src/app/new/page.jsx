"use client"
import SubmitForm from "@/components/Submit"
import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, NavigationControl, Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import axios from 'axios';
import { decode } from '@mapbox/polyline';
const MAPBOX_TOKEN = "pk.eyJ1IjoiYWRyaWFuZmgiLCJhIjoiY2xmbWpqemR4MGM4MjQ0bnJoempobTE4byJ9.1w9_l2cCHgwDwqjnyZ-bmw"

function New() {
  const [startPoint, setStartPoint] = useState([10.400212886496497, 63.41629757764976]);
  const [endPoint, setEndPoint] = useState([10.600212886496497, 63.51629757764976]);
  const [route, setRoute] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${startPoint};${endPoint}?access_token=${MAPBOX_TOKEN}`
      );
      const data = response.data;
      const polyline = data.routes[0].geometry;
        const decodedPolyline = decode(polyline);
        const geojson = {
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: decodedPolyline.map(coords => [coords[1], coords[0]])
        }
        };
        setRoute(geojson);
                };
    fetchData();
  }, [startPoint, endPoint]);
  const handleDragStartPoint = (event) => {
    setStartPoint([event.lngLat.lng,event.lngLat.lat]);

  }

  const handleDragEndPoint = (event) => {
    setEndPoint([event.lngLat.lng,event.lngLat.lat]);
  }
  return (
    <div className="max-w-6xl mx-auto space-y-4 p-4 grid grid-cols-2">
        <div>
            <SubmitForm startpoint={startPoint} endpoint={endPoint}/>
        </div>
        <div>
        <div className="flex justify-center lg:text-lg py-2 px-2 rounded-lg" style={{ position: 'relative', height: '400px'}}>
                <ReactMapGL
                    initialViewState={{
                        latitude: 63.41629757764976,
                        longitude: 10.400212886496497,
                        zoom: 8
                        }}
                    mapboxAccessToken={MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                >
                {route && (
                    <Source id="route" type="geojson" data={route.geometry}>
                    <Layer
                        id="route"
                        type="line"
                        paint={{
                        'line-color': '#FF0000',
                        'line-width': 3
                        }}
                    />
                    </Source>
                )}
                <Marker latitude={startPoint[1]} longitude={startPoint[0]} draggable={true} onDrag={handleDragStartPoint}>
                </Marker>
                <Marker latitude={endPoint[1]} longitude={endPoint[0]} draggable={true} onDrag={handleDragEndPoint}>
                </Marker>
                <div style={{ position: 'absolute', right: 10, top: 10 }}>
                    <NavigationControl />
                </div>
            
                </ReactMapGL>
        </div>
        </div>
    </div>
  )
}

export default New