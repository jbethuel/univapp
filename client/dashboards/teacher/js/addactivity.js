Template.teacheraddactivity.events({
  "click #btnAddActivity":function(e){
    e.preventDefault();
    var title = $("#txtActivityTitle").val(),
        description = $("#txtActivityDescription").val(),
        term = $("#txtActivityTerm").val(),
        total_score = $("#txtTotalScore").val(),
        due_time = $("#timepicker").val(),
        due_date = $("#datepicker").val();
    var activity_info = {
      classId:Session.get("currentClassId"),
      recordId:"",
      title:title,
      total:total_score,
      description:description,
      term:term,
      due:new Date(due_date+","+due_time)
    };
    Meteor.call('addRecord',Session.get("currentClassId"),term,"class standing",total_score, function(error, result){
      var recordId = result;
        activity_info.recordId = recordId;
      Meteor.call('addActivity',activity_info);
    });
    console.log(activity_info);
  }
});
