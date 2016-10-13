Template._modifyuser.onCreated(function(){
  id = Session.get("userId");
  this.subscribe("adminModifyUser", id);
});

Template._modifyuser.helpers({
  user: function(){
    id = Session.get("userId");
    return Meteor.users.find({_id: id}).fetch();
  }
});

Template._modifyuser.events({
  "click .btn_save": function(event){
    event.preventDefault();

    id = Session.get("userId");
    username = $(".reg_id").val();
    firstname = $(".reg_firstname").val();
    middlename = $(".reg_middlename").val();
    lastname = $(".reg_lastname").val();

    if(username == "" || firstname == "" || middlename == "" || lastname == ""){
      title = "ERROR";
      button = "button button-assertive";
      template = "<div class='title_prompt'>Complete the password fields.</div>";
      Meteor.Messages.dialog(title, template, button);
    }else{
      Meteor.call("modifyuser", id, username, firstname, middlename, lastname, function(error){
        if(error){
          console.log(error.reason);
        }else{
          title = "SUCCESS";
          button = "button button-balanced";
          template = "<div class='title_prompt'>Succesfully Modified.</div>";
          Meteor.Messages.dialog(title, template, button);
        }
      });
    }
  },
  "click .btn_savepw": function(event){
    event.preventDefault();

    userId = Session.get("userId");
    password = $(".reg_pw").val();
    conf_pw = $(".reg_conf_pw").val();

    if(password == "" || conf_pw == ""){
      title = "ERROR";
      button = "button button-assertive";
      template = "<div class='title_prompt'>Complete the password fields.</div>";
      Meteor.Messages.dialog(title, template, button);
    }else if(password != conf_pw){
      title = "ERROR";
      button = "button button-assertive";
      template = "<div class='title_prompt'>Password does not match.</div>";
      Meteor.Messages.dialog(title, template, button);
    }else{
      Meteor.call("updatePassword", userId, password, function(error){
        if(error){
          console.log(error.reason);
        }else{
          title = "SUCCESS";
          button = "button button-balanced";
          template = "<div class='title_prompt'>Password updated.</div>";
          Meteor.Messages.dialog(title, template, button);
        }
      });
    }
  }
});
