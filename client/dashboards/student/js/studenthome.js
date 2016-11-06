Template.studentDashboardHome.onCreated(function(){
  this.subscribe('studentNews');
});

Template.studentDashboardHome.helpers({
  news: function(){
    return news.find({}, {sort: {createdAt: -1}, limit: 10}).fetch();
  },
  day: function(){
    return moment(this.createdAt).format('MMMM Do YYYY');
  },
  time: function(){
    return moment(this.createdAt).format('h:mm a');
  }
});
