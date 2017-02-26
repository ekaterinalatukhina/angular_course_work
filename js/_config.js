app.config(($stateProvider, $urlRouterProvider) => {
  
  $stateProvider.state({
    name: 'box',
    url: '/box/:boxId',
    template: `
            <div ng-repeat="email in emails| filterBySearchword:$ctrl.searchWord"> 
                 <email-line email="email" deleteline="deleteLine(email)"></email-line>
              </div><ui-view></ui-view>
    `,
    resolve: {
      emailList: function(emailService){        
        return emailService.getAll().then((data) => { 
          return data.data;    
        });
      }
    },
    controller: function($state, $scope, $stateParams, emailList) {
 	    $scope.boxId = $stateParams.boxId;
      $scope.emails = [];
      for (var i=0; i<emailList.length; i++) {
          if (emailList[i]["box"] == $stateParams.boxId) {
              $scope.emails.push(emailList[i]);
          }
      }  
      $scope.deleteLine  = (eml) => { 
           for (var i = 0; i < $scope.emails.length; i++) {
             console.log($scope.emails[i] == eml); 
             if ($scope.emails[i] == eml) {
               $scope.emails.splice(i, 1);
               break;
             }
           }
         };
          
 	}
  });

$stateProvider.state({
    name: 'box.mail',
    url: '/:emailId',
    templateUrl: 'email.html',
    controller: function($state, $scope, $stateParams, emailList) {
 	  //$scope.boxId = $stateParams.boxId;
      $scope.emailId = $stateParams.emailId;
      $scope.email = emailList.find(function(elem) { 
        return elem["id"] == $stateParams.emailId;
      });    
 	}
  });



  $urlRouterProvider.otherwise('/box/1');
});