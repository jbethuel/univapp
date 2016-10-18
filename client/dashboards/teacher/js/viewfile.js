Template.viewfile.onCreated(function(){
  Tracker.autorun(function(){
    Meteor.subscribe("viewrecords",Session.get("currentRecordId"));
  });
  Meteor.subscribe('files.activityfiles.all');
});

Template.viewfile.helpers({
  infos:function(){
    Session.set("currentRecordId",this.recordId);
    Session.set("currentFileId",this.studentfile_id);
    return "connected";
  },
  studentgrade:function(){
  return graderecord.findOne({recordId:Session.get("currentRecordId"),studId:this.userId});
  },
  uploadedFiles: function () {
    var info = ActivityFiles.find({_id:Session.get("currentFileId")});
    console.log(info);
    return info;
  }
});

Template.viewfile.events({
  "click #updategrade":function(){
  var newgrade = +$("#newgrades").val();
  Meteor.call('changeStudentGrade', this._id, newgrade, function(error){
    if(error){
      title = "ERROR";
      template = "<div class='title_prompt'>"+ error.reason +"</div>";
      Meteor.Messages.dialog(title, template);
    }else{
      title = "success";
      template = "Successfully Updated";
      button = "button button-balanced";
      Meteor.Messages.dialog(title, template, button);
    }
  });
}
});
