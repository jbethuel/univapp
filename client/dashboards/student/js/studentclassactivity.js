
Template.studentDashboardClassActivity.onCreated(function(){
  Tracker.autorun(function(){
    Meteor.subscribe("roomactivity",Session.get("currentClassId"));
  });
  Meteor.subscribe('files.images.all');
  Session.setDefault("Status","active");
});

Template.studentDashboardClassActivity.helpers({
  currentRoute: function(){
    return Router.current().params.class_id;
  },
  uploadedFiles: function () {
    return Images.find({userId:this.teachId});
  },
  classinfo:function(){
    Session.set("currentClassId",this.class_id);
    return Session.get("currentClassId");
  },
  activities:function(){
    var dueDate = new Date(Session.get("datetoday"));
    if(Session.get("Status") == "active"){
      return roomactivity.find({due:{$gt:dueDate}}).fetch();
    }else{
      return roomactivity.find({due:{$lt:dueDate}}).fetch();
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
  }
});
