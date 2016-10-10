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

  deleteTokens: function(token){
    Tokens.remove({_id: token});
  }

});
