Template.teacherDashboardMessenger.onCreated(function(){
  id = Meteor.userId();
  this.subscribe("teacherMessages", id);
  this.subscribe("appusers");
});

Template.teacherDashboardMessenger.events({
  "click .item": function(event){
    event.preventDefault();
    id = this.stud_id;
    Router.go('teacherDashboardConversation',{
      stud_id: id
    });
  }
});

Template.teacherDashboardMessenger.helpers({
  thread: function(){
    id = Meteor.userId();
    return _.uniq(messages.find({sentBy: id},{sort: {
      stud_id: 0, createdAt: -1}
    }).fetch(), true, doc => {
      return doc.stud_id;// https://forums.meteor.com/t/mongo-distinct-query/1748/9
    });
  },
  name: function(stud_id){
    return Meteor.users.find({_id:stud_id},{username:1}).fetch();
  }
});
