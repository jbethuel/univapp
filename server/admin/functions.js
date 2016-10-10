Meteor.methods({
  teacherDropClass: function(id){
    isTeacher = classindex.find({_id: id, teachId: this.userId}).count();
    if(isTeacher == 0){
      throw new Meteor.Error(500,'Access Denied.');
    }else{
      classindex.remove({_id: id, teachId: this.userId});
    }

  }
});
