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
