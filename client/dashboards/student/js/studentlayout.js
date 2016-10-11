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
