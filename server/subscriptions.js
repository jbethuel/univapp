Meteor.publish("tokens", function(){
  return tokens.find({});
});

Meteor.publish("tokensStudent", function(){
  return tokens.find({type: 'student'});
});

Meteor.publish("tokensTeacher", function(){
  return tokens.find({type: 'teacher'});
});

Meteor.publish('appusers', function() {
  return Meteor.users.find({});
});

Meteor.publish("news", function(){
  return news.find({});
});

Meteor.publish("classindex",function(){
  return classindex.find({});
});

Meteor.publish("students",function(){
  return students.find({});
});

Meteor.publish("attendance",function(){
  return attendance.find({});
});

Meteor.publish("graderecord",function(){
  return graderecord.find({});
});

Meteor.publish("graderecordindex",function(){
  return graderecordindex.find({});
});

Meteor.publish("percentage",function(){
  return percentage.find({});
});

Meteor.publish("messageboard", function(){
  return messageboard.find({});
});
