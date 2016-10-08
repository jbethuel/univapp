Template.studentDashboardSchedules.onCreated(function(){
  id = Meteor.userId();
  this.subscribe("studentClass", id);
});

Template.studentDashboardSchedules.events({
  "click .item": function(event){
    event.preventDefault();
    id = this._id;
    Router.go('studentDashboardViewClass',{
      class_id: id
    });
  }
});

Template.studentDashboardSchedules.helpers({
  myclasses:function(){
    return students.find({studId:Meteor.userId()}).fetch().reverse();
    },
  inClass:function(classId){
    id = classId;
    Meteor.subscribe("studentClassInfo", id);
    return classindex.find({_id:classId}).fetch();
  }
});
