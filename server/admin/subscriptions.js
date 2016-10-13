// adminDashboardHome
Meteor.publish("adminTokens", function(){
  return tokens.find({});
});

Meteor.publish("adminUsers", function(){
  return Meteor.users.find({});
});

Meteor.publish("adminNews", function(){
  return news.find({});
});
// adminDashboardTokenStudent
Meteor.publish("adminTokenStudent", function(){
  return tokens.find({type: 'student'});
});
// adminDashboardTokenTeacher
Meteor.publish("adminTokenTeacher", function(){
  return tokens.find({type: 'teacher'});
});
// adminDashboardLoginUser adminDashboardModify
Meteor.publish("adminSearchUser", function(){
  return Meteor.users.find({});
})
// _modifyuser
Meteor.publish("adminModifyUser", function(id){
  return Meteor.users.find({_id: id})
});
