import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { googleMapApiKey } from "../../config/apiUrl";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const getReverseGeocode = (location) => {
  const geocoder = new window.google.maps.Geocoder();
  return new Promise((resolve, reject) => {
    geocoder.geocode(location, (results, status) => {
      if (status === "OK") {
        resolve(results);
      } else {
        reject(status);
      }
    });
  });
};

const EditMap = ({ coordinates, setCoordinates, setAddress }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapApiKey,
  });

  const onMarkerDragEnd = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const latLng = { lat, lng };
    const results = await getReverseGeocode({ location: latLng });
    const address = results[0].formatted_address;
    setAddress(address);
    setCoordinates(latLng);
  };
  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={12}
      >
        <Marker
          position={coordinates}
          draggable={true}
          onDragEnd={onMarkerDragEnd}
        />
      </GoogleMap>
    </div>
  );
};

export default EditMap;
