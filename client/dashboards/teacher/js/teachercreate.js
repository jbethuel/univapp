Template.teacherDashboardCreate.events({
  //it will add class
  "click #btnAddClass": function(event){
    event.preventDefault();
    var description = $("#txtAddDescription").val(),
    sec_code = $("#txtAddSectionCode").val(),
    subj_code = $("#txtAddSubjectCode").val(),
    sched = $("#txtAddSchedule").val(),
    time_start = $("#txtTimeStart").val();
    time_end = $("#txtTimeEnd").val();
    sem = $("#txtAddSemester").val(),
    school_yr = $("#txtAddYear").val();

    if(Meteor.Validation.CheckBlankSpace(description) ||
      Meteor.Validation.CheckBlankSpace(sec_code) ||
      Meteor.Validation.CheckBlankSpace(subj_code)){
        if(Meteor.isCordova){
          Meteor.startup(function(){
            window.plugins.toast.showShortCenter("Please Complete all the fields.");
          });
        }else{
          title = "ERROR";
          button = "button button-assertive";
          template = "<div class='title_prompt'>Please complete all the fields.</div>";
          Meteor.Messages.dialog(title, template, button);
        }
    }else if(time_start == time_end){
      if(Meteor.isCordova){
        Meteor.startup(function(){
          window.plugins.toast.showShortCenter("Cannot set the same time start and time end.");
        });
      }else{
        title = "ERROR";
        button = "button button-assertive";
        template = "<div class='title_prompt'>Cannot set the same time start and time end.</div>";
        Meteor.Messages.dialog(title, template, button);
      }
    }else{
      Meteor.call('AddClass', description, sec_code, subj_code, sched, time_start, time_end, sem, school_yr, function(error){
      if(!error){
        if(Meteor.isCordova){
          Meteor.startup(function(){
            window.plugins.toast.showShortCenter("Class Successfully Created!");
            IonPopup.close();
            IonModal.close();
          });
        }else{
          IonPopup.show({
            title: "SUCCESS",
            template: "<div class='title_prompt'>Class Successfully Created!</div>",
            buttons: [{
              text: 'OK',
              type: "button button-balanced",
              onTap: function() {
                IonPopup.close();
                IonModal.close();
              }
            }]
          });
        }
      }
    });
  }
  }
});
