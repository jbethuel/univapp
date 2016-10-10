Template.studentDashboardHome.onCreated(function(){
  this.subscribe('news');
});

Template.studentDashboardHome.helpers({
  news: function(){
    return news.find({sendTo: "student"});
  }
});
