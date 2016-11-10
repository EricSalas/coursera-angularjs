(function(){

'use strict'; 

angular.module('serviceApp',[])
.controller("ShoppingListAddController",ShoppingListAddController)
.controller("ShoppingListShowController",ShoppingListShowController)
.service("ShoppingListService",ShoppingListService)
.service("WeightLossFilterService", WeightLossFilterService)
.directive("addedItemHtml",addedItemHtml)
.directive("listItemHtml",listItemHtml);

function addedItemHtml(){
	var ddo = {
template: "{{ item.quantity }} boxes of {{ item.name }}"
	};

	return ddo;
}

function listItemHtml(){
	var ddo = {
		restrict: "AE", //element o attribute
		templateUrl: "test.html"
	};

	return ddo;
}



ShoppingListAddController.$inject = ['ShoppingListService'];
function ShoppingListAddController(ShoppingListService){

var itemAdder = this;

itemAdder.itemName = "";
itemAdder.itemQuantity ="";

itemAdder.addItem = function(){
	ShoppingListService.addItem(itemAdder.itemName,itemAdder.itemQuantity);

}

}

ShoppingListShowController.$inject = ['ShoppingListService'];
function ShoppingListShowController(ShoppingListService){

var showList = this;

showList.items = ShoppingListService.getItems();

showList.removeItem = function(itemIndex){
ShoppingListService.removeItem(itemIndex);

}

}

ShoppingListService.$inject = ['$q','WeightLossFilterService'];
function ShoppingListService($q, WeightLossFilterService){
	var service =this;
	var items = [];


service.removeItem = function(itemIndex){
	items.splice(itemIndex,1);

}

	/**service.addItem = function (itemName, quantity){

		var promise = WeightLossFilterService.checkName(itemName);
		promise.then(function(response){
			var nextPromise = WeightLossFilterService.checkQuantity(quantity);

nextPromise.then(function(result){
	var item = {
		name:itemName,
		quantity:quantity
	};
	items.push(item);

}, function(errorResponse){
	console.log(errorResponse.message);
});

		}, function(errorResponse){
			console.log(errorResponse.message);
		});
	};**/

	/**service.addItem = function (itemName, quantity){

		var promise = WeightLossFilterService.checkName(itemName);
		
		promise
		.then(function(response){
			return WeightLossFilterService.checkQuantity(quantity);
		})
		.then(function(response){
			var item = {
				name:itemName,
				quantity:quantity

			};
			items.push(item);

		})
		.catch(function(errorResponse){
			console.log(errorResponse.message);
		});
	
	};**/

	service.addItem = function (itemName, quantity){

		var promise = WeightLossFilterService.checkName(itemName);
		var promise2 = WeightLossFilterService.checkQuantity(quantity);
//$q es Promise API
		$q.all([promise, promise2]). //then se ejecuta hasta que todos las promises hayan sido resueltas
		then(function(response){
			var item = {
				name:itemName,
				quantity:quantity

			};
			items.push(item);
		})
		.catch(function(errorResponse){//si alguna falla cae aqui
console.log(errorResponse.message);
		});
	
	};

	service.getItems = function(){
		return items;
	}

}

WeightLossFilterService.$inject = ['$q','$timeout'];
function WeightLossFilterService($q, $timeout){
	var service = this;


service.checkQuantity = function(quantity){
		var deferred = $q.defer();
		var result = {message:""};

		$timeout(function(){
			if(quantity<6){
				deferred.resolve(result);
			}else{
				result.message = "That is too much, Eric!"
				deferred.reject(result);
			}

		}, 0);

return deferred.promise;
	};


	service.checkName = function(name){
	
		var deferred = $q.defer();
		var result = {message:""};

		$timeout(function(){
			if(name.toLowerCase().indexOf('cookie')===-1){
				deferred.resolve(result);
			}else{
				result.message = "Stay away from cookies, Eric!"
				deferred.reject(result);
			}

		}, 0);

return deferred.promise;
	};

}

})();