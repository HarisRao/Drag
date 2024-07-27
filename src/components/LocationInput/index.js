import React, { useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getZipCode,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const LocationInput = ({
  setAddress,
  address,
  setCoordinates,
  setAddressDetail,
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();
    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);

    let country = "";
    let city = "";
    let state = "";
    let addrComp = results[0].address_components;
    for (let i = 0; i < addrComp.length; ++i) {
      if (addrComp[i].types.includes("administrative_area_level_1"))
        state = addrComp[i].long_name;
      else if (addrComp[i].types.includes("locality"))
        city = addrComp[i].long_name;
      else if (addrComp[i].types.includes("country"))
        country = addrComp[i].long_name;
      //we can break early if we find all three data
      if (state !== "" && city !== "" && country !== "") break;
    }
    setAddress(val);
    setAddressDetail({
      country,
      state,
      city,
    });
    setCoordinates({
      lat,
      lng,
    });
  };

  useEffect(() => {
    setValue(address, false);
    clearSuggestions();
  }, [address]);
  return (
    <div>
      <h1>LocationInput</h1>
      <Combobox onSelect={handleSelect} aria-labelledby="demo">
        <ComboboxInput
          value={value}
          placeholder={"Search Address"}
          onChange={(e) => setValue(e?.target?.value)}
          disabled={!ready}
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default LocationInput;
