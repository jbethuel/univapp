Template.teacherDashboardConversation.onRendered(function(){
  $(".padding").animate({ scrollTop: $('.padding').height()}, 1000);
});

Template.teacherDashboardConversation.onCreated(function(){
  teach_id = Meteor.userId();
  stud_id = Router.current().params.stud_id;
  this.subscribe("teacherMessengerName", stud_id);
  this.subscribe("subTeacherMessages", stud_id, teach_id);
});

Template.teacherDashboardConversation.events({
  "click .btn_send": function(event){
    event.preventDefault();

    teach_id = Meteor.userId();
    stud_id = Router.current().params.stud_id;
    class_id = Router.current().params.class_id;
    message = $('.txtArea').val();

    if(message == ""){
      if(Meteor.isCordova){
        window.plugins.toast.showWithOptions({message: "Type something", duration: "short", position: "bottom", addPixelsY: -80});
      }
    }else{
      Meteor.call("teacherSendMessage", class_id, stud_id, teach_id, message, function(error){
        if(error){
          console.log(error.reason);
        }else{
          if(Meteor.isCordova){
            window.plugins.toast.showWithOptions({message: "Message sent", duration: "short", position: "bottom", addPixelsY: -80});
            $('.txtArea').val("");
          }
        }
      });
    }
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
