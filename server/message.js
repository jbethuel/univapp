Meteor.publish("teacherMessages", function(id){
  return messages.find({teach_id:id});
});

Meteor.publish("studentMessages", function(id){
  return messages.find({stud_id:id});
});

Meteor.publish("user", function(id){
  return Meteor.users.find({_id: id});
});

Meteor.publish("subStudentMessages", function(stud_id, teach_id){
  return messages.find({stud_id: stud_id, teach_id: teach_id});
});

Meteor.publish("subTeacherMessages", function(stud_id, teach_id){
  return messages.find({stud_id:stud_id, teach_id: teach_id});
});

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
  teacherSendMessage: function(stud_id, teach_id, message){
    messages.insert({
      stud_id: stud_id,
      teach_id: teach_id,
      message: message,
      sentBy: teach_id,
      seenByStudent: false,
      createdAt: new Date()
    });
  }
});
