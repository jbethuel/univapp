if(Meteor.isCordova){
	document.addEventListener("backbutton", onBackButtonDown, false);
	function onBackButtonDown(event) {
	  event.preventDefault();
	  event.stopPropagation();
		var route_name = Router.current().route.getName();

		if(route_name == "login" || route_name == "register" || route_name == "dashboard"){
			navigator.app.exitApp();
		}else{
			navigator.app.backHistory();
		}
	}
}

Template.login.events({
  "click .home_btn": function(event){

    var id = $('.home_id').val();
    var pw = $('.home_pw').val();

    if(id == "" || pw == ""){
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
    }else{

      Meteor.loginWithPassword(id, pw, function(error){
        if(error){

          if(error.reason = "User not found"){
            IonPopup.show({
              title: "ERROR",
              template: "<div class='title_prompt'>Incorrect username or password.</div>",
              buttons: [{
                text: 'OK',
                type: "button button-assertive",
                onTap: function() {
                  IonPopup.close();
                }
              }]
            });

          }
        }else{

          Router.go('dashboard');

        }
      });

    }
  }
});
