// teacherDashboardHome
Meteor.publish("teacherNews", function(){
  return news.find({$or: [{sendTo: "teacher"},{sendTo: "both"}]});
});
// teacherDashboardMessenger
Meteor.publish("teacherMessages", function(id){
  return messages.find({teach_id:id});
});

Meteor.publish("teacherMessengerName", function(stud_id){
  return Meteor.users.find({_id:stud_id});
});

Meteor.publish("teacherMessageBoard", function(id){
  return messageboard.find({classId: id});
});

Meteor.publish("teacherMessageBoardName", function(senderId){
  return Meteor.users.find({_id: senderId}, {profile: 1});
});

Meteor.publish("studentCount", function(_id){
  return students.find({classId: _id});
});

Meteor.publish("roomactivity",function(classId){
  return roomactivity.find({classId:classId});
});

Meteor.publish("viewactivity",function(id){
  return roomactivity.find({_id:id});
});
Meteor.publish("viewrecords",function(id){
  return graderecord.find({recordId:id});
});
Meteor.publish("studentInfo",function(){
  return Meteor.users.find({},{fields:{services:0}});
});
Meteor.publish("teacherStudentprofile", function(studId){
  return Meteor.users.find({_id: studId}, {profile: 1});
});

Meteor.publish("students",function(classId){
  return students.find({classId:classId});
});

Meteor.publish("attendance",function(classId){
  return attendance.find({classId:classId});
});

Meteor.publish("graderecordindex",function(classId){
  return graderecordindex.find({classId:classId});
});

Meteor.publish("percentage",function(classId){
  return percentage.find({classId:classId});
});
