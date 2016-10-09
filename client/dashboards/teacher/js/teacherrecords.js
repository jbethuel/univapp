Template.teacherDashboardRecords.onCreated(function(){
  Tracker.autorun(function(){
    Meteor.subscribe("students",Session.get("classId"));
    Meteor.subscribe("graderecordindex",Session.get("classId"));
    Meteor.subscribe("percentage",Session.get("classId"));
  });
  Meteor.subscribe("graderecord");
  Meteor.subscribe("appusers");
  Session.setDefault("term","midterm");
  Session.setDefault("itemtype","class standing");
});

Template.teacherDashboardRecords.helpers({
  ispercentset:function(classId){
    console.log(percentage.find({classId:classId,teacherId:Meteor.userId()}).fetch());
    return percentage.find({classId:classId,teacherId:Meteor.userId()}).count() === 0;
  },
  gradesettings:function(){
      return percentage.find({classId:Session.get("classId")}).fetch();
  },
  convertTohundred:function(grade){
    return grade * 100;
  },
  isMidTerm:function(){
    return Session.get("term") === "midterm";
  },
  isFinalTerm:function(){
    return Session.get("term") === "finalterm";
  },
  isCompleteTerm:function(){
    return Session.get("term") === "complete term";
  },
  isClassStanding:function(){
    return Session.get("itemtype") === "class standing";
  },
  isProject:function(){
    return Session.get("itemtype") === "project";
  },
  isExam:function(){
    return Session.get("itemtype") === "exam";
  },
  isSummary:function(){
    return Session.get("itemtype") === "summary";
  },
  graderecord:function(){
    Session.set("classId",this.class_id);
    var records =  graderecordindex.find({classId:Session.get("classId"),term:Session.get("term"),type:Session.get("itemtype")}).fetch();
    return records;
  },
  recordTotalItems:function(){
    var recordId = graderecordindex.find({classId:Session.get("classId"),term:Session.get("term"),type:Session.get("itemtype")},{fields:{_id:1}}).fetch();
        total_items = 0;
        console.log(recordId);
    if(recordId.length != 0){
      for(var x = 0; x < recordId.length;x++){
        var items = graderecordindex.find({_id:recordId[x]._id}).fetch();
        total_items += items[0].total_items;
      }

      return [{total_items:total_items,totaleq:Meteor.Custom.Equivalents((total_items/total_items)*100)}];
    }else{
      return [{total_items:0,totaleq:0}];
    }
  },
  studTotalGrade:function(){
    return Meteor.Custom.studTotalGrade(this.studId,Session.get("classId"),Session.get("term"),Session.get("itemtype"));
  },
  summaryRecord:function(studId){
    var term = Session.get("term"),
        percentGrade = percentage.find({classId:Session.get("classId")}).fetch(),
        totalcs = Meteor.Custom.studTotalGrade(studId,Session.get("classId"),term,"class standing"),
        totalprj = Meteor.Custom.studTotalGrade(studId,Session.get("classId"),term,"project"),
        totalexam = Meteor.Custom.studTotalGrade(studId,Session.get("classId"),term,"exam"),
        overalltotals = 0;
        if(totalcs[0].totaleq == "No Data"){
          totalcs[0].totaleq = 0;
        }
        if(totalprj[0].totaleq == "No Data"){
          totalprj[0].totaleq = 0;
        }
        if(totalexam[0].totaleq == "No Data"){
          totalexam[0].totaleq = 0;
        }
        if(percentGrade.length !=0){
          if(term == "midterm"){
            overalltotals = (totalcs[0].totaleq*percentGrade[0].midtermCS) + (totalprj[0].totaleq*percentGrade[0].midtermPRJ) + totalexam[0].totaleq*percentGrade[0].midtermEXAM;
            return [{totalCS:totalcs[0].totaleq,totalPRJ:totalprj[0].totaleq,totalEXAM:totalexam[0].totaleq,overallTotal:Meteor.Custom.RoundOff(overalltotals)}];
          }else{
            overalltotals = (totalcs[0].totaleq*percentGrade[0].finaltermCS) + (totalprj[0].totaleq*percentGrade[0].finaltermPRJ) + totalexam[0].totaleq*percentGrade[0].finaltermEXAM;
            return [{totalCS:totalcs[0].totaleq,totalPRJ:totalprj[0].totaleq,totalEXAM:totalexam[0].totaleq,overallTotal:Meteor.Custom.RoundOff(overalltotals)}];
          }
        }else{
          return [{totalCS:0,totalPRJ:0,totalEXAM:0,overallTotal:0}];
        }
  },
  completeRecord:function(studId){
    var term = ["midterm","finalterm"],
        midtermtotals = 0,
        finaltermtotals = 0,
        overalltotals = 0,
        percentGrade = percentage.find({classId:Session.get("classId")}).fetch();
      if(percentGrade.length != 0){
        for(var t=0;t<term.length;t++){
          var totalcs = Meteor.Custom.studTotalGrade(studId,Session.get("classId"),term[t],"class standing"),
              totalprj = Meteor.Custom.studTotalGrade(studId,Session.get("classId"),term[t],"project"),
              totalexam = Meteor.Custom.studTotalGrade(studId,Session.get("classId"),term[t],"exam");
              if(totalcs[0].totaleq == "No Data"){
                totalcs[0].totaleq = 0;
              }
              if(totalprj[0].totaleq == "No Data"){
                totalprj[0].totaleq = 0;
              }
              if(totalexam[0].totaleq == "No Data"){
                totalexam[0].totaleq = 0;
              }
              console.log(totalcs[0].totaleq);
              console.log(totalprj[0].totaleq);
              console.log(totalexam[0].totaleq);
            if(t==0){
              midtermtotals = (totalcs[0].totaleq*percentGrade[0].midtermCS)+(totalprj[0].totaleq*percentGrade[0].midtermPRJ)+(totalexam[0].totaleq*percentGrade[0].midtermEXAM);
            }else{
              console.log(midtermtotals);
              finaltermtotals = (totalcs[0].totaleq*percentGrade[0].finaltermCS)+(totalprj[0].totaleq*percentGrade[0].finaltermPRJ)+(totalexam[0].totaleq*percentGrade[0].finaltermEXAM);
              console.log(finaltermtotals);
            }
        }
      overalltotals = (midtermtotals*.5)+(finaltermtotals*.5);
      return [{midtermtotals:Meteor.Custom.RoundOff(midtermtotals),finaltermtotals:Meteor.Custom.RoundOff(finaltermtotals),overalltotals:Meteor.Custom.RoundOff(overalltotals)}];
    }else{
      return [{midtermtotals:0,finaltermtotals:0,overalltotals:0}];
    }
  },
  students:function(){
    console.log(students.find({classId:this.class_id}).fetch());
    return students.find({classId:this.class_id}).fetch();
  },
  name:function(studId){
    var name = Meteor.users.find({_id:studId}).fetch();
    return name[0].profile.lastname + ", "+ name[0].profile.firstname;
  },
  studentRecord:function(){
    return graderecordindex.find({classId:Session.get("classId"),term:Session.get("term"),type:Session.get("itemtype")},{fields:{_id:1}}).fetch();;
  },
  studentgrade:function(studId,recordId){
     return graderecord.find({recordId:recordId,studId:studId}).fetch();
  },
  gradeinfo:function(studId,recordId){
    return [{studId:studId,recordId:recordId}];
  },
  norecord:function(studId,recordId){
    if(graderecord.find({recordId:recordId,studId:studId}).count() == 0){
      return true;
    }else{
      return false;
    }
  }
});

Template.teacherDashboardRecords.events({
  "click #btn-midtermRecord":function(){
    Session.set("term","midterm");
  },
  "click #btn-finaltermRecord":function(){
    Session.set("term","finalterm");
  },
  "click #btn-CompleteRecord":function(){
    Session.set("term","complete term");
  },
  "click #btn-ClassStanding":function(){
    Session.set("itemtype","class standing");
  },
  "click #btn-Project":function(){
    Session.set("itemtype","project");
  },
  "click #btn-Exam":function(){
    Session.set("itemtype","exam");
  },
  "click #btn-Summary":function(){
    console.log($("#CSprcnt").text());
    Session.set("itemtype","summary");
  },
  "click #btn-addnew":function(){
    IonPopup.prompt({
      title: 'Record Grade',
      template: 'Please enter the grade',
      okText: 'Submit',
      inputType: 'number',
      inputPlaceholder: '',
      //ionpopup with a input for token for the registration of teachers
        onOk: function(error, result){
          items = Number(result);
          Meteor.call("addRecord",Session.get("classId"),Session.get("term"),Session.get("itemtype"),items,function(error){
            if(error){
              window.alert('Invalid Input');
              //display if the token is invalid
            }else{
              window.alert("successfully Added");

              //call the popup function to show that the teacher has successfuly registered.
            }
          });
        }//onok
    });//IonPopup.prompt

  },
  "click #addgrade":function(event){
    event.preventDefault()
    var studId = this.studId,
        recordId = this.recordId;
   IonPopup.prompt({
     title: 'Record Grade',
     template: 'Please enter the grade',
     okText: 'Submit',
     inputType: 'number',
     inputPlaceholder: '',
     //ionpopup with a input for token for the registration of teachers
       onOk: function(error, result){
         grade = Number(result);
         Meteor.call('addStudentGrade', studId,recordId, grade, function(error){
           if(error){
             window.alert('Invalid Input');
             //display if the token is invalid
           }else{
             window.alert("successfully Added");

             //call the popup function to show that the teacher has successfuly registered.
           }
         });
       }//onok
   });//IonPopup.prompt
},
"click #changegrade":function(event){
  event.preventDefault();
  console.log(this._id);
  var gradeId = this._id;
  IonPopup.prompt({
   title: 'Record Grade',
   template: 'Please enter the grade',
   okText: 'Submit',
   inputType: 'number',
   inputPlaceholder: '',
   //ionpopup with a input for token for the registration of teachers
     onOk: function(error, result){
       newgrade = Number(result);
       Meteor.call('changeStudentGrade', gradeId, newgrade, function(error){
         if(error){
           window.alert('Invalid Input');
           //display if the token is invalid
         }else{
           window.alert("successfully Added");

           //call the popup function to show that the teacher has successfuly registered.
         }
       });
     }//onok
 });//IonPopup.prompt
}
});
