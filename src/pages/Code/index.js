import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import LocationInput from "../../components/LocationInput";
import Map from "../../components/Map";
import AuctionCard from "../../components/AuctionCard";
import EditMap from "../../components/EditMap";

const Code = () => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [addressDetail, setAddressDetail] = useState(null);

  useEffect(() => {
    console.log(address, "address");
    console.log(coordinates, "coordinates");
    console.log(addressDetail, "addressDetail");
  }, [address, coordinates, addressDetail]);

  const locations = [
    { lat: 37.7749, lng: -122.4194 },
    { lat: 37.3382, lng: -121.8863 },
  ];
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const startTime = "2023-09-21T07:00:00.000Z";
  const endTime = "2023-09-21T08:00:00.000Z";

  return (
    <Container className="m-5 p-5">
      <LocationInput
        setAddress={setAddress}
        setCoordinates={setCoordinates}
        setAddressDetail={setAddressDetail}
        address={address}
      />
      {coordinates !== null && (
        <EditMap
          setCoordinates={setCoordinates}
          coordinates={coordinates}
          setAddress={setAddress}
        />
      )}
      {/* <Map locations={locations} containerStyle={containerStyle} /> */}
      <AuctionCard startTime={startTime} endTime={endTime} />
    </Container>
  );
};

export default Code;
