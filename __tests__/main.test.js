const geocodeToPincode = require("../index");

describe('Extracting pincode from geocode', () => {
  describe('Noida', () => {
    test('Pincode: Sector 6', () => {
      geocodeToPincode({lat: 28.591, lng: 77.319})
        .then(response => {
          expect(response.pincode).toBe('201301');
        })
    })
  })
})