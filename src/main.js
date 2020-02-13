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
      
      for (var i = 0; i<bikesArr.length; i++) {
        $('#bikes').append(`<tr id ="bike-table" >
        <td><img class="img-size" src='${response.bikes[i].large_img}'></td>
        <td> ${response.bikes[i].manufacturer_name} </td>
        <td>${response.bikes[i].stolen_location}</td></tr><br>
        `);
      } 
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