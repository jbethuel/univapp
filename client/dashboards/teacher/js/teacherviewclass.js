Template.teacherDashboardViewClass.onCreated(function(){
  this.subscribe("classindex");
  new Clipboard(".clipboard");
});

Template.teacherDashboardViewClass.helpers({
  classid: function(){
    return this.class_id;
  },
  classinfo: function(classid){
    return classindex.find({_id:classid}).fetch();
  },
  studentCount: function(_id){
    Meteor.subscribe("studentCount", _id);
    return students.find({classId:_id}).count();
  }
});

Template.teacherDashboardViewClass.events({
  "click #teacherAnnouncement": function(event){
    event.preventDefault();
    id = Router.current().params.class_id;
    Router.go("teacherDashboardAnnouncement",{
      class_id: id
    });
  },
  "click #teacherActivity": function(event){
    event.preventDefault();
    id = Router.current().params.class_id;
    Router.go("teacherDashboardActivity",{
      class_id: id
    });
  },
  "click #teacherSeatplan": function(event){
    event.preventDefault();
    id = Router.current().params.class_id;
    Router.go("teacherDashboardSeatplan",{
      class_id: id
    });
  },
  "click #teacherStudentList": function(event){
    event.preventDefault();
    id = Router.current().params.class_id;
    Router.go("teacherStudentList",{
      class_id: id
    });
  },
  "click #teacherAttendance": function(event){
    event.preventDefault();
    id = Router.current().params.class_id;
    Router.go("teacherDashboardAttendance",{
      class_id: id
    });
  },
  "click #teacherGraderecords": function(event){
    event.preventDefault();
    id = Router.current().params.class_id;
    Router.go("teacherDashboardRecords",{
      class_id: id
    });
  },
  "click #teacherMessage": function(event){
    event.preventDefault();
    id = Router.current().params.class_id;
    Router.go("teacherDashboardMessageboard",{
      class_id: id
    });
  },
  "click #teacherSettings": function(event){
    event.preventDefault();
    id = Router.current().params.class_id;
    Router.go("teacherDashboardGradeSettings",{
      class_id: id
    });
  },
  "click .clipboard": function(event){
    event.preventDefault();
    if(Meteor.isCordova){
      cordova.plugins.clipboard.copy(this.passkey);
    }
    title = "COPIED";
    button = "button button-balanced";
    template = "<div class='title_prompt'>Token copied to clipboard: "+this.passkey+"</div>";
    Meteor.Messages.dialog(title, template, button);
  },
  "click .delete-class": function(event){
    event.preventDefault();
    IonPopup.prompt({
      title: 'Drop Class',
      template: "<div class='title_prompt'>Are you sure to drop this class?<br> type <strong>YES</strong></div>",
      okText: 'Confirm',
      inputType: 'text',
      inputPlaceholder: '',
        onOk: function(error, result){
          if(result == "YES"){
            id = Router.current().params.class_id;
            Meteor.call("teacherDropClass", id, function(error){
              if(error){
                console.log(error.reason);
              }else{
                IonLoading.show({
                  customTemplate: '<h4>SUCCESS</h4><p>Succesfully dropped the class.</p>',
                  duration: 3000
                });
                Router.go("teacherDashboardClass");
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
  }
})
