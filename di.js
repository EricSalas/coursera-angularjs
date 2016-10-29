




(function(){

'use strict';



angular.module('diApp',[])

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








})(); //Fin function