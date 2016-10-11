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

Meteor.publish("classindex",function(){
  return classindex.find({});
});

Meteor.publish("students",function(classId){
  return students.find({classId:classId});
});

Meteor.publish("attendance",function(classId){
  return attendance.find({classId:classId});
});

Meteor.publish("graderecord",function(){
  return graderecord.find({});
});

Meteor.publish("graderecordindex",function(classId){
  return graderecordindex.find({classId:classId});
});

Meteor.publish("percentage",function(classId){
  return percentage.find({classId:classId});
});

Meteor.publish("messageboard", function(){
  return messageboard.find({});
});
