Template.studentDashboardSchedules.onCreated(function(){
  this.subscribe("classindex");
  this.subscribe("students");
  this.subscribe("appusers");
});

Template.studentDashboardSchedules.events({
  "click .item": function(event){
    event.preventDefault();
    Session.set("classId", this._id);
    Router.go('tabs.one');
  }
});

Template.studentDashboardSchedules.helpers({
  myclasses:function(){
    return students.find({studId:Meteor.userId()}).fetch().reverse();
    },
    inClass:function(classId){
      return classindex.find({_id:classId}).fetch();
    },
    TeacherName:function(teachId){
       return Meteor.users.find({_id:teachId},{username:1}).fetch();
    }
});
