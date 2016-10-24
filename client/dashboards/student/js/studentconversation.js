Template.studentDashboardConversation.onCreated(function(){
  stud_id = Meteor.userId();
  teach_id = Router.current().params.teach_id;
  id = teach_id;
  this.subscribe("studentConversationTeachInfo", id);
  this.subscribe("studentConversationMessages", stud_id, teach_id);
});

Template.studentDashboardConversation.events({
  "click .btn_send": function(event){
    event.preventDefault();

    stud_id = Meteor.userId();
    teach_id = Router.current().params.teach_id;
    class_id = Router.current().params.class_id;
    message = $('.txtArea').val();

    if(message == ""){
      if(Meteor.isCordova){
        window.plugins.toast.showWithOptions({message: "Type something", duration: "short", position: "bottom", addPixelsY: -80});
      }
    }else{
      Meteor.call("studentSendMessage", class_id, stud_id, teach_id, message, function(error){
        if(error){
          console.log(error.reason);
        }else{
          window.plugins.toast.showWithOptions({message: "Message sent", duration: "short", position: "bottom", addPixelsY: -80});
          message = $('.txtArea').val("");
        }
      });
    }
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
  },
  image: function (){
    Meteor.subscribe("studentMessagesImage", this.teach_id);
    return Images.find({userId:this.teach_id});
  },
  ownImage: function (){
    return Images.find({userId:Meteor.userId()});
  }
});
