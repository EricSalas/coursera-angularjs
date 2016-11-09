(function(){
	'use strict';

angular.module('app',[])
.controller('controlador',controlador)
.service('servicio',servicio)
.constant("API","http://davids-restaurant.herokuapp.com");

controlador.$inject = ['servicio'];
function controlador(servicio){
	var menu = this;

	var promise = servicio.getCategories();

	promise
	.then(function(response){
		menu.categories = response.data;

	})
	.catch(function(error){
		console.log("Something went wrong!");

	});

	menu.getList = function(shortName){
		var promise = servicio.getMenuForCategory(shortName);

		promise
		.then(function(response){
			console.log(response.data);
		})
		.catch(function(error){
console.log(error);
		})

	};


}

servicio.$inject = ['$http','API'];
function servicio($http,API){
	var service = this;

	service.getCategories = function(){

		var response = $http({
			method: "GET",
			url: (API+"/categories.json")

		});
		return response;
	}

	service.getMenuForCategory = function(shortName){
		var response = $http({
			method: "GET",
			url: (API+"/menu_items.json"),
			params: {
				category: shortName
			}

		});
		return response;

	}

}


})();