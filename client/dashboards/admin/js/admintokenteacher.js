Template.adminDashboardTokenTeacher.onCreated(function(){
  this.subscribe('tokensTeacher');
  Session.setDefault("available", "unavailable");
  new Clipboard('button');
});

Template.adminDashboardTokenTeacher.onDestroyed(function(){
  delete Session.keys['available'];
});

Template.adminDashboardTokenTeacher.events({
  "click .btn_token": function(event){
    event.preventDefault();
    Meteor.call('addTokensTeacher');
  },
  "click .btn_copy": function(event){
    event.preventDefault();
    token = this.token;
    title = "COPIED";
    button = "button button-royal";
    template = "<div class='title_prompt'>Token copied to clipboard: "+token+"</div>";
    Meteor.Messages.dialog(title, template, button);
  },
  "click input[type='checkbox']": function(event){
    if($('.available').prop("checked") == true){
      Session.set("available", "available");
    }else{
      Session.set("available", "unavailable");
    }
  }
});

Template.adminDashboardTokenTeacher.helpers({
  tokens: function(){
    var filter = Session.get("available");

    if(filter == "available"){
      return tokens.find({$and:[{used: false},{type:'teacher'}]}).fetch();
    }else if(filter == "unavailable"){
      return tokens.find({$and:[{used: true},{type:'teacher'}]}).fetch();
    }

  },
  available: function(){
    var available = Session.get("available");
    if(available == "available"){
      return true;
    }else{
      return false;
    }
  }
});
