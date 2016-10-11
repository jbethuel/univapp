Template.teacherDashboardHome.onCreated(function(){
  this.subscribe('teacherNews');
});

Template.teacherDashboardHome.helpers({
  news: function(){
    return news.find({});
  }
});
