Meteor.methods({
  studentDropClass: function(id){
    isStudent = students.find({classId: id, studId: this.userId}).count();
    if(isStudent == 0){
      throw new Meteor.Error(500,'Access Denied.');
    }else{
      students.remove({classId: id, studId: this.userId});
    }

  }
});
