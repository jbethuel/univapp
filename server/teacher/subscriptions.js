Meteor.publish("teacherMessageBoard", function(id){
  return messageboard.find({classId: id});
});

Meteor.publish("teacherMessageBoardName", function(senderId){
  return Meteor.users.find({_id: senderId}, {profile: 1});
});

Meteor.publish("studentCount", function(_id){
  return students.find({classId: _id});
});

Meteor.publish("teacherNews", function(){
  return news.find({$or: [{sendTo: "teacher"},{sendTo: "both"}]});
});
