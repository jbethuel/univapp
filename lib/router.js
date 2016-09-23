Router.map(function(){

  this.route('login', {path: '/', layoutTemplate:'loginLayout'});
  this.route('register', {path: '/register', layoutTemplate:'loginLayout'});

  this.route('dashboard');

  // admin routes
  this.route('adminDashboardHome', {path: '/admin/home', layoutTemplate: 'adminDashboardLayout'});

  // student routes
  this.route('studentDashboardHome', {path: '/student/home', layoutTemplate: 'studentDashboardHome'});

  // teacher routes
  this.route('teacherDashboardHome', {path: '/teacher/home', layoutTemplate: 'teacherDashboardHome'});
});
