app.config(($stateProvider, $urlRouterProvider) => {
  
  $stateProvider.state({
    name: 'home',
    url: '',
    templateUrl: 'mailBox.html',
    abstract:true,
    resolve: {
      emailList: function(emailService){        
        return emailService.getAll().then((data) => { 
          return data.data;    
        });
      },
      usersList: function(userService){        
        return userService.getAll().then((data) => { 
          return data.data;    
        });
      }
    },
    controller: function($state, $scope, $stateParams) {
 	      $scope.searchWord = '';
 	  }
  });
  
  $stateProvider.state({
    name: 'home.box',
    url: '/box/:boxId',
    template: `
            <div ng-repeat="email in emails | filterBySearchword:$ctrl.searchWord">
                 <email-line email="email" deleteline="deleteLine(email)"></email-line>
              </div><ui-view></ui-view>
    `,
    resolve: {
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
             if ($scope.emails[i] == eml) {
               $scope.emails.splice(i, 1);
               break;
             }
           }
           for (var i = 0; i < emailList.length; i++) {
             if (emailList[i] == eml) {
               emailList.splice(i, 1);
               break;
             }
           }
           
         };
         
 	}
  });

$stateProvider.state({
    name: 'home.box.mail',
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

$stateProvider.state({
    name: 'home.newmail',
    url: '/newmail/',
    templateUrl: 'newemail.html',
    controller: function($state, $scope, $stateParams, usersList, emailList) {

        $scope.userTo = undefined;        
        $scope.userss = [];
        for (var i=0; i<usersList.length; i++) {
          $scope.userss.push({
            StateId: usersList[i]['id'],
            StateCode: usersList[i]['name'],
            StateDesc: usersList[i]['name']+' ('+usersList[i]['email']+')'
          });
        }
      $scope.subject = ''
      $scope.body = ''
      $scope.saveMail = () => {
        var uTo;
        if (!!$scope.userTo.StateCode){
            uTo = $scope.userTo.StateCode;
        }else{
            uTo = $scope.userTo;
            usersList.push({"id": usersList.length, "name":"", "email":$scope.userTo});
        }
        var obj = {"id": emailList.length,"created": new Date(), "from":uTo, "to":"me", "box":2, "subject":$scope.subject, "body":$scope.body};
        emailList.push(obj);
      }
      
 	  }
  });

   $stateProvider.state({
    name: 'home.addressbook',
    url: '/addressbook/',
    template: `
            <div ng-repeat="user in users">
                 <addr-line user="user"></addr-line>
              </div><ui-view></ui-view>
    `,
    resolve: {},
    controller: function($state, $scope, $stateParams, usersList) {
      $scope.users = usersList;         
 	  }
  });

  $stateProvider.state({
    name: 'home.addressbook.edit',
    url: '/:addressId',
    templateUrl: 'email.html',
    controller: function($state, $scope, $stateParams, emailList) {
      $scope.addressId = $stateParams.addressId;
      $scope.email = emailList.find(function(elem) { 
        return elem["id"] == $stateParams.emailId;
      });    
 	}
  });



  $urlRouterProvider.otherwise('/box/1');
});