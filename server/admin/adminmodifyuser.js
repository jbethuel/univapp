Meteor.methods({
  modifyuser: function(id, username, firstname, middlename, lastname){
    var isadmin = Meteor.user().roles[0];
    if(isadmin != "admin"){
      throw new Meteor.Error("Access Denied");
    }else{
      Accounts.setUsername(id, username);
      Meteor.users.update({_id: id}, {$set: {"profile.id": username}});
      Meteor.users.update({_id: id}, {$set: {"profile.firstname": firstname, "profile.middlename": middlename, "profile.lastname": lastname}});
    }
  },
  updatePassword: function(userId, password){
    var isadmin = Meteor.user().roles[0];
    if(isadmin != "admin"){
      throw new Meteor.Error("Access Denied");
    }else{
      Accounts.setPassword(userId, password);
    }
  }
});
