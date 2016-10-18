
Template.studentDashboardClassActivity.onCreated(function(){
  Tracker.autorun(function(){
    Meteor.subscribe("roomactivity",Session.get("currentClassId"));
  });
  Meteor.subscribe('files.images.all');
  Meteor.subscribe('files.activityfiles.all');
  Session.setDefault("Status","active");
});

Template.studentDashboardClassActivity.helpers({
  currentRoute: function(){
    return Router.current().params.class_id;
  },
  uploadedFiles: function () {
    return Images.find({userId:this.teachId});
  },
  checkfile:function(){
    return ActivityFiles.find({userId:Meteor.userId(),meta:{activityId:this._id,activityFile:false}});
  },
  classinfo:function(){
    Session.set("currentClassId",this.class_id);
    return Session.get("currentClassId");
  },
  activities:function(){
    var dueDate = new Date(Session.get("datetoday"));
    if(Session.get("Status") == "active"){
      return roomactivity.find({due:{$gt:dueDate}},{sort:{due:1}}).fetch();
    }else{
      return roomactivity.find({due:{$lt:dueDate}},{sort:{due:1}}).fetch();
    }
  },
  dateformat:function(){
    return moment(this.due).format("LTS, MM-DD-YYYY");
  },
  statusActiveCheck:function(){
    if(Session.get("Status") == "active"){
      return true;
    }else{
      return false;
    }
  },
  statusDueCheck:function(){
    if(Session.get("Status") == "due"){
      return true;
    }else{
      return false;
    }
  }
});

Template.studentDashboardClassActivity.events({
  "click #statusActive":function(e){
    Session.set("Status","active");
  },
  "click #statusDue":function(e){
    Session.set("Status","due");
  },
  "click .viewActivity":function(e){
    e.preventDefault();
    Router.go("studentViewActivity",{activity_id:this._id});
  }
});
