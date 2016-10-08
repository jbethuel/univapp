Template.studentDashboardViewClass.onCreated(function(){
  id = Router.current().params.class_id;
  this.subscribe("studentClassInfo", id)
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
    Router.go('studentDashboardClassMessasge',{
      class_id: id
    });
  }
});
