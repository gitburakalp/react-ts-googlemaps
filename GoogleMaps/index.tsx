import React, { useEffect, useState } from "react";
import fetch from "isomorphic-fetch";
import { compose, withProps, withHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";

const API_KEY = "AIzaSyDF98ueUQD0nn_26-_RglOtLdkXjsKaEnA";
const ADRESLER = [
  "İSTANBUL / Beşiktaş",
  "ANKARA / Merkez",
  "İZMİR / Merkez",
  "ANTALYA / Konyaaltı",
  "LONDRA",
  "NEW YORK"
];

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withHandlers({
    onMarkerClustererClick: () => markerClusterer => {
      const clickedMarkers = markerClusterer.getMarkers();
      console.log(`Current clicked markers length: ${clickedMarkers.length}`);
      console.log(clickedMarkers);
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={3} defaultCenter={{ lat: 39.925533, lng: 32.866287 }}>
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          key={marker.photo_id}
          position={{ lat: marker.latitude, lng: marker.longitude }}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

interface StateInterface {
  markers: Array<string>;
}

class Test extends React.Component<StateInterface> {
  componentWillMount() {
    this.setState({ markers: [] });
  }

  componentDidMount() {
    var arr = [];

    ADRESLER.map(adres => {
      var url = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+${adres}&key=${API_KEY}`;

      const getMarkers = async () => {
        const response = await fetch(url);
        if (response.status !== 400) {
          const content = await response.json();

          content.results.map(res => {
            var loc = res.geometry.location;

            arr.push(loc);
          });

          this.setState({ markers: arr });
        }
      };

      getMarkers();
    });
  }

  render() {
    console.log(this.state.markers);

    return <div />;
  }
}

export default Test;
