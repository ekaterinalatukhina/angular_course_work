app.service('emailService', function($http){
  this.getAll = () => {
    return $http.get('data/emails.json');
  }
});

app.service('userService', function($http){
  this.getAll = () => {
    return $http.get('data/users.json');
  }
});

app.service('boxService', function($http){
  this.getAll = () => {
    return $http.get('data/boxes.json');
  }
});