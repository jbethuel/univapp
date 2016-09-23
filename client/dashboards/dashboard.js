Template.dashboard.helpers({
  admin: function(){
    Router.go('adminDashboardHome');
  },
  teacher: function(){
    Router.go('teacherDashboardHome');
  },
  student: function(){
    Router.go('studentDashboardHome')
  }
});
