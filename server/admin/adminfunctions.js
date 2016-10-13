Meteor.methods({
  adminpost: function(title, content, sendTo){
    var isadmin = Meteor.user().roles[0];
    var author = Meteor.user().profile.fullname;
      if(isadmin != 'admin'){
        throw new Meteor.Error("Access Denied");
      }else if(isadmin == 'admin'){
        news.insert({
          author: author,
          authorId: Meteor.userId(),
          title: title,
          content: content,
          sendTo: sendTo,
          createdAt: new Date()
        });
      }
  },
  addTokensStudent: function(token){
    var token = Random.id(8);
    var auth = Meteor.user().roles[0];
      if(auth != 'admin'){
        throw new Meteor.Error("Access Denied");
      }else if(auth == 'admin'){
        tokens.insert({
          token: token,
          used: false,
          type: 'student',
          createdAt: new Date()
        });
      }
  },
  addTokensTeacher: function(token){
    var token = Random.id(8);
    var auth = Meteor.user().roles[0];
      if(auth != 'admin'){
        throw new Meteor.Error("Access Denied");
      }else if(auth == 'admin'){
        tokens.insert({
          token: token,
          used: false,
          type: 'teacher',
          createdAt: new Date()
        });
      }
  },
  deleteTokens: function(id){
    tokens.remove({_id: id});
  },
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
