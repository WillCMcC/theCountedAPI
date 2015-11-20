app.controller('liveInfoGraphicCtrl', infoGraphic)

function infoGraphic($scope, $http, $window, $document){
  console.log('test')
  $http.get('/api/counted').
  success(function(data, status, headers, config) {

    $scope.counted = data;
    $scope.insideOut = flipObj(data);
    $scope.raceLabels = Object.keys($scope.insideOut.race)
    $scope.sexLabels = Object.keys($scope.insideOut.sex)
    $scope.armedLabels = Object.keys($scope.insideOut.armed)
    $scope.monthLabels = Object.keys($scope.insideOut.month)
    $scope.stateLabels = Object.keys($scope.insideOut.state)
    $scope.ageLabels = Object.keys($scope.insideOut.age)





    $scope.raceData = []
    $scope.sexData = []
    $scope.armedData = []
    $scope.monthData = [[]]
    $scope.stateData = [[]]
    $scope.ageData = []





    for(var i=0;i<$scope.raceLabels.length;i++){
      $scope.raceData.push($scope.insideOut.race[$scope.raceLabels[i]])
    }
    for(var i=0;i<$scope.sexLabels.length;i++){
      $scope.sexData.push($scope.insideOut.sex[$scope.sexLabels[i]])
    }
    for(var i=0;i<$scope.armedLabels.length;i++){
      $scope.armedData.push($scope.insideOut.armed[$scope.armedLabels[i]])
    }
    for(var i=0;i<$scope.monthLabels.length;i++){
      $scope.monthData[0].push($scope.insideOut.month[$scope.monthLabels[i]])
    }
    for(var i=0;i<$scope.stateLabels.length;i++){
      $scope.stateData[0].push($scope.insideOut.state[$scope.stateLabels[i]])
    }
    for(var i=0;i<$scope.ageLabels.length;i++){
      $scope.ageData.push($scope.insideOut.age[$scope.ageLabels[i]])
    }
    console.log($scope.ageLabels.sort())
    $scope.oldest = $scope.ageLabels.sort()[$scope.ageLabels.length - 2];
    console.log("oldest: " + $scope.oldest)

    console.log($scope.stateData + "," + $scope.stateLabels)

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
