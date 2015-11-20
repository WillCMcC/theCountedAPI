app.controller('liveInfoGraphicCtrl', infoGraphic)

function infoGraphic($scope, $http, $window){
  console.log('test')
  $http.get('/api/counted').
  success(function(data, status, headers, config) {

    $scope.counted = data;
    $scope.insideOut = flipObj(data);
    $scope.raceLabels = Object.keys($scope.insideOut.race)
    $scope.sexLabels = Object.keys($scope.insideOut.sex)

    $scope.raceData = []
    $scope.sexData = []


    for(var i=0;i<$scope.raceLabels.length;i++){
      $scope.raceData.push($scope.insideOut.race[$scope.raceLabels[i]])
    }
    for(var i=0;i<$scope.sexLabels.length;i++){
      $scope.sexData.push($scope.insideOut.sex[$scope.sexLabels[i]])
    }

    console.log($scope.sexData)
    console.log($scope.sexLabels)
  }).
  error(function(data, status, headers, config) {
    console.log(error)
  });



}
function flipObj(d){
  var insideOut = {};
  var keys = Object.keys(d[0])
  for(var i=0;i<keys.length;i++){
      insideOut[keys[i]] = {};
  }
  console.log(insideOut)
  for(var i=0;i<d.length;i++){
    for(var j=0;j<keys.length;j++){
        if( Object.keys(insideOut[keys[j]]).indexOf(d[i][keys[j]]) == -1){
            // insideOut[keys[j]].d[i][keys[j]] = 0;
            // console.log(insideOut[keys[j]])
            var theThing = d[i][keys[j]]
            insideOut[keys[j]][theThing] = 1
        }else{
          var theThing = d[i][keys[j]]
          insideOut[keys[j]][theThing]++
        }
    }

  }

  return(insideOut)
}
