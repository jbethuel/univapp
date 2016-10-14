Template.studentDashboardClassClassroom.onCreated(function(){
  Tracker.autorun(function(){
    Meteor.subscribe("students",Session.get("currentClassId"));
    Meteor.subscribe("attendance",Session.get("currentClassId"));
  });
this.subscribe("classindex");
this.subscribe("appusers");
});

Template.studentDashboardClassClassroom.helpers({
  currentRoute: function(){
    return Router.current().params.class_id;
  },
  classinfo:function(){
    Session.set("currentClassId",this.class_id);
    return classindex.find({_id:this.class_id}).fetch();
  },
  unassigned:function(){
    return students.find({classId:this._id,seatnum:"0:0"}).count() > 0;
  },
  UnAssignednum:function(){
    return students.find({classId:this._id,seatnum:"0:0"}).count();
  },
  studinfo:function(col,row){
    console.log(col+":"+row);
    return students.find({seatnum:col+":"+row}).fetch();
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
  isUnmark:function(){
    if(attendance.find({classId:Session.get("currentClassId"),studId:this.studId,dateCreated:moment(Session.get("datetoday")).format("YYYY-MM-DD")}).count() == 0){
        console.log(Session.get("datetoday"));
        console.log(attendance.find({classId:Session.get("currentClassId"),studId:this.studId,dateCreated:"2016-10-2"}).count());
        return true;
    }
  },
  isPresent:function(){
    if(attendance.find({classId:Session.get("currentClassId"),studId:this.studId,remark:"present",dateCreated:moment(Session.get("datetoday")).format("YYYY-MM-DD")}).count() == 1){
        return true;
    }
  },
  isLate:function(){
    if(attendance.find({classId:Session.get("currentClassId"),studId:this.studId,remark:"late",dateCreated:moment(Session.get("datetoday")).format("YYYY-MM-DD")}).count() == 1){
        return true;
    }
  },
  isAbsent:function(){
    if(attendance.find({classId:Session.get("currentClassId"),studId:this.studId,remark:"absent",dateCreated:moment(Session.get("datetoday")).format("YYYY-MM-DD")}).count() == 1){
        return true;
    }
  }
});
