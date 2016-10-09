Router.map(function(){

  this.route('login', {path: '/', layoutTemplate:'loginLayout'});
  this.route('register', {path: '/register', layoutTemplate:'loginLayout'});
  this.route('dashboard');

  // admin routes
  this.route('adminDashboardHome', {path: '/admin/home', layoutTemplate: 'adminDashboardLayout'});
  this.route('adminDashboardPost', {path: '/admin/post', layoutTemplate: 'adminDashboardLayout'});
  this.route('adminDashboardTokenTeacher', {path: '/admin/tokenteacher', layoutTemplate: 'adminDashboardLayout'});
  this.route('adminDashboardTokenStudent', {path: '/admin/tokenstudent', layoutTemplate: 'adminDashboardLayout'});
  this.route('adminDashboardLoginUser', {path: '/admin/loginuser', layoutTemplate: 'adminDashboardLayout'});
  this.route('adminDashboardModify', {path: '/admin/modify', layoutTemplate: 'adminDashboardLayout'});
  this.route('adminDashboardSettings', {path: '/admin/settings', layoutTemplate: 'adminDashboardLayout'});
  this.route('adminDashboardAbout', {path: '/admin/about', layoutTemplate: 'adminDashboardLayout'});

  // student routes
  this.route('studentDashboardHome', {path: '/student/home', layoutTemplate: 'studentDashboardLayout'});
  this.route('studentDashboardMessenger', {path: '/student/messenger', layoutTemplate: 'studentDashboardLayout'});
  this.route('studentDashboardConversation', {path: '/student/conversation/:teach_id',
  data:function(){
    return {teach_id:this.params.teach_id};
  }, layoutTemplate: 'studentDashboardLayout'});
  this.route('studentDashboardSearch', {path: '/student/search', layoutTemplate: 'studentDashboardLayout'});
  this.route('studentDashboardSchedules', {path: '/student/schedules', layoutTemplate: 'studentDashboardLayout'});
  this.route('studentDashboardSettings', {path: '/student/settings', layoutTemplate: 'studentDashboardLayout'});
  this.route('studentDashboardAbout', {path: '/student/about', layoutTemplate: 'studentDashboardLayout'});
  this.route('studentDashboardViewClass', {path: '/student/class/:class_id',
  data:function(){
    return {class_id:this.params.class_id};
  }, layoutTemplate: 'studentDashboardLayout'});
  this.route('studentDashboardClassStanding', {path: '/student/class/standing/:class_id',
  data:function(){
    return {class_id:this.params.class_id};
  }, layoutTemplate: 'studentDashboardLayout'});
  this.route('studentDashboardClassActivity', {path: '/student/class/activity/:class_id',
  data:function(){
    return {class_id:this.params.class_id};
  }, layoutTemplate: 'studentDashboardLayout'});
  this.route('studentDashboardClassClassroom', {path: '/student/class/clasroom/:class_id',
  data:function(){
    return {class_id:this.params.class_id};
  }, layoutTemplate: 'studentDashboardLayout'});
  this.route('studentDashboardClassMessasge', {path: '/student/class/message/:class_id',
  data:function(){
    return {class_id:this.params.class_id};
  }, layoutTemplate: 'studentDashboardLayout'});

  // teacher routes
  this.route('teacherDashboardHome', {path: '/teacher/home', layoutTemplate: 'teacherDashboardLayout'});
  this.route('teacherDashboardMessenger', {path: '/teacher/messenger', layoutTemplate: 'teacherDashboardLayout'});
  this.route('teacherDashboardConversation', {path: '/teacher/conversation/:stud_id',
  data:function(){
    return {stud_id:this.params.stud_id};
  }, layoutTemplate: 'teacherDashboardLayout'});
  this.route('teacherDashboardCreate', {path: '/teacher/create', layoutTemplate: 'teacherDashboardLayout'});
  this.route('teacherDashboardClass', {path: '/teacher/class', layoutTemplate: 'teacherDashboardLayout'});
  this.route('teacherDashboardViewClass', {path: '/teacher/class/view/:class_id',
  data:function(){
    return {class_id:this.params.class_id};
  }, layoutTemplate: 'teacherDashboardLayout'});
  this.route('teacherDashboardAnnouncement', {path: '/teacher/class/announcement/:class_id',
  data:function(){
    return {class_id:this.params.class_id};
  }, layoutTemplate: 'teacherDashboardLayout'});
  this.route('teacherDashboardActivity', {path: '/teacher/class/activity/:class_id',
  data:function(){
    return {class_id:this.params.class_id};
  }, layoutTemplate: 'teacherDashboardLayout'});
    this.route('teacherDashboardSeatplan', {path: '/teacher/class/seatplan/:class_id',
  data:function(){
      return {class_id:this.params.class_id};
  }, layoutTemplate: 'teacherDashboardLayout'});
  this.route('teacherDashboardAttendance', {path: '/teacher/class/attendance/:class_id',
  data:function(){
    return {class_id:this.params.class_id};
  }, layoutTemplate: 'teacherDashboardLayout'});
  this.route('teacherDashboardRecords', {path: '/teacher/class/records/:class_id',
  data:function(){
    return {class_id:this.params.class_id};
  }, layoutTemplate: 'teacherDashboardLayout'});
  this.route('teacherDashboardMessageboard', {path: '/teacher/class/message/:class_id',
  data:function(){
    return {class_id:this.params.class_id};
  }, layoutTemplate: 'teacherDashboardLayout'});
  this.route('teacherDashboardGradeSettings', {path: '/teacher/class/gradesettings/:class_id',
  data:function(){
    return {class_id:this.params.class_id};
  }, layoutTemplate: 'teacherDashboardLayout'});
    this.route('teacherDashboardSettings', {path: '/teacher/settings', layoutTemplate: 'teacherDashboardLayout'});
    this.route('teacherDashboardAbout', {path: '/teacher/about', layoutTemplate: 'teacherDashboardLayout'});
  });

/*var requireLogin = function() {
  if (! Meteor.user()) {
   this.redirect('login');
  }else{
   this.next();
 }
}

var curUser = function() {
  if (! Meteor.user()) {
   this.next();
  }else{
   this.redirect('dashboard');
 }
}


Router.onBeforeAction(requireLogin, {except: ['login','register']});
Router.onBeforeAction(curUser, {only: ['login','register']});
*/
