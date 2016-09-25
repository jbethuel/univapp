Router.map(function(){

  this.route('login', {path: '/', layoutTemplate:'loginLayout'});
  this.route('register', {path: '/register', layoutTemplate:'loginLayout'});

  this.route('dashboard');

  // admin routes
  this.route('adminDashboardHome', {path: '/admin/home', layoutTemplate: 'adminDashboardLayout'});
  this.route('adminDashboardPost', {path: '/admin/post', layoutTemplate: 'adminDashboardLayout'});
  this.route('adminDashboardTokenTeacher', {path: '/admin/tokenteacher', layoutTemplate: 'adminDashboardLayout'});
  this.route('adminDashboardTokenStudent', {path: '/admin/tokenstudent', layoutTemplate: 'adminDashboardLayout'});
  this.route('adminDashboardSettings', {path: '/admin/settings', layoutTemplate: 'adminDashboardLayout'});
  this.route('adminDashboardAbout', {path: '/admin/about', layoutTemplate: 'adminDashboardLayout'});

  // student routes
  this.route('studentDashboardHome', {path: '/student/home', layoutTemplate: 'studentDashboardHome'});
  this.route('studentDashboardMessenger', {path: '/student/messenger', layoutTemplate: 'studentDashboardHome'});
  this.route('studentDashboardSearch', {path: '/student/search', layoutTemplate: 'studentDashboardHome'});
  this.route('studentDashboardSchedules', {path: '/student/schedules', layoutTemplate: 'studentDashboardHome'});
  this.route('studentDashboardAbout', {path: '/student/about', layoutTemplate: 'studentDashboardHome'});

  // teacher routes
  this.route('teacherDashboardHome', {path: '/teacher/home', layoutTemplate: 'teacherDashboardHome'});
});
