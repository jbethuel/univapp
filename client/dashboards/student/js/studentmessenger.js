Template.studentDashboardMessenger.onCreated(function(){
  this.subscribe("studentMessages");
});

Template.studentDashboardMessenger.events({
  "click .item": function(event){
    event.preventDefault();
    id = this.teach_id;
    Router.go('studentDashboardConversation',{
      teach_id: id
    });
  }
});

Template.studentDashboardMessenger.helpers({
  thread: function(){
    id = Meteor.userId();
    return _.uniq(messages.find({stud_id: id},{sort: {
       createdAt: -1}
    }).fetch(), true, doc => {
      return doc.teach_id;// https://forums.meteor.com/t/mongo-distinct-query/1748/9
    });
  },
  image: function (){
    Meteor.subscribe("studentMessagesImage", this.teach_id);
    return Images.find({userId:this.teach_id});
  },
  name: function(teach_id){
    Meteor.subscribe("studentMessengerName", teach_id);
    return Meteor.users.find({_id:teach_id}).fetch();
  }
});
