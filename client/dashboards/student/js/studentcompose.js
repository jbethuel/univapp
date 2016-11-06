Template.compose.events({
  "click .btn_send": function(event){
    event.preventDefault();
    message = $('.txtContent').val();
    class_id = Router.current().params.class_id;
    stud_id = Meteor.userId();
    teach_id = Session.get("teachId");

    if(message == ""){
      if(Meteor.isCordova){
        Meteor.startup(function(){
          window.plugins.toast.showShortCenter("Type something..");
        });
      }
    }else{
      Meteor.call("studentSendMessage", class_id, stud_id, teach_id, message, function(error){
        if(error){
          console.log(error.reason);
        }else{
          if(Meteor.isCordova){
            Meteor.startup(function(){
              window.plugins.toast.showShortCenter("Message sent, check your messenger");
              $('.txtContent').val("");
            });
          }
        }
      });
    }

  }
});
