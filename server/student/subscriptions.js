// studentDashboardHome
Meteor.publish("studentNews", function(){
  return news.find({$or: [{sendTo: "student"},{sendTo: "both"}]});
});
// studentDashboardClassAnnouncement
Meteor.publish("studentClass", function(){
  return students.find({studId: this.userId});
});

Meteor.publish("studentAnnouncement", function(classId){
  return announcement.find({classId:classId});
});

Meteor.publish("teacherName", function(id){
  return Meteor.users.find({_id: id});
});
// studentDashboardMessenger
Meteor.publish("studentThreads", function(){
  return threads.find({stud_id: this.userId});
});

Meteor.publish("studentMessagesImage", function(teach_id){
  return Images.find({userId: teach_id}).cursor;
});

Meteor.publish("studentMessengerName", function(teach_id){
  return Meteor.users.find({_id:teach_id});
});
// studentDashboardConversation
Meteor.publish("studentConversationTeachInfo", function(id){
  return Meteor.users.find({_id: id});
});

Meteor.publish("studentConversationMessages", function(stud_id, teach_id){
  return messages.find({stud_id: stud_id, teach_id: teach_id});
});
// studentDashboardSearch
Meteor.publish("classSearch", function(){
  return students.find({studId: this.userId});
});
// studentDashboardViewClass
Meteor.publish("studentClassInfo", function(id){
  return classindex.find({_id: id});
});

Meteor.publish("studentMessageBoard", function(id){
  return messageboard.find({classId: id});
});

Meteor.publish("studentMessageBoardName", function(senderId){
  return Meteor.users.find({_id: senderId}, {profile: 1});
});

Meteor.publish("studentGradeRecord",function(id){
  return graderecord.find({recordId:id});
});
