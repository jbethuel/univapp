Meteor.publish("teacherMessageBoard", function(id){
  return messageboard.find({classId: id});
});

Meteor.publish("teacherMessageBoardName", function(id){
  return Meteor.users.find({_id: senderId}, {profile: 1});
});


Meteor.methods({
  teacherMessageBoardInsert: function(classId, message){
    id = this.userId;
    isTeacher = classindex.find({teachId: id, _id: classId}).count();
    if(isTeacher == 0){
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
