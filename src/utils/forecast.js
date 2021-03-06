import request from "request";

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/865703ee81de9eff21430d7f82ff8d91/${lat},${long}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the internet", undefined);
    } else if (body.error) {
      callback(`Can't find location, please review input`, undefined);
    } else {
      const { currently } = body;
      const output = `${body.daily.data[0].summary} It is currently ${currently.temperature}°c out. There is a ${currently.precipProbability} percent chance of rain. <br> <b>Timezone:</b> ${body.timezone}. <br> <b>Expected Temperature range:</b> ${body.daily.data[0].temperatureLow}°c to ${body.daily.data[0].temperatureHigh}°c`;
      callback(undefined, output);
    }
  });
};

export default forecast;
