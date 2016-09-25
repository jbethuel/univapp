Template.adminDashboardLayout.events({
  "click #sideHome": function(event){
    event.preventDefault();
    Router.go('adminDashboardHome');
  },
  "click #sidePost": function(event){
    event.preventDefault();
    Router.go('adminDashboardPost');
  },
  "click #sideGenerateTeacher": function(event){
    event.preventDefault();
    Router.go('adminDashboardTokenTeacher')
  },
  "click #sideGenerateStudent": function(event){
    event.preventDefault();
    Router.go('adminDashboardTokenStudent');
  },
  "click #sideSettings": function(event){
    event.preventDefault();
    Router.go('adminDashboardSettings');
  },
  "click #sideAbout": function(event){
    event.preventDefault();
    Router.go('adminDashboardAbout');
  }
});
