Template.teacherDashboardHome.onCreated(function(){
  this.subscribe('news');
});

Template.teacherDashboardHome.helpers({
  news: function(){
    return news.find({});
  }
});
