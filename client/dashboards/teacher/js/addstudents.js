Template.teacheraddstudent.onCreated(function(){
  Tracker.autorun(function(){
    Meteor.subscribe("students",Session.get("classId"));
  });
  Meteor.subscribe("appusers");
  Meteor.subscribe('files.images.all');
});

Template.teacheraddstudent.onDestroyed(function(){
  Session.set("searchstud",null);
});

Template.teacheraddstudent.helpers({
  //Output Students Info
  studentInfos:function(){
    var keyword  = Session.get("searchstud");
    if(keyword == ""){
      return [];
    }else{
      return Meteor.users.find({$or: [{"username": {'$regex' : '.*' + keyword + '.*',$options: 'i'}},{"profile.fullname": {'$regex' : '.*' + keyword + '.*',$options: 'i'}}],roles:["student"]}).fetch();
    }
  },
  outputinfo:function(){
    return Session.get("selectedSeat") + Session.get("currentClassId");
  },
  IsNotInClass:function(id){
    var notInClass = students.find({classId:Session.get("currentClassId"),studId:id}).count();
      console.log(notInClass);
      console.log(Session.get("currentClassId"));
      if(notInClass == 0){
        return true;
      }else{
        return false;
      }
  }

});

Template.teacheraddstudent.events({
  //Get the Input dynamically
  "keyup #txtSearchStud": function(event){
    event.preventDefault();
    Session.set("searchstud",$("#txtSearchStud").val());
  },

  //Add student to class
  "click #btnAddStud":function(event){
    event.preventDefault();
    //the data to be save to students collection
    var studId = this._id,
        classId = Session.get("currentClassId"),
        seatnum = Session.get("selectedSeat");
    //the object of the students data
    var studDetails = {
      studId: studId,
      classId: classId,
      seatnum: seatnum,
      drop:false
    };

        console.log(studDetails, studId, classId);
        Meteor.call('addstudent',studDetails);
        Router.go('teacherDashboardSeatplan',{class_id:classId});
    },

});
