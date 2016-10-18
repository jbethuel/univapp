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
      title = "ERROR";
      button = "button button-assertive";
      template = "<div class='title_prompt'>Please complete all the fields.</div>";
      Meteor.Messages.dialog(title, template, button);
    }else{

    Meteor.call('AddClass', description, sec_code, subj_code, sched, time_start, time_end, sem, school_yr, function(error){
      if(!error){
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
    });
  }
  }
});
