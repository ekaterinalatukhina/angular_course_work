'use strict';

  var app = angular.module('myApp', ['ui.router','ui.bootstrap']);


  app.component('boxList', {
    template: `
    <div ng-repeat="box in $ctrl.boxes">  
      <li ui-sref="home.box({ boxId: box.id })" ui-sref-active="active" style="cursor:pointer;">
              {{box.name}}
            </li>
    </div>
    `,
    controller: function(boxService) {
      boxService.getAll().then((data) => {
         this.boxes =  data.data;         
      });
    }
  });

  
  app.component('emailLine', {
    template: ` 
            <li class="email-item row">
              <div class="people col-sm-3">
                <ul class="mail-icons list-inline">
                  <li>
                    <input type="checkbox" class="mail-select">
                  </li>
                  <li>
                    <input type="button" value="Del" ng-click="$ctrl.deleteLine({eml: $ctrl.email});">
                  </li>
                </ul>

                <span class="people-names">
                  {{$ctrl.email.from}}
                </span>
              </div>
              <div class="message col-sm-7">
                <div class="clipper">
                  <h3 ui-sref="home.box.mail({emailId:$ctrl.email.id })" ui-sref-active="active" style="cursor:pointer;"><b>{{$ctrl.email.subject}}</b></h3>
                  -
                  <p>{{$ctrl.email.body}}</p>
                </div>
              </div><!-- message -->

              <div class="date col-sm-2">
                <date class="pull-right">{{$ctrl.email.created | dateAgo}}</date>
              </div><!-- date -->
            </li> 
    `,
    controller: function($element) { },
    bindings: {
       email: '<email',
       deleteLine:'&deleteline'
    }
  });

  app.component('newMail', {
    templateUrl: 'newemail.html',
    controller: function() {  },
    bindings: { 
      userslist: '<'
    }
  });

  app.component('addrLine', {
    template: ` 
            <li class="email-item row">
              <div class="people col-sm-3">
                <span class="people-names">
                <h3 ui-sref="home.addressbook.edit({addressId:$ctrl.user.id })" style="cursor:pointer;"><b>{{$ctrl.user.name}}</b></h3>                  
                </span>
              </div>
              <div class="message col-sm-7">
                <div class="clipper">
                  {{$ctrl.user.email}}                  
                </div>
              </div>
            </li> 
    `,
    controller: function($element) { },
    bindings: {
       user: '<',
    }
  });