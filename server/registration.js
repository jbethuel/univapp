Meteor.methods({

  registerStudent: function(token, stud_id, firstname, middlename, lastname, pw){
    var ifexist = tokens.find({token:token, used: false, type:'student'}).count();
    if(ifexist === 1){
      studentDetails = {
        username: stud_id,
        password: pw,
        profile: {
          id: stud_id,
          firstname: firstname,
          middlename: middlename,
          lastname: lastname
        }
      }
      id = Accounts.createUser(studentDetails);
      Roles.addUsersToRoles(id, 'student');
      tokens.update({token: token}, {$set: {used: true}});
    }else{
      throw new Meteor.Error("invalid", "Invalid Token.");
    }
  },
  registerTeacher: function(token, teach_id, firstname, middlename, lastname, pw){
    var ifexist = tokens.find({token: token, used: false, type:'teacher'}).count();
    if(ifexist === 1){
        regDetails = {
        username: teach_id,
        password: pw,
        profile: {
          id: teach_id,
          firstname: firstname,
          middlename: middlename,
          lastname: lastname
        }
      }
        id = Accounts.createUser(regDetails);
        Roles.addUsersToRoles(id, 'teacher');
        tokens.update({token: token}, {$set: {used: true}});
    }else{
      throw new Meteor.Error("invalid", "Invalid Token.");
    }
  }

});
