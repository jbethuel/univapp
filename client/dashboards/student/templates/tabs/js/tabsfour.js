Template.tabsFour.onCreated(function(){
  this.subscribe("messageboard");
  this.subscribe("appusers");
});

Template.tabsFour.events({
  "click .btn_send": function(event){
    event.preventDefault();

    classId = Session.get("classId");
    senderId = Meteor.userId();
    message = $(".messagearea").val();

    Meteor.call("messageBoardInsert", classId, senderId, message, function(){
      if(Meteor.error){
        console.log(error.reason);
      }else{
        console.log('ok');
      }
    });
  }
});

Template.tabsFour.helpers({
  messages: function(){
    classId = Session.get("classId");
    return messageboard.find({classId:classId}).fetch();
  },
  equals: function(v1, v2){
    return (v1 === v2);
  },
  sendername: function(senderId){
    return Meteor.users.find({_id:senderId}).fetch();
  }
});
