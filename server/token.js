Meteor.methods({
  adminpost: function(title, content){
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
          createdAt: new Date()
        });
      }
  },

  addTokensTeacher: function(token){
    var rand = function() {
        return Math.random().toString(36).substr(2);
    };
    var token = function() {
        return rand();
    };
    var token = token();
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
    var rand = function() {
        return Math.random().toString(36).substr(2);
    };
    var token = function() {
        return rand();
    };
    var token = token();
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
