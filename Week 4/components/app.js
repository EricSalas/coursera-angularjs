(function () {
'use strict';

angular.module('ShoppingListComponentApp', [])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.component('shoppingList', {
  templateUrl: 'shoppingList.html',
  controller: ShoppingListComponentController, //solo si vamos a meter mas logica, sino angular da uno vacio
  bindings: {
    items: '<',
    myTitle: '@title',
    onRemove: '&'
  }
});

ShoppingListComponentController.$inject = ['$element'] //scope para usar 
//watch function. Element para agarrar el elemento tratado, que es el parent
function ShoppingListComponentController( $element) {
  var $ctrl = this;
  var totalItems;

  $ctrl.cookiesInList = function () {
    for (var i = 0; i < $ctrl.items.length; i++) {
      var name = $ctrl.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }

    return false;
  };

  $ctrl.remove = function (myIndex) {
    $ctrl.onRemove({ index: myIndex });
  };

  $ctrl.$onInit = function () {
    console.log("We are in $onInit()");
    totalItems = 0;
  };

  $ctrl.$onChanges = function (changeObj) { //angular pasa este objeto
    console.log("Changes: ", changeObj);
  }


  $ctrl.$doCheck = function () { //se llama en cada digest cycle
    //elimina el inject del $scope (padre?)
  // da chance de ver si hubieron cambios en los
  //elementos en lugar de poner watchers!
    if($ctrl.items.length!==totalItems){
      console.log("# of items change. Checking for cookies!");
      totalItems = $ctrl.items.length;
      if($ctrl.cookiesInList()){
        console.log("NOOO COOKIES!");
        var warningElem = $element.find('div.error');
        warningElem.slideDown(900);

      }else{
        console.log("No cookies here! Go away!");
        var warningElem = $element.find('div.error');
        warningElem.slideUp(900);
      }
    }
  };

  /**$ctrl.$postLink = function () { //se puede manejar el dom desde aqui
    //esto es porque el onchanges no ve los cambios en el array, entonces
    //hay que agregar un watcher
    $scope.$watch('$ctrl.cookiesInList()', function (newValue, oldValue) {
      console.log($element);
      if (newValue === true) {
        // Show warning
        var warningElem = $element.find('div.error');
        warningElem.slideDown(900);
      }
      else {
        // Hide warning
        var warningElem = $element.find('div.error');
        warningElem.slideUp(900);
      }
    });
  };**/
}


ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {
  var list = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory();

  list.items = shoppingList.getItems();
  var origTitle = "Shopping List #1";
  list.title = origTitle + " (" + list.items.length + " items )";

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    shoppingList.addItem(list.itemName, list.itemQuantity);
    list.title = origTitle + " (" + list.items.length + " items )";
  }

  list.removeItem = function (itemIndex) {
    this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
    shoppingList.removeItem(itemIndex);
    this.title = origTitle + " (" + list.items.length + " items )";
  };
}


// If not specified, maxItems assumed unlimited
function ShoppingListService(maxItems) {
  var service = this;

  // List of shopping items
  var items = [];

  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


function ShoppingListFactory() {
  var factory = function (maxItems) {
    return new ShoppingListService(maxItems);
  };

  return factory;
}

})();
