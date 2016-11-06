Template.teacherDashboardAnnouncement.events({
  "click .btn-send": function(event){
    event.preventDefault();
    title = $('#anno_title').val();
    content = $('#anno_content').val();
    classId = Router.current().params.class_id;

    if(title == "" || content == ""){
      if(Meteor.isCordova){
        Meteor.startup(function(){
          window.plugins.toast.showShortCenter("Please complete all the fields.");
        });
      }else{
        IonPopup.show({
          title: "ERROR",
          template: "<div class='title_prompt'>Please complete all the fields.</div>",
          buttons: [{
            text: 'OK',
            type: "button button-assertive",
            onTap: function() {
              IonPopup.close();
            }
          }]
        });
      }
    }else{
      Meteor.call("teacherAnnouncement", classId, title, content, function(error){
        if(error){
          console.log(error.reason);
        }else{
          if(Meteor.isCordova){
            Meteor.startup(function(){
              window.plugins.toast.showShortCenter("Announcement successfully posted.");
              $('#anno_title').val("");
              $('#anno_content').val("");
            });
          }
        }
      });
    }
  }
});
