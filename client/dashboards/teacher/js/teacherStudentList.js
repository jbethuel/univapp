Template.teacherStudentList.onCreated(function(){
  Tracker.autorun(function(){
    Meteor.subscribe("students",Session.get("currentClassId"));
    Meteor.subscribe("attendance",Session.get("currentClassId"));
  });
  Meteor.subscribe('files.images.all');
});

Template.teacherStudentList.helpers({
  uploadedFiles: function () {
    return Images.find({userId:this.studId});
  },
  outputinfo:function(){
    Session.set("currentClassId",this.class_id);
    return Session.get("currentClassId");
  },
  studentInfos:function(){
    return students.find({classId:this.class_id,drop:false});
  },
  dropOuts:function(){
    return students.find({classId:this.class_id,drop:true});
  },
  studentProfile:function(){
    Meteor.subscribe("teacherStudentprofile",this.studId);
    return Meteor.users.find({_id:this.studId});
  },
  absences:function(){
    return attendance.find({classId:Session.get("currentClassId"),studId:this._id}).count()
  }
});

Template.teacherStudentList.events({
  "click #btnEditStudent":function(){
    Session.set("clickedStudentId",this._id);
    console.log(Session.get("clickedStudentId"));
  }
});

Template._EditStudent.events({
  "click .DropStudent": function(event){
    event.preventDefault();
    IonPopover.hide();
    IonPopup.prompt({
      title: 'Drop Class',
      template: "<div class='title_prompt'>Are you sure to drop this student?<br> type <strong>YES</strong></div>",
      okText: 'Confirm',
      inputType: 'text',
      inputPlaceholder: '',
        onOk: function(error, result){
          if(result == "YES"){
            Meteor.call("dropStudent",Session.get("clickedStudentId"), function(error){
              if(error){
                console.log(error.reason);
              }else{
                IonLoading.show({
                  customTemplate: '<h4>SUCCESS</h4><p>Succesfully dropped the class.</p>',
                  duration: 3000
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
  },
  "click .KickStudent": function(event){
    event.preventDefault();
    IonPopover.hide();
    IonPopup.prompt({
      title: 'Kick Student',
      template: "<div class='title_prompt'>Are you sure to kick this student?<br> type <strong>YES</strong></div>",
      okText: 'Confirm',
      inputType: 'text',
      inputPlaceholder: '',
        onOk: function(error, result){
          if(result == "YES"){
            Meteor.call("kickStudent",Session.get("clickedStudentId"), function(error){
              if(error){
                console.log(error.reason);
              }else{
                IonLoading.show({
                  customTemplate: '<h4>SUCCESS</h4><p>Succesfully dropped the class.</p>',
                  duration: 3000
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
  },
});

Template._EditStudentDrop.events({
  "click .KickStudent": function(event){
    event.preventDefault();
    IonPopover.hide();
    IonPopup.prompt({
      title: 'Kick Student',
      template: "<div class='title_prompt'>Are you sure to kick this student?<br> type <strong>YES</strong></div>",
      okText: 'Confirm',
      inputType: 'text',
      inputPlaceholder: '',
        onOk: function(error, result){
          if(result == "YES"){
            Meteor.call("kickStudent",Session.get("clickedStudentId"), function(error){
              if(error){
                console.log(error.reason);
              }else{
                IonLoading.show({
                  customTemplate: '<h4>SUCCESS</h4><p>Succesfully dropped the class.</p>',
                  duration: 3000
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
  },
  "click .TakeStudent": function(event){
    event.preventDefault();
    IonPopover.hide();
    console.log(Session.get("clickedStudentId"));
    IonPopup.prompt({
      title: 'Take Student Back',
      template: "<div class='title_prompt'>Are you sure to take this student back?<br> type <strong>YES</strong></div>",
      okText: 'Confirm',
      inputType: 'text',
      inputPlaceholder: '',
        onOk: function(error, result){
          if(result == "YES"){
            Meteor.call("takeStudent",Session.get("clickedStudentId"), function(error){
              if(error){
                console.log(error.reason);
              }else{
                Meteor.call("updateStudentSeat",Session.get("clickedStudentId"),Session.get("currentClassId"),function(error){
                  if(error){
                    console.log(error.reason);
                  }else{
                    IonLoading.show({
                      customTemplate: '<h4>SUCCESS</h4><p>Succesfully dropped the class.</p>',
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
  },
});
