Template.adminDashboardTokenStudent.onCreated(function(){
  this.subscribe('adminTokenStudent');
  Session.setDefault("available", "unavailable");
  new Clipboard('.btn_copy');
});

Template.adminDashboardTokenStudent.onDestroyed(function(){
  delete Session.keys['available'];
});

Template.adminDashboardTokenStudent.events({
  "click .btn_token": function(){
    event.preventDefault();
    Meteor.call('addTokensStudent');
    if(Meteor.isCordova){
      Meteor.startup(function(){
        window.plugins.toast.showShortCenter("1 student token generated");
      });
    }
  },
  "click .btn_copy": function(event){
    token = this.token;
    if(Meteor.isCordova){
      Meteor.startup(function(){
        cordova.plugins.clipboard.copy(token);
        window.plugins.toast.showShortCenter("token "+ token +" copied to clipboard");
      });
    }else{
      title = "COPIED";
      button = "button button-royal";
      template = "<div class='title_prompt'>Token copied to clipboard: "+token+"</div>";
      Meteor.Messages.dialog(title, template, button);
    }
  },
  "click .btn_delete": function(){
    event.preventDefault();
    Meteor.call("deleteTokens", this._id);
    if(Meteor.isCordova){
      Meteor.startup(function(){
        window.plugins.toast.showShortCenter("Token deleted");
      });
    }
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
