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
  },
  "click #sideLogout": function(event){
    event.preventDefault();
    Meteor.logout();
    Router.go('login');
  },
});

Template.adminDashboardLayout.helpers({
	connected: function(){
		status = Session.get('status');
		if(status == "connecting"){
			$.notify("Connecting", "warn");
		}else if(status == "disconnected"){
			$.notify("Disconnected", "error");
		}else{
			$.notify("Connected", "success");
		}
	}
});
