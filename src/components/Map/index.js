import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { googleMapApiKey } from "../../config/apiUrl";

const Map = ({ locations, containerStyle }) => {
  const [directions, setDirections] = useState(null);
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapApiKey,
  });

  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();
    const waypoints = locations.slice(1, -1).map((location) => ({
      location: new window.google.maps.LatLng(location.lat, location.lng),
      stopover: false,
    }));

    directionsService.route(
      {
        origin: new window.google.maps.LatLng(
          locations[0].lat,
          locations[0].lng
        ),
        destination: new window.google.maps.LatLng(
          locations[locations.length - 1].lat,
          locations[locations.length - 1].lng
        ),
        waypoints,
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(
            result.routes[0].overview_path.map((p) => ({
              lat: p.lat(),
              lng: p.lng(),
            }))
          );
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [locations]);

  const midPoint = getMidpoint(locations);
  const distance = getDistance(locations[0], locations[1]);
  const zoomLevel = getZoomLevel(distance);

  if (loadError) {
    return <div>unable to load map</div>;
  }

  return (
    <div>
      <h1>Map</h1>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={midPoint}
          zoom={zoomLevel}
        >
          <>
            {locations?.map((location, index) => (
              <Marker key={index} position={location} />
            ))}
            {directions !== null && (
              <Polyline
                path={directions}
                options={{
                  strokeColor: "#FF0000",
                  strokeOpacity: 1,
                  strokeWeight: 4,
                }}
              />
            )}
          </>
        </GoogleMap>
      ) : (
        <>loading...</>
      )}
    </div>
  );
};

export default Map;

const getMidpoint = (locations) => {
  const latSum = locations.reduce((acc, curr) => acc + curr.lat, 0);
  const lngSum = locations.reduce((acc, curr) => acc + curr.lng, 0);
  const midpoint = {
    lat: latSum / locations.length,
    lng: lngSum / locations.length,
  };
  return midpoint;
};

const getDistance = (location1, location2) => {
  const lat1 = location1?.lat;
  const lon1 = location1?.lng;
  const lat2 = location2?.lat;
  const lon2 = location2?.lng;

  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // in metres
  return distance;
};

const getZoomLevel = (distance) => {
  // set zoom level based on distance between locations
  if (distance < 1000) {
    return 14;
  } else if (distance < 5000) {
    return 13;
  } else if (distance < 10000) {
    return 12;
  } else if (distance < 20000) {
    return 11;
  } else if (distance < 50000) {
    return 10;
  } else {
    return 9;
  }
};
