Router.map(function(){

  this.route('login', {path: '/', layoutTemplate:'loginLayout'});
  this.route('register', {path: '/register', layoutTemplate:'loginLayout'});

  this.route('dashboard')

});
