"use client"
import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, NavigationControl, Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import axios from 'axios';
import { decode } from '@mapbox/polyline';
import randomColor from 'randomcolor';
const MAPBOX_TOKEN = "pk.eyJ1IjoiYWRyaWFuZmgiLCJhIjoiY2xmbWpqemR4MGM4MjQ0bnJoempobTE4byJ9.1w9_l2cCHgwDwqjnyZ-bmw"


function MapDB({coords}) {
 
  
  
    return (
      <div className="flex justify-center lg:text-lg py-2 px-2" style={{ position: 'relative', height: '100vh', borderRadius: "15px"}}>
        <ReactMapGL
          initialViewState={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            zoom: 8
          }}
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v11"
        >
          <div style={{ position: 'absolute', right: 10, top: 10 }}>
            <NavigationControl />
          </div>
        </ReactMapGL>
      </div>
    );
  }
  
export default MapDB