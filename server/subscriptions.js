Meteor.publish("tokens", function(){
  return tokens.find({});
});

Meteor.publish("tokensStudent", function(){
  return tokens.find({type: 'student'});
});

Meteor.publish("tokensTeacher", function(){
  return tokens.find({type: 'teacher'});
});

Meteor.publish('contacts', function() {
  return Meteor.users.find({});
});

Meteor.publish("news", function(){
  return news.find({});
});
