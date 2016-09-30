Template.teacherDashboardSeatplan.onCreated(function(){
Meteor.subscribe("classindex");
Meteor.subscribe("students");
});

Template.teacherDashboardSeatplan.helpers({
  classinfo:function(){
    Session.set("currentClassId",this.class_id);
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
  }
});

Template.teacherDashboardSeatplan.events({
});

Template.vacantSeat.helpers({

});


Template.vacantSeat.events({
  "click .selectSeat":function(e){
    e.preventDefault();
    var out = this.col + ":" + this.row;
    Session.set("selectedSeat",out);
  }
});

Template.takenSeat.events({
  "click .selectSeat":function(e){
    e.preventDefault();
    var out = this.col + ":" + this.row;
    console.log(out);
  }
});
