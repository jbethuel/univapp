Template.studentDashboardLayout.events({
  "click #sideHome": function(event){
    event.preventDefault();
    Router.go('studentDashboardHome');
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
