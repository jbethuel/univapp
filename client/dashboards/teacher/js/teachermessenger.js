Template.teacherDashboardMessenger.onCreated(function(){
  this.subscribe("teacherThreads");
});

Template.teacherDashboardMessenger.events({
  "click .item": function(event){
    event.preventDefault();
    id = this.stud_id;
    Meteor.call("unreadTMessages", this.class_id, function(error){
      if(error){
        console.log(error.reason);
      }
    });
    Router.go('teacherDashboardConversation',{
      stud_id: id,
      class_id: this.class_id
    });
  }
});

Template.teacherDashboardMessenger.helpers({
  thread: function(){
    return threads.find({}).fetch();
  },
  name: function(stud_id){
    Meteor.subscribe("teacherMessengerName", stud_id);
    return Meteor.users.find({_id:stud_id}).fetch();
  },
  image: function (){
    Meteor.subscribe("studentMessagesImage", this.stud_id);
    return Images.find({userId:this.stud_id});
  },
  seenByTeacher: function(){
    if(this.seenByTeacher == false){
      return false;
    }else{
      return true;
    }
  }
});
