Template.teachereditactivity.onCreated(function(){
  Tracker.autorun(function(){
    Meteor.subscribe("roomactivity",Session.get("currentClassId"));
  });
  Meteor.subscribe("files.activityfiles.all");
  this.currentUpload = new ReactiveVar(false);
});
Template.teachereditactivity.helpers({
  activityinfo:function(){
    return roomactivity.find({_id:Session.get("ActivityId")}).fetch();
  },
  timeformat:function(due){
    return moment(due).format('LT');
  },
  dateformat:function(due){
    return moment(due).format("YYYY-MM-DD");
  },
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },
  uploadedFiles: function () {
    return ActivityFiles.find({meta:{activityId:this._id,activityFile:true}});
  },
});
Template.teachereditactivity.events({
  "click #btnEditActivity":function(e,template){
    e.preventDefault();
    var errors = false,
        hasFile = false;
    var varfile = document.getElementById("fileinput").files;
    var title = $("#txtActivityTitle").val(),
        description = $("#txtActivityDescription").val(),
        term = $("#txtActivityTerm").val(),
        total_score = $("#txtTotalScore").val(),
        due_time = $("#timepicker").val(),
        due_date = $("#datepicker").val();
    var activity_info = {
      classId:Session.get("currentClassId"),
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
    Meteor.call('editRecord',this.recordId,total_score,term,function(error){
      if(error){
        console.log(error);
        }
    });
    Meteor.call('editActivity',activity_info,this._id,function(error){
      if(error){
        console.log(error);
      }
    });
    if(varfile.length > 0){
      hasFile = true;
      for(var f=0;f<varfile.length;f++){
        var file = varfile[f];
        console.log(file);
        var activityId = this._id;

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
          }else{
            IonPopup.show({
              title: "success",
              template: "The record has successfully updated.",
              buttons: [{
                text: 'OK',
                type: "button button-balanced",
                onTap: function() {
                  IonPopup.close();
                }
              }]
            });
          }
          template.currentUpload.set(false);
        });

        uploadInstance.start();
      }
    }
    }
    if(errors == false && hasFile == false){
    IonPopup.show({
      title: "success",
      template: "The record has successfully updated.",
      buttons: [{
        text: 'OK',
        type: "button button-balanced",
        onTap: function() {
          IonPopup.close();
        }
      }]
    });
    }
    console.log(activity_info);
  },
  "click .del-file":function(e){
    e.preventDefault();
    console.log(this._id);
    Meteor.call("deleteOneFile",this._id);
  }
});
