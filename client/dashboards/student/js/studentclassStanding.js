Template.studentDashboardClassStanding.onCreated(function(){
  Tracker.autorun(function(){
    Meteor.subscribe("graderecordindex",Session.get("classId"));
    Meteor.subscribe("percentage",Session.get("classId"));
  });
  Meteor.subscribe("graderecord");
});

Template.studentDashboardClassStanding.helpers({
  currentRoute: function(){
    return Router.current().params.class_id;
  },
  gradeinfo:function(){
    Session.set("classId",this.class_id);
    var studId = Meteor.userId();
    console.log(Session.get("classId"));
    var term = ["midterm","finalterm"],
        grades = [],
        percentGrade = percentage.find({classId:Session.get("classId")}).fetch();
    for(t = 0;t<term.length;t++){
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
          if(percentGrade.length !=0){
            if(term == "midterm"){
              overalltotals = (Meteor.Custom.RoundOff(totalcs[0].totaleq)*percentGrade[0].midtermCS) + (Meteor.Custom.RoundOff(totalprj[0].totaleq)*percentGrade[0].midtermPRJ) + (Meteor.Custom.RoundOff(totalexam[0].totaleq)*percentGrade[0].midtermEXAM);
              return [{term:"MID-TERM",totalCS:totalcs[0].totaleq,totalPRJ:totalprj[0].totaleq,totalEXAM:totalexam[0].totaleq,overallTotal:Meteor.Custom.RoundOff(overalltotals)}];
            }else{
              overalltotals = (Meteor.Custom.RoundOff(totalcs[0].totaleq)*percentGrade[0].finaltermCS) + (Meteor.Custom.RoundOff(totalprj[0].totaleq)*percentGrade[0].finaltermPRJ) + (Meteor.Custom.RoundOff(totalexam[0].totaleq)*percentGrade[0].finaltermEXAM);
              grades.push({term:"FINAL-TERM",totalCS:totalcs[0].totaleq,totalPRJ:totalprj[0].totaleq,totalEXAM:totalexam[0].totaleq,overallTotal:Meteor.Custom.RoundOff(overalltotals)});
            }
          }else{
            if(term == "midterm"){
              return [{term:"MID-TERM",totalCS:0,totalPRJ:0,totalEXAM:0,overallTotal:0}];
            }else{
              grades.push({term:"FINAL-TERM",totalCS:0,totalPRJ:0,totalEXAM:0,overallTotal:0});
            }
          }
    }
    return grades;
  }
});
