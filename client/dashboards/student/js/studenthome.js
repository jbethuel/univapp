Template.studentDashboardHome.onCreated(function(){
  this.subscribe('studentNews');
});

Template.studentDashboardHome.helpers({
  news: function(){
    return news.find({}, {sort: {createdAt: -1}}).fetch();
  }
});
