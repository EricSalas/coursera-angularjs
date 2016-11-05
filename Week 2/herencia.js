(function(){


'use strict';

angular.module('controllerApp',[])
.controller('ParentController1', ParentController1)
.controller('ChildController1', ChildController1)
.controller('ParentController2', ParentController2)
.controller('ChildController2', ChildController2);


ParentController1.$inject = ['$scope'];
function ParentController1($scope){

	$scope.parentValue = 1;
	$scope.pc = this;
	$scope.pc.parentValue = 1;
}

ChildController1.$inject = ['$scope'];
function ChildController1($scope){

	console.log("$scope.parentValue:",$scope.parentValue );
	console.log("CHILD $scope:",$scope);

	$scope.parentValue = 5;

	console.log("$scope.parentValue after:",$scope.parentValue );
	console.log("CHILD $scope after:",$scope);

	$scope.pc.parentValue =  5;

	console.log("$scope.parentValue:",$scope.pc.parentValue );
	console.log("CHILD $scope after:",$scope);
	
}


//ParentController2.$inject = ['$scope'];
function ParentController2(/**$scope**/){ //no necesario scope,
	//agular lo hace solo
	var parent = this;
	parent.value = 1;
}

ChildController2.$inject = ['$scope'];
function ChildController2($scope){
	var child = this;
	child.value = 100;
	console.log('Child controller $scope', $scope);
}


})();