Template.compose.events({
  "click .btn_send": function(event){
    event.preventDefault();
    message = $('.txtContent').val();
    classId = Router.current().params.class_id;
    stud_id = Meteor.userId();
    teach_id = Session.get("teachId");

    Meteor.call("studentSendMessage", stud_id, teach_id, message, function(error){
      if(error){
        console.log(error.reason);
      }else{
        console.log("ok");
      }
    })

  }
});
