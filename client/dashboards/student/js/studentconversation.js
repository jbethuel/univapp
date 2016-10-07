Template.studentDashboardConversation.onRendered(function(){
  $(".padding").animate({ scrollTop: $('.padding').height()}, 1000);
});

Template.studentDashboardConversation.onCreated(function(){
  stud_id = Meteor.userId();
  teach_id = Router.current().params.teach_id;
  id = teach_id;
  this.subscribe("user", id);
  this.subscribe("subStudentMessages", stud_id, teach_id);
});

Template.studentDashboardConversation.events({
  "click .btn_send": function(event){
    event.preventDefault();

    stud_id = Meteor.userId();
    teach_id = Router.current().params.teach_id;
    message = $('.txtArea').val();
    Meteor.call("studentSendMessage", stud_id, teach_id, message, function(error){
      if(error){
        console.log(error.reason);
      }else{
        console.log("ok");
      }
    });
  }
});

Template.studentDashboardConversation.helpers({
  equals: function(v1, v2) {
    return (v1 === v2);
  },
  messages: function(){
    stud_id = Meteor.userId();
    teach_id = Router.current().params.teach_id;
    return messages.find({stud_id: stud_id, teach_id: teach_id}).fetch();
  },
  name: function(){
    teach_id = Router.current().params.teach_id;
    return Meteor.users.find({_id:teach_id},{username:1}).fetch();
  }
});
