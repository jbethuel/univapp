Template.teacherViewActivity.onCreated(function(){
  Tracker.autorun(function(){
    Meteor.subscribe("viewactivity",Session.get("currentActivityId"));
  });
  Meteor.subscribe("studentInfo");
  Meteor.subscribe("files.images.all");
  Meteor.subscribe('files.activityfiles.all');
});

Template.teacherViewActivity.onDestroyed(function(){

})

Template.teacherViewActivity.helpers({
  activity_info:function(){
    Session.set("currentActivityId",this.activity_id);
    console.log(this.activity_id);
    var info = roomactivity.find({_id:Session.get("currentActivityId")}).fetch();
    console.log(info);
    Session.set("currentRecordId",info[0].recordId);
    return info;
  },
  dateformat:function(){
    return moment(this.due).format("LTS, MM-DD-YYYY");
  },
  points:function(){
    return Number(this.total);
  },
  fileRef: function () {
    return ActivityFiles.find({meta:{activityId:Session.get("currentActivityId"),activityFile:true}});
  },
  studentFile:function(){
    return ActivityFiles.find({meta:{activityId:Session.get("currentActivityId"),activityFile:false}});
  },
  uploadedFiles: function () {
    return Images.find({userId:this.userId});
  },
  studentInfo:function(){
    var userInfo = Meteor.users.find({_id:this.userId}).fetch();
    return userInfo[0].profile.lastname + ", " + userInfo[0].profile.firstname;
  }
});

Template.teacherViewActivity.events({
  "click .viewStudentFile":function(e){
    e.preventDefault();
    var studentfile_id = this._id;
    Router.go("viewfile",{studentfile_id:studentfile_id,recordId:Session.get("currentRecordId")});
  }
});
