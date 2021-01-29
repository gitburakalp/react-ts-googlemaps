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
      {props.markers.map((marker, idx) =>
        marker.map((el, idx) => {
          <Marker
            key={idx}
            position={{ lat: el.latitude, lng: el.longitude }}
          />;
        })
      )}
    </MarkerClusterer>
  </GoogleMap>
));

class Test extends React.Component {
  componentWillMount() {
    this.setState({
      contactData: []
    });
  }

  componentDidMount() {
    this.setState({
      contactData: [
        {
          name: "Test",
          surname: "TestSurname",
          phones: [
            {
              phone1: "phone",
              phone2: "phone"
            }
          ],
          addresses: [
            {
              address1: [
                {
                  lat: 13,
                  long: 22
                }
              ],
              address2: [
                {
                  lat: 44,
                  long: -8
                }
              ]
            }
          ]
        }
      ]
    });

    // var arr = [];
    // ADRESLER.map(adres => {
    //   var url = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+${adres}&key=${API_KEY}`;
    //   const getMarkers = async () => {
    //     const response = await fetch(url);
    //     if (response.status !== 400) {
    //       const content = await response.json();
    //       content.results.map(res => {
    //         var loc = res.geometry.location;
    //         arr.push(loc);
    //       });
    //       this.setState({ markers: arr });
    //     }
    //   };
    //   getMarkers();
    // });
  }

  render() {
    const { contactData } = this.state;

    contactData.map(el => {
      el.addresses.map((address, idx) => {
        address.map(el => {
          console.log(el);
        });
      });
    });

    return <div />;
  }
}

export default Test;
