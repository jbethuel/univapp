Template.teacherDashboardViewClass.onCreated(function(){
  this.subscribe("classindex");
});

Template.teacherDashboardViewClass.onDestroyed(function(){
  delete Session.keys["classId"];
});

Template.teacherDashboardViewClass.helpers({
  classinfo: function(){
    id = Session.get("classId");
    return classindex.find({_id: id}).fetch();
  }
});
