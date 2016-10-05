Template.modifyuser.onCreated(function(){
  this.subscribe("appusers");
});

Template.modifyuser.helpers({
  user: function(){
    id = Session.get("userId");
    return Meteor.users.find({_id: id}).fetch();
  }
});

Template.modifyuser.events({
  "click .btn_save": function(event){
    event.preventDefault();

    id = Session.get("userId");
    username = $(".reg_id").val();
    firstname = $(".reg_firstname").val();
    middlename = $(".reg_middlename").val();
    lastname = $(".reg_lastname").val();

    Meteor.call("modifyuser", id, username, firstname, middlename, lastname, function(error){
      if(error){
        console.log(error.reason);
      }else{
        title = "ERROR";
        button = "button button-balanced";
        template = "<div class='title_prompt'>Succesfully Modified.</div>";
        Meteor.Messages.dialog(title, template, button);
      }
    });

  }
});
