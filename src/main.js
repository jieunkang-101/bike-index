import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { BikeService } from './bike-service';
// import './bike-service';
$(document).ready(function() {
  $("form").submit(function() {
    event.preventDefault();
    let city = $("#location").val();
    $("#location").val("");
   
    // (async () => {
    //   let response = await fetch(`https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location=${city}&distance=10&stolenness=proximity&access_token=api_key`);
    //   console.log(response);
    //   let jsonifiedResponse = await response.json();
    //   getElements(jsonifiedResponse);
    //   console.log(jsonifiedResponse);
    // }) ();

    (async () => {
      let bikeServise = new BikeService();
      const response = await bikeServise.searchBikeByCity(city);
      getElements(response);
    })();

    function getElements(response) {
      const bikesArr = response.bikes;
      
      for (var i = 0; i<bikesArr.length; i++) {
        $('#bikes').append(`<tr id ="bike-table" >
        <td><img class="img-size" src='${response.bikes[i].large_img}'></td>
        <td> ${response.bikes[i].manufacturer_name} </td>
        <td>${response.bikes[i].stolen_location}</td></tr><br>
        `);
      } 
    }
  });
});                                              
  // $(document).ready(function() {
  //   $("form").submit(function(event) {
//     event.preventDefault();

//     let city = $("#location").val();
//     $("#location").val("");

//     (async () => {
//       let bikeServise = new BikeServise();
//       const response = await bikeServise.searchBikeByCity(city);
//       getElements(response);
//     })();

//     function getElements(response) {
//       $('#output').append(`${response.stolen_location}`);
//     }

//   })
// });
 