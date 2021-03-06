Template.studentDashboardLayout.onCreated(function(){
  Meteor.subscribe('files.images.all');
  this.subscribe("studentThreads");
});

Template.studentDashboardLayout.onRendered(function(){
  IonSideMenu.snapper.settings({touchToDrag: false});
});

Template.studentDashboardLayout.events({
  "click #sideHome": function(event){
    event.preventDefault();
    Router.go('studentDashboardHome');
  },
  "click #sideAnnouncement": function(event){
    event.preventDefault();
    Router.go('studentDashboardClassAnnouncement');
  },
  "click #sideMessenger": function(event){
    event.preventDefault();
    Router.go('studentDashboardMessenger');
  },
  "click #sideSearch": function(event){
    event.preventDefault();
    Router.go('studentDashboardSearch');
  },
  "click #sideSchedules": function(event){
    event.preventDefault();
    Router.go('studentDashboardSchedules');
  },
  "click #sideSettings": function(event){
    event.preventDefault();
    Router.go('studentDashboardSettings');
  },
  "click #sideAbout": function(event){
    event.preventDefault();
    Router.go('studentDashboardAbout');
  },
  "click #sideLogout": function(event){
    event.preventDefault();
    Meteor.logout();
    Router.go('login');
  }
});

Template.studentDashboardLayout.helpers({
  uploadedFiles: function () {
    return Images.find({userId:Meteor.userId()});
  },
  unread: function(){
    Meteor.subscribe("studentMessages");
    return threads.find({seenByStudent: false}).count();
  }
});
