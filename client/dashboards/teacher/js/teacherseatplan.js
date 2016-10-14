Template.teacherDashboardSeatplan.onCreated(function(){
  Tracker.autorun(function(){
    Meteor.subscribe("students",Session.get("currentClassId"));
    Meteor.subscribe("attendance",Session.get("currentClassId"));
  });
Meteor.subscribe("classindex");
Meteor.subscribe("appusers");
Session.setDefault("editSeatplan",false);
Session.setDefault("swapSeatplan",false);
//set the Session swap1 default to false meaning the swap function is not yet activated
Session.setDefault("swap",false);
//set the Session studentswap default to array blank, it is ready to get some swapping activity
Session.setDefault("studentswap",[]);
});

Template.teacherDashboardSeatplan.onDestroyed(function(){
Session.set("editSeatplan", false);
Session.set("swapSeatplan", false);
Session.set("swap",false);
Session.setDefault("studentswap",[]);
});

Template.teacherDashboardSeatplan.helpers({
  isEditChecked:function(){
    if(Session.get("editSeatplan") == true){
      return true;
    }else{
      Session.set("swapSeatplan", false);
      Session.set("swap",false);
      Session.setDefault("studentswap",[]);
      return false;
    }
  },
  isSwapChecked:function(){
    if(Session.get("swapSeatplan") == true){
      Session.set("swapSeatplan", true);
      return true;
    }else{
      Session.set("swapSeatplan", false);
      return false;
    }
  },
  isSwapReady:function(){
    if(Session.get("swap")== true){
      return true;
    }else{
      return false;
    }
  },
  isSwapSeatnum:function(seatnum){
    var seatnum = seatnum,
        swapseatnum = Session.get("studentswap");
    if(swapseatnum.length > 0){
      if(seatnum == swapseatnum[0].seatnum){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }

  },
  classinfo:function(){
    Session.set("currentClassId",this.class_id);
    return classindex.find({_id:this.class_id}).fetch();
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

Template.teacherDashboardSeatplan.events({
  "click #btnSeatplanDimension": function(events){
    events.preventDefault();
    var Row = $("#editrows").val(),
    Col = $("#editcolumns").val();
    //console.log(this.class_id);
    Meteor.call("EditClass",this._id,Row,Col);
  },
  "click .editSeatplan": function(event){
    if($('.editSeatplan').prop("checked") == true){
      Session.set("editSeatplan", true);
    }else{
      Session.set("editSeatplan", false);
    }
  },
  "click .swapSeatplan": function(event){
    if($('.swapSeatplan').prop("checked") == true){
      Session.set("swapSeatplan", true);
    }else{
      Session.set("swapSeatplan", false);
    }
  }
});
