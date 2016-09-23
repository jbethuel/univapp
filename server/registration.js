Meteor.methods({

  registerStudent: function(token, stud_id, fullname, pw){
    var ifexist = tokens.find({token:token, used: false, type:'student'}).count();
    if(ifexist === 1){
      studentDetails = {
        username: id,
        password: password,
        profile: {
          id: id,
          fullname: fullname
        }
      }
      id = Accounts.createUser(studentDetails);
      Roles.addUsersToRoles(id, 'student');
      tokens.update({token: token}, {$set: {used: "true"}});
    }else{
      throw new Meteor.Error("invalid", "Invalid Token.");
    }
  },
  registerTeacher: function(token, teach_id, fullname, pw){
    var ifexist = tokens.find({token: token, used: false, type:'teacher'}).count();
    if(ifexist === 1){
        regDetails = {
        username: id,
        password: password,
        profile: {
          id: id,
          fullname: fullname
        }
      }
        id = Accounts.createUser(regDetails);
        Roles.addUsersToRoles(id, 'teacher');
        Tokens.update({token: token}, {$set: {used: "true"}});
    }else{
      throw new Meteor.Error("invalid", "Invalid Token.");
    }
  }

});
