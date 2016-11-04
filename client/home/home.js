if(Meteor.isCordova){
	document.addEventListener("backbutton", onBackButtonDown, false);
	function onBackButtonDown(event) {
	  event.preventDefault();
	  event.stopPropagation();
		var route_name = Router.current().route.getName();

		if(route_name == "login" || route_name == "register" || route_name == "dashboard"){
			Meteor.startup(function(){
				navigator.notification.confirm(
					'Close the application?', // message
					 function(buttonIndex){
						 if(buttonIndex == 3){
							 navigator.app.exitApp();
						 }
					 },            // callback to invoke with index of button pressed
					'EXIT',           // title
					['No', '','Yes']     // buttonLabels
				);
			});
		}else{
			navigator.app.backHistory();
		}
	}
}

Meteor.autorun(function(){
    var stat;
    if (Meteor.status().connected == true) {
        stat = 'connected'
    }
    else if (Meteor.status().connected == false) {
        stat = 'waiting'
    }
    Session.set('status',stat);
});

Template.login.events({
  "click .home_btn": function(event){

    var id = $('.home_id').val();
    var pw = $('.home_pw').val();

    if(id == "" || pw == ""){

			if(Meteor.isCordova){
				Meteor.startup(function(){
					navigator.notification.alert('ID or password is empty.\nPlease try again.',function(){},'ERROR','OK');
				});
			}else{
				IonPopup.show({
					title: "ERROR",
					template: "<div class='title_prompt'>ID or password is empty.<br>Please Try Again.</div>",
					buttons: [{
						text: 'OK',
						type: 'button-assertive',
						onTap: function() {
							IonPopup.close();
						}
					}]
				});
			}
    }else{

      Meteor.loginWithPassword(id, pw, function(error){
        if(error){
          if(error.reason = "User not found"){
						if(Meteor.isCordova){
							Meteor.startup(function(){
								navigator.notification.alert("The ID you've entered doesn't match any account. Sign up for an account.",function(){},'ERROR','OK');
							});
						}else{
							IonPopup.show({
								title: "ERROR",
								template: "<div class='title_prompt'>The ID you've entered doesn't match any account. Sign up for an account.</div>",
								buttons: [{
									text: 'OK',
									type: "button button-assertive",
									onTap: function() {
										IonPopup.close();
									}
								}]
							});
						}
          }
        }else{
          Router.go('dashboard');
					if(Meteor.isCordova){
						Meteor.startup(function(){
							window.plugins.toast.showShortCenter("Logged in");
						});
					}
        }
      });
    }
  }
});

Template.body.helpers({
	status: function(){
		status = Session.get('status');
		if(status == "connected"){
			if(Meteor.isCordova){
				Meteor.startup(function(){
					window.plugins.toast.showWithOptions({message: "Connected", duration: "short", position: "bottom", addPixelsY: -80});
					SpinnerPlugin.activityStop();
				});
			}else{
				toastr.success("", "connected").css("width","140px");
			}
		}else if(status == "waiting"){
			if(Meteor.isCordova){
				Meteor.startup(function(){
					var options = { dimBackground: true };
					var text = "LOADING...\nWaiting for network connection.";
					SpinnerPlugin.activityStart(text, options);
				});
			}else{
				toastr.warning("", "connecting").css("width","140px");
			}
		}
	}
});
