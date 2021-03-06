Template.adminDashboardLayout.onCreated(function(){
  Meteor.subscribe('files.images.all');
});

Template.adminDashboardLayout.onRendered(function(){
  IonSideMenu.snapper.settings({touchToDrag: false});
});

Template.adminDashboardLayout.events({
  "click #sideHome": function(event){
    event.preventDefault();
    Router.go('adminDashboardHome');
  },
  "click #sidePost": function(event){
    event.preventDefault();
    Router.go('adminDashboardPost');
  },
  "click #sideGenerateStudent": function(event){
    event.preventDefault();
    Router.go('adminDashboardTokenStudent');
  },
  "click #sideGenerateTeacher": function(event){
    event.preventDefault();
    Router.go('adminDashboardTokenTeacher')
  },
  "click #sideLoginUser": function(event){
    event.preventDefault();
    Router.go('adminDashboardLoginUser');
  },
  "click #sideModifyAccount": function(event){
    event.preventDefault();
    Router.go('adminDashboardModify');
  },
  "click #sideSettings": function(event){
    event.preventDefault();
    Router.go('adminDashboardSettings');
  },
  "click #sideAbout": function(event){
    event.preventDefault();
    Router.go('adminDashboardAbout');
  },
  "click #sideLogout": function(event){
    event.preventDefault();
    Meteor.logout();
    Router.go('login');
    if(Meteor.isCordova){
      Meteor.startup(function(){
        window.plugins.toast.showShortCenter("Logged out");
      });
    }
  }
});
