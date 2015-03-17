
var formdata = new Object();
formdata.lat_local = -10.5;
formdata.long_local = -10.5;
formdata.asr_results = "Taiwanese";
formdata.language_local = "en-US";
formdata.asr_results = "台灣小吃";
formdata.language_local = "cmn-Hant-TW";
var language_local = formdata.language_local;
//load default map before GPS detection
//map_default = new GMaps({
//    div: '#map_default',
//    lat: 34.126158, 
//    lng : -118.283564
//});
var app = angular.module('myApp', ['ui.bootstrap']);
app.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});
app.controller('customersCrtl', function ($scope, $http, $timeout) {
    $http.post('ajax/getCustomers.php',JSON.stringify(formdata)).success(function(data){
        $scope.list = data;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 5; //max no of items to display in a page
        $scope.filteredItems = $scope.list.length; //Initially for no filter  
        $scope.totalItems = $scope.list.length;
        $scope.language_local = formdata.language_local;
    });
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
});
		//jquery functions
//$(document).ready(function(){
//    // Function for Getting User's GPS Location
//    //Get latitude and longitude;
//    if (navigator.geolocation) {
//        navigator.geolocation.getCurrentPosition(success_GPS, error_GPS);
//    } // end of geo location
//    $('#asr_results').focus;
//}); // document.ready 
//function success_GPS(position) {
//        var lat_gps = position.coords.latitude;
//        var long_gps = position.coords.longitude;
//        var location_gps = "Lat = " + lat_gps + "Long = " + long_gps; 
////        $('#curr_latitude').html(lat_gps);
////        $('#curr_longitude').html(long_gps);
////        $("#content_response_status").css("display", "none");
//    console.log('GPS_success..' + language_local);
//    switch(language_local){
//    case "en-US":
//        //map_default
//        map_default.removeMarkers();
//        map_default.addMarker({
//            lat: lat_gps,
//            lng: long_gps,
//            title: 'Current_GPS_Loc',
//
//            infoWindow: {
//                content: '<p class = \'marker\'> You are here </p>'
//            }
//        });		
//
//        map_default.panTo({
//            lat: lat_gps,
//            lng: long_gps,
//        });
//        //map_response
//        map_response.removeMarkers();
//        map_response.addMarker({
//            lat: lat_gps,
//            lng: long_gps,
//            title: 'Current_GPS_Loc',
//
//            infoWindow: {
//                content: '<p class = \'marker\'> You are here </p>'
//            }
//        });		
//
//        map_response.panTo({
//            lat: lat_gps,
//            lng: long_gps,
//        });
//        break; 
//    case "cmn-Hant-TW":
//        //map_default
//        map_default.removeMarkers();
//        map_default.addMarker({
//            lat: lat_gps,
//            lng: long_gps,
//            title: 'Current_GPS_Loc',
//
//            infoWindow: {
//                content: '<p class = \'marker\'> 您的位置 </p>'
//            }
//        });		
//
//        map_default.panTo({
//            lat: lat_gps,
//            lng: long_gps,
//        });
//        //map_response
//        map_response.removeMarkers();
//        map_response.addMarker({
//            lat: lat_gps,
//            lng: long_gps,
//            title: 'Current_GPS_Loc',
//
//            infoWindow: {
//                content: '<p class = \'marker\'> 您的位置 </p>'
//            }
//        });		
//
//        map_response.panTo({
//            lat: lat_gps,
//            lng: long_gps,
//        });
//
//        break; 
//    }
//    }; // success function for GPS
//function error_GPS(position){
//alert("You must enable location services to use this website!");
//} 
app.directive('store',function(){

    return {
    
        restrict:  'E',
        transclude: true,
        template: 
"<table class = 'result_table' >\
<!--// 1st Row-->\
        <tr>\
<td colspan = '40'></td>\
</tr>\
<!--// 2nd Row-->\
<tr>\
	<td rowspan = '8'>  </td>\
	<td rowspan = '8' colspan = '8' id = 'Result_Search_Icon'>  <img class = 'search_image' src = {{data.Search_Icon}} >  </td>\
	<td></td>\
    <td rowspan = '3' colspan = '30' id = 'Result_Store_Name' ng-show=\"language_local == 'cmn-Hant-TW'\"> <a class='store_name' href = \"http://maps.google.com/?q={{data.Location}},{{data.City}},{{data.State}}\">{{data.Ch_Name}}</a></td>" + 
    "<td rowspan = '3' colspan = '30' id = 'Result_Store_Name' ng-show=\"language_local == 'en-US'\"> <a class='store_name' href = \"http://maps.google.com/?q={{data.Location}},{{data.City}},{{data.State}}\">{{data.Name}}</a></td>\
</tr>\
<!--// 3rd Row-->\
<tr>\
	<td></td>\
</tr>\
<!--// 4th Row-->\
<tr>\
	<td></td>\
</tr>\
<!--// 5th Row-->\
<tr>\
	<td></td>\
	<td rowspan = '3' colspan = '14' id = 'Result_Rating'>  <img class = 'search_image' src = \"https://7d5a8358caf234706aa43eb302808a160cf97bbe.googledrive.com/host/0Bx7hinBDE7n7ZEhlTVBGejNobjA/Tubbi_Stars_{{data.Rating}}.png\" }}> </td>\
	<td rowspan = '2' colspan = '4'>  </td>" +	
	"<td rowspan = '2' colspan = '12' id = 'Result_Distance'>  {{data.Distance}} miles  </td>\
<!--// 6th Row-->\
<tr>\
	<td></td>\
</tr>\
<!--// 7th Row-->\
<tr>\
	<td></td>\
	<td colspan= '16'>  </td>\
</tr>\
<!--// 8th Row-->\
<tr>\
	<td></td>\
	<td colspan = '30' rowspan = '2' id = 'Result_Address'>  {{data.Location}}, {{data.City}}, {{data.State}}</td>\
</tr></tr>\
</table>"
   }
});

