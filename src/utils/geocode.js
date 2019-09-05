import request from "request";

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic2lqdWFkZSIsImEiOiJjanp2MmkzeDMwOTZvM2JtcnRrZ2xxaTZuIn0.XWX0FUAaJwx6sBUJkfpk1A&limit=1`;

  //request({ url, json: true }, (error, { body: { features } }) => {
  request({ url, json: true }, (error, { body: { features } = {} } ) => {
    if (error) {
      callback(
        "Unable to connect, please review your network settings",
        undefined
      );
    } else if (features.length === 0) {
      callback("No matching results, please enter a more specific term", undefined);
    } else {
      const longitude = features[0].center[0];
      const latitude = features[0].center[1];
      // const location = response.body.features[0].place_name;
      const location = features[0].place_name;

      callback(undefined, {
        longitude,
        latitude,
        location
      });
    }
  });
};

export default geocode;
