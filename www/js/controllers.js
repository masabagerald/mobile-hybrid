angular.module('jsconfuy.controllers', [])

.controller('AppCtrl', function($scope) {

})

.controller('SpeakersCtrl', function($scope, $http, Speakers, $ionicLoading) {
  $scope.speakers = [];

  $ionicLoading.show({
    template: '<i class="ion-loading"></i>'
  });

  Speakers.get()
  .then(function(speakers){
    $scope.speakers = speakers;
    $ionicLoading.hide()
  },function(err){
    $ionicLoading.hide();
  });

  $scope.goToUrl = function(url){
    //use inAppBrowser plugin
    window.open(url, '_blank', 'location=yes');
  }
})
  .controller('LawyersCtrl',function ($scope,$http,Lawyers,$ionicLoading) {
    $scope.lawyers = [];
    $ionicLoading.show({
      template:'<i class="ion-loading-a"></i>'
    });
    Lawyers.get()
        .then(function (lawyers) {
          $scope.lawyers = lawyers;
          $ionicLoading.hide()

        },function (err) {
          $ionicLoading.hide();

        });
    $scope.goToUrl = function (url) {

      window.open(url,'_blank','location = yes');
    }

  })
  .controller('LawsCtrl',function($scope,$http,Laws,$ionicLoading){
    $scope.laws = [];
    $ionicLoading.show({
        template:'<i class="ion-loading-a"></i>'
    });

    Laws.get()
      .then(function(laws){
        $scope.laws = laws;
        $ionicLoading.hide()
      },function(err){
        $ionicLoading

      });


  })

.controller('VenueCtrl', function($scope) {
  //map with venue position
  $scope.position = {
    lat: -34.892589,
    lng: -56.194638
  };

  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;
  });
})


.controller('AgendaCtrl', function($scope, Agenda, $ionicLoading) {
  $scope.events = [];

  $ionicLoading.show({
    template: 'Loading...'
  });

  Agenda.get()
  .then(function(events){
    $scope.events = events;
    $ionicLoading.hide();
  },function(err){
    $ionicLoading.hide();
  });
})

.controller('LawCtrl',function ($scope,Laws,$stateParams,$ionicLoading) {
    var lawId = $stateParams.law;
    $ionicLoading.show({
        template:'<i class="ion-loading-a"></i>.'
    });
    Laws.getLaw(lawId)
        .then(function (law) {
            $scope.law = law;
            $ionicLoading.hide();

        },function (err) {


            $ionicLoading.hide();

        });
    $scope.shareEvent = function (law) {


    var messageToShare = law.name + " & " + law.desc;
    window.plugins.socialsharing.share(messageToShare)

    };

})


.controller('EventCtrl', function($scope, Agenda, $stateParams, $ionicLoading) {
  var eventId = $stateParams.eventId;

  $ionicLoading.show({
    template: 'Loading...'
  });

  Agenda.getEvent(eventId)
  .then(function(event){
    $scope.event = event;
    $ionicLoading.hide();
  },function(err){
    $ionicLoading.hide();
  });

  $scope.shareEvent = function(event){
    var speakersText = "";

    _.each(event.speakers, function(speaker, index){
      speakersText += speaker.name;
      if((index+1) < event.speakers.length){
        speakersText += " & ";
      }
    });

    var messageToShare = event.title + " by " + speakersText + " at #JSConfUY";
    window.plugins.socialsharing.share(messageToShare);
  };

});
