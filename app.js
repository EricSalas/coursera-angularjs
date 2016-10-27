(function(){

'use strict'; //para que las var no declaradas no se declaren en global

/**angular.module('myFirstApp',[])

.controller('myFirstController', function($scope){

$scope.country = "China";

$scope.nextCountry = function(){

return country;
};

});**/




angular.module('calculatorApp',[])

.controller('calculatorController',function($scope){

$scope.name = "";
$scope.totalValue = 0;

$scope.displayNumeric = function(){
	var totalNameValue = calculateNumericForString($scope.name);
	$scope.totalValue = totalNameValue;

};

function calculateNumericForString(string){

	var totalStringValue = 0;
	for (var i = 0; i <string.length; i++) {
		totalStringValue += string.charCodeAt(i);
	}

	return totalStringValue;


}


});



})();