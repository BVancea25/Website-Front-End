import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import "../CSS/Locatie.css";

const Locatie = () => {
  const [latitude, setLat] = useState(null);
  const [longitude, setLng] = useState(null);

  useEffect(() => {
    axios
      .get("/locatii")
      .then((res) => {
        setLat(res.data.latitude);
        setLng(res.data.longitude);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <GoogleMap
      zoom={15}
      center={{ lat: latitude, lng: longitude }}
      mapContainerClassName="map-container"
    >
      <MarkerF position={{ lat: latitude, lng: longitude }}></MarkerF>
    </GoogleMap>
  );
};

export default Locatie;
