Template.teacherDashboardLayout.events({
  "click #sideHome": function(event){
    event.preventDefault();
    Router.go('teacherDashboardHome');
  },
  "click #sideMessenger": function(event){
    event.preventDefault();
    Router.go('teacherDashboardMessenger');
  },
  "click #sideCreate": function(event){
    event.preventDefault();
    Router.go('teacherDashboardCreate');
  },
  "click #sideClass": function(event){
    event.preventDefault();
    Router.go('teacherDashboardClass');
  },
  "click #sideSettings": function(event){
    event.preventDefault();
    Router.go('teacherDashboardSettings');
  },
  "click #sideAbout": function(event){
    event.preventDefault();
    Router.go('teacherDashboardAbout');
  },
  "click #sideLogout": function(event){
    event.preventDefault();
    Meteor.logout();
    Router.go('login');
  }
});
