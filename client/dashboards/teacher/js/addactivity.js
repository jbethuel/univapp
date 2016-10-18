Template.teacheraddactivity.onCreated(function(){
  this.currentUpload = new ReactiveVar(false);
});

Template.teacheraddactivity.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  }
});

Template.teacheraddactivity.events({
  "click #btnAddActivity":function(e, template){
    var errors = false;
    e.preventDefault();
    var varfile = document.getElementById("fileinput").files;
    var title = $("#txtActivityTitle").val(),
        description = $("#txtActivityDescription").val(),
        term = $("#txtActivityTerm").val(),
        total_score = $("#txtTotalScore").val(),
        due_time = $("#timepicker").val(),
        due_date = $("#datepicker").val();
    var activity_info = {
      classId:Session.get("currentClassId"),
      recordId:"",
      title:title,
      total:total_score,
      description:description,
      term:term,
      due:new Date(due_date+","+due_time)
    };
    if(Meteor.Validation.CheckBlankSpace(activity_info.title) == true){
      activity_info.title = "No Title";
    }
    if(Meteor.Validation.CheckBlankSpace(activity_info.description) == true){
      activity_info.description = "No Description";
    }
    Meteor.call('addRecord',Session.get("currentClassId"),term,"class standing",total_score, function(error, result){
      var recordId = result;
        activity_info.recordId = recordId;
      Meteor.call('addActivity',activity_info,function(error, result){
        var activityId = result;
        console.log(activityId);
        if(varfile.length > 0){
          for(var f=0;f<varfile.length;f++){
            var file = varfile[f];
            console.log(file);
            file.activityId = activityId;

            if(file){
            var uploadInstance = ActivityFiles.insert({
              file: file,
              meta:{
                activityId:activityId,
                activityFile:true
              },
              streams: 'dynamic',
              chunkSize: 'dynamic'
            }, false);
            console.log(uploadInstance);
            uploadInstance.on('start', function() {
              console.log(this);
              template.currentUpload.set(this);
            });

            uploadInstance.on('end', function(error, fileObj) {
              if (error) {
                errors = true;
                IonLoading.show({
                  customTemplate: '<h4>ERROR</h4><p>'+ error.reason +'.</p>',
                  duration: 3000
                });
              }
              template.currentUpload.set(false);
            });

            uploadInstance.start();
          }
        }
        }
        if(errors == false){
        IonPopup.show({
          title: "success",
          template: "The activity has successfully saved.",
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
    });
    console.log(activity_info);
  },
  "change #fileinput":function(e){
    var varfile = document.getElementById("fileinput").files;
    var file = e.currentTarget.files;
    console.log(varfile);
  }
});
