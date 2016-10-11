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
