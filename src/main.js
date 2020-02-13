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

    (async () => {
      let bikeServise = new BikeService();
      const response = await bikeServise.searchBikeByCity(city);
      getElements(response);
    })();
    
    function getElements(response) {
      const bikesArr = response.bikes;
      const manufacturerArr = [];
      console.log(manufacturerArr);
      if (response) {
        for (let i = 0; i<bikesArr.length; i++) {
          manufacturerArr.push(`${response.bikes[i].manufacturer_name}`);

          $('#bikes').append(`<tr id ="bike-table" >
          <td><img class="img-size" src='${response.bikes[i].large_img}'></td>
          <td> ${response.bikes[i].manufacturer_name} </td>
          <td>${response.bikes[i].stolen_location}</td>
          <td>${response.bikes[i].frame_colors}</td></tr><br>
          `);
        }
      } else {
        $('#bikes').text("There was an error handling your request.");
      }
      
      let mostManufac = 1;
      let count = 0;
      let manufacturerName;
      for (let i=0; i<manufacturerArr.length; i++) {
        for (let j=0; j<manufacturerArr.length; j++) {
          if (manufacturerArr[i] === manufacturerArr[j]) {
            count++;
          }
          if ( mostManufac < count ) {
            mostManufac = count;
            manufacturerName = manufacturerArr[i];
          }
        }
        count = 0;
        console.log(manufacturerName);
      } return manufacturerName;
    }
  });

  $("#learn-btn").click(function(){
    event.preventDefault();
    
    (async () => {
      let bikeServise = new BikeService();
      const response = await bikeServise.countBike();
      getElements(response);
    })();

    function getElements(response) {
      $("#stolen-bikes").html(`${response.stolen}`);
      console.log(response);
    }
  });

});                                             