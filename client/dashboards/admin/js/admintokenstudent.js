Template.adminDashboardTokenStudent.onCreated(function(){
  this.subscribe('tokensStudent');
  Session.setDefault("available", "available");
  new Clipboard('button');
});

Template.adminDashboardTokenStudent.onDestroyed(function(){
  delete Session.keys['available'];
});

Template.adminDashboardTokenStudent.events({
  "click .btn_token": function(event){
    event.preventDefault();
    Meteor.call('addTokensStudent');
  },
  "click .btn_copy": function(event){
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

Template.adminDashboardTokenStudent.helpers({
  tokens: function(){
    var filter = Session.get("available");

    if(filter == "available"){
      return tokens.find({$and:[{used: false},{type:'student'}]}).fetch();
    }else if(filter == "unavailable"){
      return tokens.find({$and:[{used: true},{type:'student'}]}).fetch();
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
