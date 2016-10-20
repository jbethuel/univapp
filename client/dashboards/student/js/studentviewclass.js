Template.studentDashboardViewClass.onCreated(function(){
  id = Router.current().params.class_id;
  this.subscribe("studentClassInfo", id)
});

Template.studentDashboardViewClass.onDestroyed(function(){
  delete Session.keys["teachId"];
});

Template.studentDashboardViewClass.helpers({
  classinfo: function(){
    return classindex.find({}).fetch();
  },
  teachername: function(teachId){
    id = teachId;
    Meteor.subscribe("teacherName", id)
    return Meteor.users.find({_id:id}).fetch();
  }
});

Template.studentDashboardViewClass.events({
  "click #classStanding": function(event){
    event.preventDefault();
    id = Router.current().params.class_id;
    Router.go('studentDashboardClassStanding',{
      class_id: id
    });
  },
  "click #classActivity": function(event){
    event.preventDefault();
    id = Router.current().params.class_id;
    Router.go('studentDashboardClassActivity',{
      class_id: id
    });
  },
  "click #classRoom": function(event){
    event.preventDefault();
    id = Router.current().params.class_id;
    Router.go('studentDashboardClassClassroom',{
      class_id: id
    });
  },
  "click #classMessage": function(event){
    event.preventDefault();
    id = Router.current().params.class_id;
    Router.go('studentDashboardClassMessage',{
      class_id: id
    });
  },
  "click #classTeacherMessage": function(event){
    event.preventDefault();
    Session.set("teachId", $('.teachId').text());
  },
  "click #notInClass": function(event){
    event.preventDefault();
    IonPopup.prompt({
      title: 'Drop Class',
      template: "<div class='title_prompt'>Are you sure to leave this class?<br> type <strong>YES</strong></div>",
      okText: 'Confirm',
      inputType: 'text',
      inputPlaceholder: '',
        onOk: function(error, result){
          if(result == "YES"){
            id = Router.current().params.class_id;
            Meteor.call("studentNotClass", id, function(error){
              if(error){
                console.log(error.reason);
              }else{
                IonLoading.show({
                  customTemplate: '<h4>SUCCESS</h4><p>Succesfully dropped the class.</p>',
                  duration: 3000
                });
                Router.go("studentDashboardSchedules");
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
  "click #classDrop": function(event){
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
            Meteor.call("studentDropClass", id, function(error){
              if(error){
                console.log(error.reason);
              }else{
                IonLoading.show({
                  customTemplate: '<h4>SUCCESS</h4><p>Succesfully dropped the class.</p>',
                  duration: 3000
                });
                Router.go("studentDashboardSchedules");
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
});
