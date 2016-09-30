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
