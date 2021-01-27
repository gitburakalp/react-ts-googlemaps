import React, { useEffect } from "react";
import fetch from "isomorphic-fetch";

const API_KEY = "AIzaSyDF98ueUQD0nn_26-_RglOtLdkXjsKaEnA";
const ADRESLER = [
  "İSTANBUL / Beşiktaş",
  "ANKARA / Merkez",
  "İZMİR / Merkez",
  "ANTALYA / Konyaaltı",
  "LONDRA",
  "NEW YORK"
];

const Test: React.FC = () => {
  interface StateInterfaceItems {
    id: number;
    lat: number;
    lng: number;
  }

  interface StateInterfaceItems extends Array<StateInterfaceItems> {}

  useEffect(() => {
    ADRESLER.map(adres => {
      var url = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+${adres}&key=${API_KEY}`;

      const getMarkers = async () => {
        const response = await fetch(url);
        if (response.status !== 400) {
          const content = await response.json();

          content.results.map(res => {
            var loc = res.geometry.location;
            console.log(loc.lat);
          });
        }
      };

      getMarkers();
    });
  });

  return <div>TEST</div>;
};

export default Test;
