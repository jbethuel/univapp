Template.vacantSeat.helpers({

});


Template.vacantSeat.events({
  "click .selectSeat":function(e){
    e.preventDefault();
    var out = this.col + ":" + this.row;
    Session.set("selectedSeat",out);
  }
});

Template.takenSeat.helpers({
  uploadedFiles: function () {
    return Images.find({userId:this.studId});
  },
  name:function(){
    var info =  students.find({seatnum:this.seatnum}).fetch();
    var name = Meteor.users.find({_id:info[0].studId}).fetch();
    return name[0].profile.lastname +", "+name[0].profile.firstname;
  },
  isSwapChecked:function(){
    if(Session.get("swap")== true){
      return true;
    }else{
      return false;
    }
  }
})

Template.takenSeat.events({
  "click .selectSeat":function(e){
    e.preventDefault();
    if(Session.get("swapSeatplan") == true){
      if(Session.get("swap") == false){
        var swapinfo = Session.get("studentswap");
        Session.set("swap",true);
        swapinfo.push({seatnum:this.seatnum});
        Session.set("studentswap",swapinfo);
      }else{
        var swapinfo = Session.get("studentswap");
        swapinfo.push({seatnum:this.seatnum});
        var swap1 = students.find({seatnum:swapinfo[0].seatnum},{studId:1}).fetch(),
            swap2 = students.find({seatnum:swapinfo[1].seatnum},{studId:1}).fetch();

        Meteor.call("SwapExe",Session.get("currentClassId"),swapinfo,swap1[0].studId,swap2[0].studId);
        Session.set("swap",false);
        Session.set("studentswap",[]);
      }
    }else{

    }
  },

});

Template.presentSeat.helpers({
  uploadedFiles: function () {
    return Images.find({userId:this.studId});
  },
  name:function(){
    var name = Meteor.users.find({_id:this.studId}).fetch();
    return name[0].profile.lastname +", "+name[0].profile.firstname;
  },
});

Template.lateSeat.helpers({
  uploadedFiles: function () {
    return Images.find({userId:this.studId});
  },
  name:function(){
    var name = Meteor.users.find({_id:this.studId}).fetch();
    return name[0].profile.lastname +", "+name[0].profile.firstname;
  },
});

Template.absentSeat.helpers({
  uploadedFiles: function () {
    return Images.find({userId:this.studId});
  },
  name:function(){
    var name = Meteor.users.find({_id:this.studId}).fetch();
    return name[0].profile.lastname +", "+name[0].profile.firstname;
  },
});

Template.attendancetakenSeat.helpers({
  uploadedFiles: function () {
    return Images.find({userId:this.studId});
  },
  name:function(){
    var name = Meteor.users.find({_id:this.studId}).fetch();
    return name[0].profile.lastname +", "+name[0].profile.firstname;
  },
});

Template.attendancetakenSeat.events({
  "click .checkSeatAttendance":function(e){
    if(Session.get("checking") == true){
      var studId = this.studId;
      var classId = Session.get("currentClassId"),
          date = $("#date_selected").val();

      if(attendance.find({classId:classId,studId:this.studId,dateCreated:date}).count() == 0){
          Meteor.call("attendanceCheck",classId,this.studId,"present",date);
      }else{
        var attendanceinfo = attendance.find({classId:classId,studId:this.studId,dateCreated:date},{remark:1}).fetch();
        if(attendanceinfo[0].remark == "present"){
          Meteor.call("attendanceUpdate",classId,this.studId,"late",date);
        }else if(attendanceinfo[0].remark == "late"){
          Meteor.call("attendanceUpdate",classId,this.studId,"absent",date);
        }else{
          Meteor.call("attendanceUpdate",classId,this.studId,"present",date);
        }
      }
    }
  }
});

Template.presentSeat.events({
  "click .checkSeatAttendance":function(e){
  if(Session.get("checking") == true){
    var studId = this.studId;
    var classId = Session.get("currentClassId"),
        date = $("#date_selected").val();

        Meteor.call("attendanceUpdate",classId,this.studId,"late",date);
  }
  }
});

Template.lateSeat.events({
  "click .checkSeatAttendance":function(e){
  if(Session.get("checking") == true){
    var studId = this.studId;
    var classId = Session.get("currentClassId"),
        date = $("#date_selected").val();

        Meteor.call("attendanceUpdate",classId,this.studId,"absent",date);
  }
}
});

Template.absentSeat.events({
  "click .checkSeatAttendance":function(e){
  if(Session.get("checking") == true){
    var studId = this.studId;
    var classId = Session.get("currentClassId"),
        date = $("#date_selected").val();

        Meteor.call("attendanceUpdate",classId,this.studId,"present",date);
  }
}
});



Template.swapvacantSeat.events({
  "click .takeSwap":function(e){
    e.preventDefault();
    var swapinfo = Session.get("studentswap");
    swapinfo.push({seatnum:this.col + ":" + this.row});
    console.log(swapinfo);
      var swap1 = students.find({seatnum:swapinfo[0].seatnum},{studId:1}).fetch(),
          swap2 = students.find({seatnum:swapinfo[1].seatnum},{studId:1}).fetch();
          //console.log(swap1[0].studId);
          //console.log(swap2[0].studId);

          if(swap1.length == 0){
            swap1 = "";
            Meteor.call("SwapExe",Session.get("currentClassId"),swapinfo,swap1,swap2[0].studId);
          }else if(swap2.length == 0){
            swap2 = "";
            Meteor.call("SwapExe",Session.get("currentClassId"),swapinfo,swap1[0].studId,swap2);
          }else{
            Meteor.call("SwapExe",Session.get("currentClassId"),swapinfo,swap1[0].studId,swap2[0].studId);
          }

    Session.set("swap",false);
    Session.set("studentswap",[]);
  }
});

Template.swapreadySeat.helpers({
  uploadedFiles: function () {
    return Images.find({userId:this.studId});
  },
  name:function(){
    var info =  students.find({seatnum:this.seatnum}).fetch();
    var name = Meteor.users.find({_id:info[0].studId}).fetch();
    return name[0].profile.lastname +", "+name[0].profile.firstname;
  },
})

Template.swapreadySeat.events({
  "click .selectswapSeat":function(e){
    e.preventDefault();
    Session.set("swap",false);
    Session.set("studentswap",[]);
  }
})
