Template.teacherDashboardMessageboard.helpers({
  messages: function(){
    return messageboard.find({}).fetch();
  },
  equals: function(v1, v2) {
    return (v1 === v2);
  },
  name: function(senderId){
    Meteor.subscribe("teacherMessageBoardName", senderId);
    return Meteor.users.find({_id: senderId});
  }
});

Template.teacherDashboardMessageboard.onCreated(function(){
  id = Router.current().params.class_id;
  this.subscribe("teacherMessageBoard", id);
});

Template.teacherDashboardMessageboard.events({
  "click .btn_send": function(event){
    event.preventDefault();
    classId = Router.current().params.class_id;
    message = $('.txtArea').val();
    Meteor.call("teacherMessageBoardInsert", classId, message, function(error){
      if(error){
        console.log(error.reason);
      }else{
        console.log("ok");
      }
    });
  }
});
