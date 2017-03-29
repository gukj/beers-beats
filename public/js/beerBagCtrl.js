beersBeatsApp.controller('beerBagCtrl', function($scope, model){


  //Lägga i en lista? 

  var name = 'Mastermind';
  model.BeerByName.get({name:name}, function(data){
    $scope.beer = data;
  });
  
  //drag and drop mellan två olika Views
  var beers = [{
  "currentPage": 1,
  "numberOfPages": 1,
  "totalResults": 2,
  "data": [
    {
      "id": "XnZtm1",
      "name": "Mastermind",
      "nameDisplay": "Mastermind",
      "abv": "11",
      "styleId": 43,
      "isOrganic": "N",
      "status": "verified",
      "statusDisplay": "Verified",
      "createDate": "2016-12-30 20:45:57",
      "updateDate": "2016-12-30 20:45:57",
      "style": {
        "id": 43,
        "categoryId": 3,
        "category": {
          "id": 3,
          "name": "North American Origin Ales",
          "createDate": "2012-03-21 20:06:45"
        },
        "name": "American-Style Imperial Stout",
        "shortName": "American Imperial Stout",
        "description": "Black in color, American-style imperial stouts typically have a high alcohol content. Generally characterized as very robust. The extremely rich malty flavor and aroma are balanced with assertive hopping and fruity-ester characteristics. Bitterness should be moderately high to very high and balanced with full sweet malt character. Roasted malt astringency and bitterness can be moderately perceived but should not overwhelm the overall character. Hop aroma is usually moderately-high to overwhelmingly hop-floral, -citrus or -herbal. Diacetyl (butterscotch) levels should be absent.",
        "ibuMin": "50",
        "ibuMax": "80",
        "abvMin": "7",
        "abvMax": "12",
        "srmMin": "40",
        "srmMax": "40",
        "ogMin": "1.08",
        "fgMin": "1.02",
        "fgMax": "1.03",
        "createDate": "2012-03-21 20:06:46",
        "updateDate": "2015-04-07 15:28:49"
      },
      "type": "beer"
    },
    {
      "id": "xksTTP",
      "name": "MasterMind",
      "nameDisplay": "MasterMind",
      "description": "BIG juicy tropical hop aroma, smooth finish, brilliant color.  Available for a limited time in cans only.",
      "abv": "8.1",
      "availableId": 2,
      "styleId": 31,
      "isOrganic": "N",
      "labels": {
        "icon": "https://s3.amazonaws.com/brewerydbapi/beer/xksTTP/upload_KxfbvK-icon.png",
        "medium": "https://s3.amazonaws.com/brewerydbapi/beer/xksTTP/upload_KxfbvK-medium.png",
        "large": "https://s3.amazonaws.com/brewerydbapi/beer/xksTTP/upload_KxfbvK-large.png"
      },
      "status": "verified",
      "statusDisplay": "Verified",
      "createDate": "2014-10-27 14:14:26",
      "updateDate": "2015-12-17 18:21:10",
      "available": {
        "id": 2,
        "name": "Limited",
        "description": "Limited availability."
      },
      "style": {
        "id": 31,
        "categoryId": 3,
        "category": {
          "id": 3,
          "name": "North American Origin Ales",
          "createDate": "2012-03-21 20:06:45"
        },
        "name": "Imperial or Double India Pale Ale",
        "shortName": "Imperial IPA",
        "description": "Imperial or Double India Pale Ales have intense hop bitterness, flavor and aroma. Alcohol content is medium-high to high and notably evident. They range from deep golden to medium copper in color. The style may use any variety of hops. Though the hop character is intense it's balanced with complex alcohol flavors, moderate to high fruity esters and medium to high malt character. Hop character should be fresh and lively and should not be harsh in quality. The use of large amounts of hops may cause a degree of appropriate hop haze. Imperial or Double India Pale Ales have medium-high to full body. Diacetyl should not be perceived. The intention of this style of beer is to exhibit the fresh and bright character of hops. Oxidative character and aged character should not be present.",
        "ibuMin": "65",
        "ibuMax": "100",
        "abvMin": "7.5",
        "abvMax": "10.5",
        "srmMin": "5",
        "srmMax": "13",
        "ogMin": "1.075",
        "fgMin": "1.012",
        "fgMax": "1.02",
        "createDate": "2012-03-21 20:06:45",
        "updateDate": "2015-04-07 15:26:46"
      },
      "type": "beer"
    }
  ],
  "status": "success"}]; 

  $scope.writeBeers = function() {

    //for (i = 0; i < model.getSelectedBeers().length; i++) {



    return beers[0].data[1].name;
    
  }

  $scope.image = function() {

    //for (i = 0; i < model.getSelectedBeers().length; i++) {


    return beers[0].data[1].labels.icon;
    
  }
  //$scope.image = beers[0].data[2].labels.large;



});