
Meteor.methods({
  getserverdate:function(){
    var today = new Date();
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
  AssignStudent:function(studDetails,classId){
    var classinfo = classindex.find({_id:classId}).fetch();
    if(classinfo[0].rows == 0 && classinfo[0].cols == 0){
        students.insert(studDetails);
    }else{
    for(var r = 1;r <= classinfo[0].cols;r++){
      for(var c = 1;c <= classinfo[0].rows;c++){
        if(students.find({seatnum:r+":"+c}).count()==0){
          studDetails.seatnum = r+":"+c;
          students.insert(studDetails);
          break;
        }
      }
    }
    }
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
  },
  attendanceReset:function(classId,date){
    attendance.remove({classId:classId,dateCreated:date});
  },
  gradepercent: function(classe, midtermCS, midtermPRJ, midtermEXAM, finaltermCS, finaltermPRJ, finaltermEXAM) {
  var a = percentage.find({
    classId: classe,
    alreadyexist: true
  }).count();
  if (a === 1) {
    console.log("updated");
    percentage.update({
      classId: classe
    }, {
      $set:{
        midtermCS:midtermCS,
        midtermPRJ:midtermPRJ,
        midtermEXAM:midtermEXAM,
        finaltermCS:finaltermCS,
        finaltermPRJ:finaltermPRJ,
        finaltermEXAM:finaltermEXAM
      }
    });
  } else {
    console.log("grade percentage has been set");
    percentage.insert({
      classId: classe,
      teacherId: this.userId,
       midtermCS:midtermCS,
       midtermPRJ:midtermPRJ,
       midtermEXAM:midtermEXAM,
       finaltermCS:finaltermCS,
       finaltermPRJ:finaltermPRJ,
       finaltermEXAM:finaltermEXAM,
      alreadyexist: true

    });

  }

},
addRecord:function(classId,term,type,items){
  var info = graderecordindex.insert({classId:classId,teachId:this.userId,term:term,type:type,total_items:Number(items)});
  console.log(info);
  return info;
},
editRecord:function(recordId,total){
  graderecordindex.update({_id:recordId},{$set:{total_items:Number(total)}})
},
deleteRecord:function(id){
  graderecordindex.remove({_id:id});
},
addActivity:function(activity){
  roomactivity.insert(activity);
},
editActivity:function(activity,Id){
  roomactivity.update({_id:Id},{$set:activity});
},
deleteActivity:function(id){
  roomactivity.remove({_id:id});
},
addStudentGrade:function(studId,recordId,grade){
  graderecord.insert({recordId:recordId,studId:studId,grade:grade,dateCreated:new Date()});
},
changeStudentGrade:function(gradeId,newgrade){
  graderecord.update({_id:gradeId},{$set:{grade:newgrade,dateCreated:new Date()}});
}
});
