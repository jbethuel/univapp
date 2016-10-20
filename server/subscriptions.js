Meteor.publish("tokens", function(){
  return tokens.find({});
});

Meteor.publish('appusers', function() {
  return Meteor.users.find({});
});

Meteor.publish("classindex",function(){
  return classindex.find({});
});

Meteor.publish("graderecord",function(){
  return graderecord.find({});
});

Meteor.publish("messageboard", function(){
  return messageboard.find({});
});
