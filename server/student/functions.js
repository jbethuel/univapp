Meteor.methods({
  studentSendMessage: function(stud_id, teach_id, message){
    messages.insert({
      stud_id: stud_id,
      teach_id: teach_id,
      message: message,
      sentBy: stud_id,
      seenByTeacher: false,
      createdAt: new Date()
    });
  },
  joinClass: function(studDetails){
    students.insert(studDetails);
  },
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
  },
  studentDropClass: function(id){
    isStudent = students.find({classId: id, studId: this.userId}).count();
    if(isStudent == 0){
      throw new Meteor.Error(500,'Access Denied.');
    }else{
      students.remove({classId: id, studId: this.userId});
    }
  }
});
