var app = angular.module('myApp', ['ui.bootstrap']);
var formdata = new Object();
formdata.lat_local = -10.5;
formdata.long_local = -10.5;
formdata.asr_results = "Taiwanese";
formdata.language_local = "en-US";
//formdata.asr_results = "台灣小吃";
//formdata.language_local = "cmn-Hant-TW";

//var formdata = {asr_results:"Taiwanese",lat_local:-10.5,long_local:-10.5,language_local:"en-US"};
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
//    $http.get('ajax/getCustomers.php').success(function(data){
//    $http.post('ajax/getCustomers.php',{asr_results:"Taiwanese",lat_local:-10.5,long_local:-10.5,language_local:"en_US"})
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
