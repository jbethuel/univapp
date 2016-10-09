Template.teacherDashboardViewClass.onCreated(function(){
  this.subscribe("classindex");
});

Template.teacherDashboardViewClass.helpers({
  classid: function(){
    return this.class_id;
  },
  classinfo: function(classid){
    return classindex.find({_id:classid}).fetch();
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
  }
})
