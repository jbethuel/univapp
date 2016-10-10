Template.adminDashboardSettings.events({
  "click .btn-update": function(event){
    event.preventDefault();

    old_pw = $('.old').val();
    new_pw = $('.new').val();

    Accounts.changePassword(old_pw, new_pw, function(error){
      if(error){
        title = "ERROR!";
        template = "<div class='title_prompt'>"+ error.reason +"</div>";
        button = "button-assertive";
        Meteor.Messages.dialog(title, template, button);
      }else{
        title = "SUCCESS!";
        template = "<div class='title_prompt'>Password Updated!</div>";
        button = "button-positive";
        Meteor.Messages.dialog(title, template, button);
      }
    });
    old_pw = $('.old').val("");
    new_pw = $('.new').val("");
  }
})
