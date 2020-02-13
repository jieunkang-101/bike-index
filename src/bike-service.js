

export class BikeService {
  async searchBikeByCity(city) {
    try {
      let response = await fetch(`https://bikeindex.org:443/api/v3/search?&location=${city}&distance=10&stolenness=proximity&access_token=api_key`);
      let jsonifiedResponse;
      if ( response.ok && response.status === 200 ) { 
        jsonifiedResponse = await response.json();
      } else {
        jsonifiedResponse = false;
      } 
      return jsonifiedResponse;
    } catch(error) {
      return false;
    } 
  }







  async countBike() {
  let response  = await fetch(`https://bikeindex.org:443/api/v3/search/count?location=IP&distance=10&stolenness=stolen&access_token=api_key`);
  let jsonifiedResponse = await response.json();
  console.log(jsonifiedResponse);
  return jsonifiedResponse;
  }
}


