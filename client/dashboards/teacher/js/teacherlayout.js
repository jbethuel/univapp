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

Template.teacherDashboardLayout.helpers({
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
