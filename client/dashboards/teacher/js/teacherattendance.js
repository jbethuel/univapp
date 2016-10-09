Meteor.startup(function(){
  setInterval(function(){
    Meteor.call("getserverdate",function(error,result){
      Session.set("datetoday",result);
    })
  }, 1000);
});

Template.teacherDashboardAttendance.onCreated(function(){
Tracker.autorun(function(){
  Meteor.subscribe("students",Session.get("currentClassId"));
  Meteor.subscribe("attendance",Session.get("currentClassId"));
});
Meteor.subscribe("classindex");
Meteor.subscribe("appusers");
Session.set("checking",false);

});

Template.teacherDashboardAttendance.onRendered(function(){

});

Template.teacherDashboardAttendance.onDestroyed(function(){
  Session.set("checking",false);
});

Template.teacherDashboardAttendance.helpers({
  dateToday:function(){
    Session.set("currentDateSelected",Session.get("datetoday"));
    return Session.get("datetoday");
  },
  isCheckedOn:function(){
    if(Session.get("checking") == true){
      return true;
    }else{
      return false;
    }
  },
  classinfo:function(){
    console.log(Session.get());
    Session.set("currentClassId",this.class_id);
        console.log(this.class_id);
    return classindex.find({_id:this.class_id}).fetch();
  },
  loopcol:function(){
    var countvar = [];
    for(var x=1; x <= this.cols ;x++){
      countvar.push({column:x});
    }
    return countvar;
  },
  looprow:function(col,rows){
    var countvar = [];
    for(var x=1; x <= rows ;x++){
      countvar.push({col:col,row:x});
    }
    return countvar;
  },
  isTaken:function(col,row){
    var seatnum = col + ":" + row;
    var seatn = students.find({seatnum:seatnum}).count();
    console.log(seatn);
    if(seatn == 1){
      return true;
    }else{
      return false;
    }
  },
  studinfo:function(col,row){
    console.log(col+":"+row);
    return students.find({seatnum:col+":"+row}).fetch();
  },
  isUnmark:function(){
    console.log(Session.get("currentDateSelected"));
    if(attendance.find({classId:Session.get("currentClassId"),studId:this.studId,dateCreated:Session.get("currentDateSelected")}).count() == 0){
        return true;
    }
  },
  isPresent:function(){
    if(attendance.find({classId:Session.get("currentClassId"),studId:this.studId,remark:"present",dateCreated:Session.get("currentDateSelected")}).count() == 1){
        return true;
    }
  },
  isLate:function(){
    if(attendance.find({classId:Session.get("currentClassId"),studId:this.studId,remark:"late",dateCreated:Session.get("currentDateSelected")}).count() == 1){
        return true;
    }
  },
  isAbsent:function(){
    if(attendance.find({classId:Session.get("currentClassId"),studId:this.studId,remark:"absent",dateCreated:Session.get("currentDateSelected")}).count() == 1){
        return true;
    }
  }
});

Template.teacherDashboardAttendance.events({
  "click #checkAttendancePresent":function(e){
    e.preventDefault();
    var classId = Session.get("currentClassId");
    var student = students.find({classId:classId}).fetch(),
        date = Session.get("currentDateSelected");
      console.log(student);
    if(student.length > 0){
      for(var x=0;x<student.length;x++){
        if(attendance.find({classId:classId,studId:student[x].studId,dateCreated:date}).count() == 0){
            Meteor.call("attendanceCheck",classId,student[x].studId,"present",date);
        }
      }
    }

  },
  "click #checkAttendanceAbsent":function(e){
    e.preventDefault();
    var classId = Session.get("currentClassId");
    var student = students.find({classId:classId}).fetch(),
        date = Session.get("currentDateSelected");
      console.log(student);
    if(student.length > 0){
      for(var x=0;x<student.length;x++){
        if(attendance.find({classId:classId,studId:student[x].studId,dateCreated:date}).count() == 0){
            Meteor.call("attendanceCheck",classId,student[x].studId,"absent",date);
        }
      }
    }

  },
  "click #checkAttendanceReset":function(e){
    e.preventDefault();
    var classId = Session.get("currentClassId"),
        date = Session.get("currentDateSelected");
      Meteor.call("attendanceReset",classId,date);
  },
  "click #checkAttendance": function(event){
    if($('#checkAttendance').prop("checked") == true){
        if(attendance.find({classId:Session.get("currentClassId"),dateCreated:$("#date_selected").val()}).count() == 0){
          console.log("wala");
        }else{
          console.log("naa");
        }
      Session.set("checking", true);
    }else{
      Session.set("checking", false);
    }
  },
  "input #date_selected":function(){
    Session.set("currentDateSelected",$("#date_selected").val());
    console.log($("#date_selected").val());
  }
});
