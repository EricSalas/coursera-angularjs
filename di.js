

(function(){

'use strict';



angular.module('diApp',[])


.controller('expController',exp);

exp.$inject = ['$scope'];

function exp($scope){

$scope.name = "Eric";

$scope.sayMsg = function(){

	return "Hello World!";
}

$scope.foto = "http://colinasdelsolcr.com/wp-content/uploads/2016/10/21.jpg"



$scope.nextDestination = function(){

	$scope.foto = "http://ichef.bbci.co.uk/news/624/cpsprodpb/3C4D/production/_85373451_china_shanghai_aerial2010_getty.jpg";
}

}


/**
.controller('diController',controlador);
//.controller('diController',['$scope','$filter',controlador]); //controlador es la function

controlador.$inject = ['$scope','$filter'];

	function controlador($scope, $filter){





	$scope.name = "Eric";


	$scope.upper = function(){

		var upWord = $filter('uppercase');
		$scope.name = upWord($scope.name);
	};


}; // fin ctrl
**/









})(); //Fin function