Meteor.publish("studentMessageBoard", function(id){
  return messageboard.find({classId: id});
});

Meteor.publish("studentMessageBoardName", function(senderId){
  return Meteor.users.find({_id: senderId}, {profile: 1});
});

Meteor.methods({
  studentMessageBoardInsert: function(classId, message){
    id = this.userId;
    isStudent = students.find({studId: id, classId: classId}).count();
    if(isStudent == 0){
      throw new Meteor.Error(500,'Access Denied.');
    }else{
      messageboard.insert({
        classId: classId,
        senderId: this.userId,
        message: message,
        createdAt: new Date()
      });
    }
  }
});
