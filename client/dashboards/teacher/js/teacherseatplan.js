Template.teacherDashboardSeatplan.onCreated(function(){
Meteor.subscribe("classindex");
Meteor.subscribe("students");
Meteor.subscribe("appusers");
Session.setDefault("editSeatplan",false);
Session.setDefault("swapSeatplan",false);
//set the Session swap1 default to false meaning the swap function is not yet activated
Session.setDefault("swap",false);
//set the Session studentswap default to array blank, it is ready to get some swapping activity
Session.setDefault("studentswap",[]);
});

Template.teacherDashboardSeatplan.onDestroyed(function(){
Session.set("editSeatplan", null);
Session.set("swapSeatplan", null);
Session.set("swap",null);
Session.setDefault("studentswap",null);
});

Template.teacherDashboardSeatplan.helpers({
  isEditChecked:function(){
    if(Session.get("editSeatplan") == true){
      return true;
    }else{
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
  isSwapSeatnum:function(col,row){
    var seatnum = col + ":" + row,
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
  name:function(){
    var info =  students.find({seatnum:this.col+":"+this.row}).fetch();
    var name = Meteor.users.find({_id:info[0].studId}).fetch();
    return name[0].profile.fullname;
  },
})

Template.takenSeat.events({
  "click .selectSeat":function(e){
    e.preventDefault();
    if(Session.get("swapSeatplan") == true){
      if(Session.get("swap") == false){
        var swapinfo = Session.get("studentswap");
        Session.set("swap",true);
        swapinfo.push({seatnum:this.col + ":" + this.row});
        Session.set("studentswap",swapinfo);
        var out = this.col + ":" + this.row;
        console.log(out);
      }else{
        var swapinfo = Session.get("studentswap");
        swapinfo.push({seatnum:this.col + ":" + this.row});
        var swap1 = students.find({seatnum:swapinfo[0].seatnum},{studId:1}).fetch(),
            swap2 = students.find({seatnum:swapinfo[1].seatnum},{studId:1}).fetch();

        Meteor.call("SwapExe",Session.get("currentClassId"),swapinfo,swap1[0].studId,swap2[0].studId);
        Session.set("swap",false);
        Session.set("studentswap",[]);
      }
    }else{

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
  name:function(){
    var info =  students.find({seatnum:this.col+":"+this.row}).fetch();
    var name = Meteor.users.find({_id:info[0].studId}).fetch();
    return name[0].profile.fullname;
  },
})

Template.swapreadySeat.events({
  "click .selectswapSeat":function(e){
    e.preventDefault();
    Session.set("swap",false);
    Session.set("studentswap",[]);
  }
})
