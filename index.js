var url = require("url");
var axios = require("axios");

exports.getPinCode = function(options) {
  var coordinates = `${options.lat},${options.lng}`;
  var query = {
    latlng: coordinates,
    key: options.key || process.env.GOOGLE_MAPS_API_KEY
  };
  var path = "https://maps.googleapis.com/maps/api/geocode/json";
  var requestUrl = url.format({pathname: path, query: query});
 
  return axios.get(requestUrl)
    .then((response) => {
      response = response.data.results[0].address_components;
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