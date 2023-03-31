"use client"
import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, NavigationControl, Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import axios from 'axios';
import { decode } from '@mapbox/polyline';
import randomColor from 'randomcolor';
const MAPBOX_TOKEN = "pk.eyJ1IjoiYWRyaWFuZmgiLCJhIjoiY2xmbWpqemR4MGM4MjQ0bnJoempobTE4byJ9.1w9_l2cCHgwDwqjnyZ-bmw"


function NewMap({mapData}) {
    const [routes, setRoutes] = useState([]);
    useEffect(() => {
      const fetchRoutes = async () => {
        const startEndPoints = mapData.map(({ startpoint, endpoint }) => ({
          start: startpoint,
          end: endpoint,
        }));
        const requests = startEndPoints.map(({ start, end }) => axios.get(`https://api.mapbox.com/directions/v5/mapbox/cycling/${start};${end}?access_token=${MAPBOX_TOKEN}`));
        const responses = await Promise.all(requests);
        const routeData = responses.map(response => {
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
          return geojson;
        });
        setRoutes(routeData);
      };
      fetchRoutes();
    }, [mapData]);

    const getRandomColor = () => randomColor();
  
    return (
      <div className="flex justify-center lg:text-lg py-2 px-2" style={{ position: 'relative', height: '100vh', borderRadius: "15px"}}>
        <ReactMapGL
          initialViewState={{
            latitude: mapData[0].startpoint[1] || 5.11,
            longitude: mapData[0].startpoint[0] || 5.11,
            zoom: 8
          }}
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v11"
        >
          {routes.map((route, index) => (
            <Source key={`route-${index}`} id={`route-${index}`} type="geojson" data={route.geometry}>
              <Layer
                id={`route-${index}`}
                type="line"
                paint={{
                  'line-color': getRandomColor(),
                  'line-width': 3
                }}
              />
            </Source>
          ))}

          <div style={{ position: 'absolute', right: 10, top: 10 }}>
            <NavigationControl />
          </div>
        </ReactMapGL>
      </div>
    );
  }
  
export default NewMap