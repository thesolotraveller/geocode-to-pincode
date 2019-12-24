var url = require("url");
var https = require("https");

function httpPromise (requestUrl) {
  return new Promise ((res, rej) => {
    https
      .get(requestUrl, (resp) => {
        let data = '';
        resp.on('data', (chunk) => { data += chunk; });
        resp.on('end', () => res(data));
      })
      .on("error", (err) => rej("Error: " + err.message));
  })
}

function geocodeToPincode (options) {
  var coordinates = `${options.lat},${options.lng}`;
  var query = {
    latlng: coordinates,
    key: options.key || process.env.GOOGLE_MAPS_API_KEY
  };
  var path = "https://maps.googleapis.com/maps/api/geocode/json";
  var requestUrl = url.format({pathname: path, query: query});
 
  return httpPromise(requestUrl)
    .then((response) => {
      response = JSON.parse(response);
      if (response.error_message) throw new Error(response.error_message);
      response = response.results[0].address_components;
      var isFound = false;
      var res = {};
      for (let i=0; i<response.length; i++) {
        if (response[i].types.includes('postal_code')) {
          isFound = true;
          res.pincode = response[i].long_name;
          break;
        }
      }

      return isFound ? res : {error: 'NotFound'};
    })
}

module.exports = geocodeToPincode;