Template.adminDashboardHome.onCreated(function(){
  this.subscribe('adminTokens');
  this.subscribe('adminNews');
  this.subscribe('adminUsers');
});

Template.adminDashboardHome.helpers({
  announcements: function(){
    return news.find({}).count();
  },
  tokens: function(){
    return tokens.find({}).count();
  },
  tokensUsed: function(){
    return tokens.find({used: true}).count();
  },
  students: function(){
    return Meteor.users.find({roles: "student"}).count();
  },
  teachers: function(){
    return Meteor.users.find({roles: "teacher"}).count();
  }
});

Template.adminDashboardHome.events({
  "click .notify": function(e){
    e.preventDefault();
    Meteor.call("notify");
  }
})
