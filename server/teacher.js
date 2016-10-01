Meteor.methods({
  AddClass:function(description, sec_code, subj_code, sched, time_start, time_end, sem, school_yr){
    var passkey = Random.id(8);

     classindex.insert({
       teachId:this.userId,
       description: description,
       sec_code: sec_code,
       subj_code: subj_code,
       sched: sched,
       time_start: time_start,
       time_end: time_end,
       sem: sem,
       school_yr: school_yr,
       students: 0,
       rows: 0,
       cols: 0,
       passkey: passkey
     });
  },
    deleteClass:function(indexId){
    classindex.remove({_id:indexId});
  },
    addstudent:function(studDetails){
      students.insert(studDetails);
  },
  EditClass:function(ClassId,Row,Col){
    classindex.update({_id:ClassId},{$set:{rows:Row,cols:Col}});
  },
  SwapExe:function(classId,swapinfo,swap1,swap2){
    console.log(swap1);
    console.log(swap2);
    console.log(swapinfo);
    if(swap1 == ""){
      students.update({classId:classId,studId:swap2},{$set:{seatnum:swapinfo[0].seatnum}});
    }
    if(swap2 == ""){
      students.update({classId:classId,studId:swap1},{$set:{seatnum:swapinfo[1].seatnum}});
    }else {
      students.update({classId:classId,studId:swap1},{$set:{seatnum:swapinfo[1].seatnum}});
      students.update({classId:classId,studId:swap2},{$set:{seatnum:swapinfo[0].seatnum}});
    }

  },
});
