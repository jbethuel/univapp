

Meteor.publish("subTeacherMessages", function(stud_id, teach_id){
  return messages.find({stud_id:stud_id, teach_id: teach_id});
});
