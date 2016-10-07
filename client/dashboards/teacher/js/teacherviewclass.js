Template.teacherDashboardViewClass.onCreated(function(){
  this.subscribe("classindex");
});

Template.teacherDashboardViewClass.onDestroyed(function(){
  delete Session.keys["classId"];
});

Template.teacherDashboardViewClass.helpers({
  classid: function(){
    return this.class_id;
  },
  classinfo: function(classid){
    return classindex.find({_id:classid}).fetch();
  }
});
