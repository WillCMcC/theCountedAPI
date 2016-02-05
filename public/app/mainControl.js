app.controller('liveInfoGraphicCtrl', infoGraphic)

function infoGraphic($scope, $http, $window, $document){
  console.log($window.location.href)
  $scope.hereIAm = $window.location.href;
  $http.get('/api/counted').
  success(function(data, status, headers, config) {
console.log(data)
    $scope.update = function(responsder){
      console.log(responsder);
      switch (responsder) {
        case 'Race':
        console.log($scope.raceData)
        $scope.respData = $scope.raceData;
        $scope.respLabel = $scope.raceLabels;
        $scope.respTable = 'race';
        $scope.respTitle = 'Race of the victim';
        break
        case 'Sex':
        $scope.respData = $scope.sexData;
        $scope.respLabel = $scope.sexLabels;
        $scope.respTable = 'sex';
        $scope.respTitle = 'Sex of the victim';

        break
        case 'Cause':
        $scope.respData = $scope.causeData;
        $scope.respLabel = $scope.causeLabels;
        $scope.respTable = 'cause';
        $scope.respTitle = 'Cause of Death';

        break
        case 'Armed':
        $scope.respData = $scope.armedData;
        $scope.respLabel = $scope.armedLabels;
        $scope.respTable = 'armed';
        $scope.respTitle = 'Armed';


        break
        default:

      }

    }

    $scope.counted = data;
    $scope.insideOut = flipObj(data);
    $scope.raceLabels = Object.keys($scope.insideOut.race)
    $scope.sexLabels = Object.keys($scope.insideOut.sex)
    $scope.armedLabels = Object.keys($scope.insideOut.armed)
    $scope.monthLabels = Object.keys($scope.insideOut.month)
    $scope.stateLabels = Object.keys($scope.insideOut.state)
    $scope.causeLabels = Object.keys($scope.insideOut.cause)
    $scope.ageLabels = Object.keys($scope.insideOut.age)

    $scope.raceData = []
    $scope.sexData = []
    $scope.armedData = []
    $scope.monthData = [[]]
    $scope.stateData = [[]]
    $scope.ageData = []
    $scope.causeData = []

    // responsive graph stuff
    $scope.respData = $scope.raceData;
    $scope.respLabel = $scope.raceLabels;
    $scope.respTitle = 'Race of the victim';
    $scope.respTable = 'race';



  $scope.singleSelect = 'Race'

    // calculate youngest killed
    $scope.youngest = $scope.ageLabels.reduce(function(a, b, i, arr) {
      if(isNaN(a) ){
        a = 100;
      }  if(isNaN(b)){
          b = 100;
        }
      return Math.min(a,b)}
    );


    for(var i=0;i<$scope.raceLabels.length;i++){
      console.log($scope.insideOut.race[$scope.raceLabels[i]])
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
    for(var i=0;i<$scope.causeLabels.length;i++){
      $scope.causeData.push($scope.insideOut.cause[$scope.causeLabels[i]])
    }
    $scope.raceBarData = [[],[]]
    $scope.raceGraphData = []
    $scope.raceGraphData = $scope.raceData.slice(0);
    $scope.raceGraphData.forEach(
      function(value, index, array1){
        array1[index] = value / data.length;
        $scope.raceBarData[0].push(Math.round(array1[index] * 10000) / 100);
      }
    );
    $scope.raceBarData[1] = [13.2,62.1,17.4,.2,5.4]
    $scope.raceBarLabelerer = $scope.raceLabels;
    $scope.raceSeries = ['Victims', 'General Population']

    console.log($scope.raceLabels)
    for (var i=$scope.raceBarLabelerer.length-1; i>=0; i--) {
    if ($scope.raceBarLabelerer[i] == "Other" || $scope.raceBarLabelerer[i] == "Unknown" || $scope.raceBarLabelerer[i] == "Arab-American") {
        $scope.raceBarLabelerer.splice(i, 1);
    }
    }
    $scope.raceBarLabels = $scope.raceLabels;





    $scope.oldest = $scope.ageLabels.sort()[$scope.ageLabels.length - 2];


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
