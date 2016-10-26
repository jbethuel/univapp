Template.studentDashboardMessenger.onCreated(function(){
  this.subscribe("studentThreads");
});

Template.studentDashboardMessenger.events({
  "click .item": function(event){
    event.preventDefault();
    Meteor.call("unreadSMessages", this.class_id, function(error){
      console.log(error.reason);
    });
    id = this.teach_id;
    Router.go('studentDashboardConversation',{
      teach_id: id,
      class_id: this.class_id
    });
  }
});

Template.studentDashboardMessenger.helpers({
  thread: function(){
    return threads.find({}).fetch();
  },
  equals: function(v1, v2) {
    return (v1 === v2);
  },
  image: function (){
    Meteor.subscribe("studentMessagesImage", this.teach_id);
    return Images.find({userId: this.teach_id});
  },
  name: function(teach_id){
    Meteor.subscribe("studentMessengerName", teach_id);
    return Meteor.users.find({_id:teach_id}).fetch();
  }
});
