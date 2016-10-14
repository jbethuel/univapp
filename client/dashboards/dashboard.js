Meteor.startup(function(){
  setInterval(function(){
    Meteor.call("getserverdate",function(error,result){
      Session.set("datetoday",result);
    })
  }, 1000);
});
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
