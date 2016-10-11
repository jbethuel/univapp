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
Meteor.publish("studentMessages", function(){
  return messages.find({stud_id:this.userId});
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
