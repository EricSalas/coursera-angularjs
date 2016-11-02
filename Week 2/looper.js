(function(){

'use strict';



var list1 = ["China","Panama","Cuba"];

var list2 = [

{
	country: "China",
	when: "April"
},

{
	country: "Panama",
	when: "July"
},

{
	country:"Cuba",
	when:"July"
}





];

angular.module('looperApp',[])
.controller('LooperController',LooperController);


CounterController.$inject = ['$scope'];

function LooperController($scope){

	$scope.list1  = list1;
	$scope.list2 = list2;


$scope.addCountry = function(){

var newCountry = {
country: $scope.country,
when: $scope.when

};

$scope.list2.push(newCountry);

}

}




})();