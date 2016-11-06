Template.teacherDashboardGradeSettings.onCreated(function(){
  Tracker.autorun(function(){
    Meteor.subscribe("percentage",Session.get("classId"));
  });
  this.subscribe("classindex");
});

Template.teacherDashboardGradeSettings.events({
  "click #btnsave":function(event){
    event.preventDefault();
    var midtermCS = +$("#txtMidtermCS").val(),
        midtermPRJ = +$("#txtMidtermPRJ").val(),
        midtermEXAM = +$("#txtMidtermEXAM").val(),
        finaltermCS = +$("#txtFinaltermCS").val(),
        finaltermPRJ = +$("#txtFinaltermPRJ").val(),
        finaltermEXAM = +$("#txtFinaltermEXAM").val(),
        classe = this.class_id;

        var totalpercentMidterm = midtermCS + midtermPRJ + midtermEXAM,
            totalpercentFinalterm = finaltermCS + finaltermPRJ + finaltermEXAM;
        if (totalpercentMidterm == 1 && totalpercentFinalterm == 1) {

          Meteor.call('gradepercent',classe,midtermCS, midtermPRJ, midtermEXAM, finaltermCS, finaltermPRJ, finaltermEXAM);
            console.log(this.class_id);
            if(Meteor.isCordova){
              Meteor.startup(function(){
                window.plugins.toast.showShortCenter("Successfully Updated");
              });
            }else{
              title = "success";
              template = "Successfully Updated";
              button = "button button-balanced";
              Meteor.Messages.dialog(title, template, button);
            }
          }else {
            if(Meteor.isCordova){
              window.plugins.toast.showShortCenter("Please check the percentage.");
            }else{
              title = "ERROR";
              button = "button button-assertive";
              template = "<div class='title_prompt'>Please check the percentage</div>";
              Meteor.Messages.dialog(title, template, button);
              console.log(totalpercentMidterm + " " + totalpercentFinalterm);
            }
          }
  },

  "click #btnshow":function(event){
    event.preventDefault();
    console.log("midterm");
  }


});



Template.teacherDashboardGradeSettings.helpers({
  percentageCurrent:function(){
    return percentage.find({classId:this.class_id,teacherId:Meteor.userId()}).fetch();
  },
  information:function(){
     var a = classindex.find({_id:this.class_id}).fetch();
     return a;
  },
  issetGrade:function(){
    return percentage.find({classId:this.class_id,teacherId:Meteor.userId()}).count() === 1;
  },
  convertTohundred:function(grade){
    return grade * 100;
  },
  iscurrentpercent:function(curprcnt, selectedprcnt){
    return curprcnt === selectedprcnt;
  }
});
