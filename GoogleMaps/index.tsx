import React, { useEffect, useState } from "react";
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
  interface StateInterfaceItem {
    id: number;
    lat: number;
    lng: number;
  }

  interface StateInterface {
    StateInterfaceItems: StateInterfaceItem[];
  }

  const [id, setID] = useState<StateInterfaceItem>({
    id: 0
  });

  useEffect(() => {
    ADRESLER.map(adres => {
      var url = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+${adres}&key=${API_KEY}`;

      const getMarkers = async () => {
        const response = await fetch(url);
        if (response.status !== 400) {
          const content = await response.json();

          content.results.map((res, idx) => {
            var loc = res.geometry.location;

            result.push({
              id: idx,
              lat: loc.lat,
              lng: loc.lng
            });

            console.log(result);
          });
        }
      };
    });
  });

  return <div>TEST</div>;
};

export default Test;
