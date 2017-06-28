angular.module('vacantlotsApp').controller('MapCtrl', ['$state', '$http', 'sharedpropertiesService', 'NgMap', function($state, $http, sharedpropertiesService, NgMap)
{
    var vm = this;
    vm.markers= [];


    NgMap.getMap().then(function(map)
    {
      console.log('map', map);
      vm.map = map;
    });


    vm.genmap =
    {
        center:[40.7356357, -74.18 ]
    };

// when I click it:
//Possibly unhandled rejection: OVER_QUERY_LIMIT
//or ZERO RESULTS
//nothing happens if there's no assigned function

//is it a google maps thing? Do I need to throw more money at this?
//Why is it making a billion requests?


//do it the old fashioned way? map id
//large arrays, ng-repeat?

//why not nest ng-repeat? why does each element have an ng-repeat
//ng-repeat logic?


//when its just one: Possibly unhandled rejection: ZERO_RESULTS

    // vm.showInfoWindow = function()
    // {
    //   // console.log(stuff);
    //   console.log("clicked");
    //   // vm.store = vm.stores[storeId];
    //   // vm.map.showInfoWindow(vm.store.infoWindow, this);
    // };

    $http.get('/map').then(function success(res)
    {
      console.log("result");
      console.log(res);
      var properties = res.data;
      var address="";
      var tmpmarkers = [];
      var propertyname = "";
      var propnamet;
      console.log(properties[0]);

      for (var i = 0; i < properties.length; i++)
      {
          property = properties[i];
          propnamet= "";
          propertyname ="";
          propnamet = property.vitalStreetName.trim();
          propnamet = propnamet.split(" ");
          for (var x = 0; x < propnamet.length; x++)
          {
            propertyname +=" " + propnamet[x][0] +  propnamet[x].slice(1).toLowerCase();
          }
          address =
          property.vitalHouseNumber
          + propertyname;
          ;


          address =
          property.vitalHouseNumber
          + property.vitalStreetName;
          ;

          tmpmarkers.push(
          // vm.markers.push(
          {
            latitude: property.latitude,
            longitude: property.longitude,
            address: address,
            // icon: '../../images/mapicons/iconred.png',
            id: property._id
          });

      }
      vm.markers = tmpmarkers;
      // console.log("these are the markers");
      console.log(vm.markers);
      // So here, we either push the markers directly into vm.markers or we
      // create a temp array and then then make markers equivelent to it

    }, function err(res)
    {
        console.log(res);
    });

    vm.showBox = function(e, boxinfo)
    {
      console.log(boxinfo);
      vm.boxinfo = boxinfo;
      vm.map.showInfoWindow('main_window', boxinfo.id);
    };

    vm.clicked = function()
    {
         sharedpropertiesService.setProperty(vm.boxinfo);
         $state.go('bidPage');
    };







}]);









// var createMarker = function(i, address, latitude, longitude, idKey)
// {
//   // if (idKey == null)
//   // {
//   //   idKey = "id";
//   // }
//   var ret =
//
//   // ret[idKey] = i;
//   return ret;
// };


// console.log(vm.map.center);
//
// if (localStorage.getItem("token"))
// {
//     console.log("Login token is present");
//     console.log(localStorage.getItem("token"));
// }
//
// // uiGmapGoogleMapApi is a promise.
// // The "then" callback function provides the google.maps object.
// uiGmapGoogleMapApi.then(function(maps)
// {
// });
//
// //Creates object containing info needed to create Google maps marker

//
// var markers = [];
// var properties;
// // HTTP get to load property data from JSON file.

//
// vm.goBid = function (marker, event, model)
// {
//    sharedpropertiesService.setString(model.title)
//    $state.go('bidPage')
// };



// vm.initMap = function(mapId)
// {
//    vm.map = NgMap.initMap(mapId);
//    console.log('vm.map 2', vm.map)
//  }

// vm.initMap = function(mapId)
// {
//  vm.map = NgMap.initMap(mapId);
//  console.log('vm.map 2', vm.map)
// }
