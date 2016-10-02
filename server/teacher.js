
Meteor.methods({
  getserverdate:function(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
      dd='0'+dd;
    }

    if(mm<10) {
      mm='0'+mm;
    }
    today = yyyy+'-'+mm+'-'+dd;
    console.log(today);
    return today;
  },
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
  attendanceCheck:function(classId,studId,remark,date){
    attendance.insert({classId:classId,studId:studId,remark:remark,dateCreated:date});
  },
  attendanceUpdate:function(classId,studId,remark,date){
    attendance.update({classId:classId,studId:studId,dateCreated:date},{$set:{remark:remark}});
  }
});
