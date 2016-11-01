

(function(){

'use strict';



angular.module('diApp',[])


.controller('expController',exp)
.filter('hello',HelloFilter) //paso 2 custom filters
.filter('free',FreeFilter);


//paso 3 custom filters
exp.$inject = ['$scope', '$filter','helloFilter'];

function exp($scope, $filter, helloFilter){

$scope.name = "Eric";
$scope.travelCost = .34;

$scope.sayMsg = function(){
var msg = "Hello World!";
var output = $filter('uppercase')(msg);
return output;	
}

$scope.sayByeMsg = function(){
var msg = "Hello World!";
var msg = helloFilter(msg);
return msg;	
}

$scope.foto = "http://colinasdelsolcr.com/wp-content/uploads/2016/10/21.jpg"



$scope.nextDestination = function(){

	$scope.foto = "http://ichef.bbci.co.uk/news/624/cpsprodpb/3C4D/production/_85373451_china_shanghai_aerial2010_getty.jpg";
}

}

//FACTORY FUNCTION

//paso 1 custom filters
function HelloFilter(){


	return function (input){
		input = input || "";
		input = input.replace('Hello','Bye');
		return input;


	};
}



function FreeFilter(){

	return function(input, target,replace){
input = input || "";
		input = input.replace(target,replace);
		return input;
	};
}


})(); //Fin function