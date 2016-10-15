Template.teacherDashboardConversation.onRendered(function(){
  $(".padding").animate({ scrollTop: $('.padding').height()}, 1000);
});

Template.teacherDashboardConversation.onCreated(function(){
  teach_id = Meteor.userId();
  stud_id = Router.current().params.stud_id;
  id = stud_id;
  this.subscribe("teacherMessengerName", stud_id);
  this.subscribe("subTeacherMessages", stud_id, teach_id);
});

Template.teacherDashboardConversation.events({
  "click .btn_send": function(event){
    event.preventDefault();

    teach_id = Meteor.userId();
    stud_id = Router.current().params.stud_id;
    message = $('.txtArea').val();
    Meteor.call("teacherSendMessage", stud_id, teach_id, message, function(error){
      if(error){
        console.log(error.reason);
      }else{
        console.log("ok");
      }
    });
  }
});

Template.teacherDashboardConversation.helpers({
  equals: function(v1, v2) {
    return (v1 === v2);
  },
  messages: function(){
    teach_id = Meteor.userId();
    stud_id = Router.current().params.stud_id;
    return messages.find({stud_id: stud_id, teach_id: teach_id}).fetch();
  },
  name: function(){
    stud_id = Router.current().params.stud_id;
    return Meteor.users.find({_id:stud_id},{username:1}).fetch();
  },
  image: function (){
    Meteor.subscribe("studentMessagesImage", this.stud_id);
    return Images.find({userId:this.stud_id});
  },
  ownImage: function (){
    return Images.find({userId:Meteor.userId()});
  }
});
