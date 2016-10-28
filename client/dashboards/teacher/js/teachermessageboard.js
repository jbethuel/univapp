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
  },
  image: function (){
    Meteor.subscribe("studentMessagesImage", this.senderId);
    return Images.find({userId:this.senderId});
  },
  ownImage: function (){
    return Images.find({userId:Meteor.userId()});
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

    if(message == ""){
      if(Meteor.isCordova){
        window.plugins.toast.showWithOptions({message: "Type something", duration: "short", position: "bottom", addPixelsY: -80});
      }
    }else{
      Meteor.call("teacherMessageBoardInsert", classId, message, function(error){
        if(error){
          console.log(error.reason);
        }else{
          window.plugins.toast.showWithOptions({message: "Message sent", duration: "short", position: "bottom", addPixelsY: -80});
          $('.txtArea').val("");
        }
      });
    }
  }
});
