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
