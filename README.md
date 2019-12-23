# geocode-to-pincode

A small package to extract out pincode for any location using geocodes (latitudes and longitudes)

## Installation

```bash
npm i geocode-to-pincode
```

## Usage

```node
const geocodeToPincode = require("geocode-to-pincode");

geocodeToPincode({lat: 28.591, lng: 77.319, key: 'you-google-maps-api-key'})
  .then(response => console.log(response.pincode)) // prints '201301'
  .catch(error => console.log(error)) // prints error object as is

// if for some reason pincode doesn't exist for that location
// then it prints 'NotFound' without error, this case will mostly
// not be there if the location is valid, meaning, location has a
// pincode associated with it
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.