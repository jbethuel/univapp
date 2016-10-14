Template.teachereditactivity.onCreated(function(){
  Tracker.autorun(function(){
    Meteor.subscribe("roomactivity",Session.get("currentClassId"));
  });
});
Template.teachereditactivity.helpers({
  activityinfo:function(){
    return roomactivity.find({_id:Session.get("ActivityId")}).fetch();
  },
  timeformat:function(due){
    return moment(due).format('LT');
  },
  dateformat:function(due){
    return moment(due).format("YYYY-MM-DD");
  }
});
Template.teachereditactivity.events({
  "click #btnEditActivity":function(e){
    e.preventDefault();
    var title = $("#txtActivityTitle").val(),
        description = $("#txtActivityDescription").val(),
        term = $("#txtActivityTerm").val(),
        total_score = $("#txtTotalScore").val(),
        due_time = $("#timepicker").val(),
        due_date = $("#datepicker").val();
    var activity_info = {
      classId:Session.get("currentClassId"),
      title:title,
      total:total_score,
      description:description,
      term:term,
      due:new Date(due_date+","+due_time)
    };
    Meteor.call('editRecord',this.recordId,total_score,function(error){
      if(error){
        console.log(error);
        }
    });
    Meteor.call('editActivity',activity_info,this._id,function(error){
      if(error){
        console.log(error);
      }
    });
    IonPopup.show({
      title: "success",
      template: "The record has successfully updated.",
      buttons: [{
        text: 'OK',
        type: "button button-balanced",
        onTap: function() {
          IonPopup.close();
        }
      }]
    });

    console.log(activity_info);
  }
});
