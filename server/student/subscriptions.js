Meteor.publish("studentClass", function(id){
  return students.find({studId: id});
});

Meteor.publish("studentClassInfo", function(id){
  return classindex.find({_id: id});
});

Meteor.publish("teacherName", function(id){
  return Meteor.users.find({_id: id});
});
