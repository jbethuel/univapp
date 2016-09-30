Template.adminDashboardHome.onCreated(function(){
  this.subscribe('tokens');
  this.subscribe('contacts');
  this.subscribe('news');
  this.subscribe('appusers');
});

Template.adminDashboardHome.helpers({
  announcements: function(){
    return news.find({}).count();
  },
  tokens: function(){
    return tokens.find({}).count();
  },
  tokensUsed: function(){
    return tokens.find({used: "true"}).count();
  },
  students: function(){
    return Meteor.users.find({roles: "student"}).count();
  },
  teachers: function(){
    return Meteor.users.find({roles: "teacher"}).count();
  }
});
