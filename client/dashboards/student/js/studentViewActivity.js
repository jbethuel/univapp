Template.studentViewActivity.onCreated(function(){
  Tracker.autorun(function(){
    Meteor.subscribe("viewactivity",Session.get("currentActivityId"));
    Meteor.subscribe("studentGradeRecord",Session.get("RecordId"));
  });
  Meteor.subscribe('files.activityfiles.all');
});

Template.studentViewActivity.onDestroyed(function(){

})

Template.studentViewActivity.helpers({
  activity_info:function(){
    Session.set("currentActivityId",this.activity_id);
    console.log(this.activity_id);
    return roomactivity.find({_id:Session.get("currentActivityId")});
  },
  dateformat:function(){
    return moment(this.due).format("LTS, MM-DD-YYYY");
  },
  fileRef: function () {
    return ActivityFiles.find({meta:{activityId:Session.get("currentActivityId"),activityFile:true}});
  },
  myFile:function(){
    return ActivityFiles.find({userId:Meteor.userId(),meta:{activityId:this._id,activityFile:false}});
  },
  points:function(){
    return Number(this.total);
  },
  myGrade:function(){
    Session.set("RecordId",this.recordId);
    return graderecord.find({recordId:this.recordId,studId:Meteor.userId()});
  },
  notDue:function(){
    var nowDate = new Date(Session.get("datetoday"));
    if(this.due > nowDate){
      return true;
    }else{
      return false;
    }
  }
});
