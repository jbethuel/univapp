Template.teacherDashboardAnnouncement.events({
  "click .btn-send": function(event){
    event.preventDefault();
    title = $('#anno_title').val();
    content = $('#anno_content').val();
    classId = Router.current().params.class_id;
    Meteor.call("teacherAnnouncement", classId, title, content, function(error){
      if(error){
        console.log(error.reason);
      }else{
        console.log("ok");
      }
    });

  }
});
