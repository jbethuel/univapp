Template.teacherDashboardActivity.onCreated(function(){
  Tracker.autorun(function(){
    Meteor.subscribe("roomactivity",Session.get("currentClassId"));
  });
  Meteor.subscribe('files.images.all');
  Session.setDefault("Status","active");
});

Template.teacherDashboardActivity.helpers({
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

Template.teacherDashboardActivity.events({
  "click #statusActive":function(e){
    Session.set("Status","active");
  },
  "click #statusDue":function(e){
    Session.set("Status","due");
  },
  "click .btnEditActivityPopOver":function(e){
    e.preventDefault();
    Session.set("ActivityId",this._id);
    Session.set("RecordId",this.recordId);
    console.log(this._id);
  }
});

Template._EditActivityPopOver.events({
  "click .btnEditActivity":function(e){
    e.preventDefault();
    IonModal.open("teachereditactivity");
    IonPopover.hide();
  },
  "click .btnDeleteActivity":function(e){
    e.preventDefault();
    var recordId = Session.get("RecordId"),
        activityId = Session.get("ActivityId");
    IonPopup.prompt({
      title: 'Delete Activity',
      template: "<div class='title_prompt'>Are you sure to delete this activity?<br> type <strong>YES</strong></div>",
      okText: 'Confirm',
      inputType: 'text',
      inputPlaceholder: '',
        onOk: function(error, result){
          if(result == "YES"){
            id = Router.current().params.class_id;
            Meteor.call("deleteRecord", recordId, function(error){
              if(error){
                console.log(error.reason);
              }else{
                Meteor.call("deleteActivity",activityId,function(result){
                  if(!result){
                    Meteor.call("deleteFiles",activityId);
                    IonLoading.show({
                      customTemplate: '<h4>SUCCESS</h4><p>The activity is successfully deleted.</p>',
                      duration: 3000
                    });
                  }
                });
              }
            });
          }else{
            IonLoading.show({
              customTemplate: '<h4>ERROR</h4><p>Invalid keyword.</p>',
              duration: 3000
            });

          }
        }
    });
    IonPopover.hide();
    console.log(Session.get("ActivityId"));

  }
});
