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
  this.route('studentDashboardHome', {path: '/student/home', layoutTemplate: 'studentDashboardLayout'});
  this.route('studentDashboardMessenger', {path: '/student/messenger', layoutTemplate: 'studentDashboardLayout'});
  this.route('studentDashboardSearch', {path: '/student/search', layoutTemplate: 'studentDashboardLayout'});
  this.route('studentDashboardSchedules', {path: '/student/schedules', layoutTemplate: 'studentDashboardLayout'});
  this.route('studentDashboardSettings', {path: '/student/settings', layoutTemplate: 'studentDashboardLayout'});
  this.route('studentDashboardAbout', {path: '/student/about', layoutTemplate: 'studentDashboardLayout'});

  // teacher routes
  this.route('teacherDashboardHome', {path: '/teacher/home', layoutTemplate: 'teacherDashboardLayout'});
  this.route('teacherDashboardMessenger', {path: '/teacher/messenger', layoutTemplate: 'teacherDashboardLayout'});
  this.route('teacherDashboardCreate', {path: '/teacher/create', layoutTemplate: 'teacherDashboardLayout'});
  this.route('teacherDashboardClass', {path: '/teacher/class', layoutTemplate: 'teacherDashboardLayout'});
  this.route('teacherDashboardAbout', {path: '/teacher/about', layoutTemplate: 'teacherDashboardLayout'});
});
