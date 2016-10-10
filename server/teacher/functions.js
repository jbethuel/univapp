Meteor.publish("studentCount", function(_id){
  return students.find({classId: _id});
});

Meteor.methods({
  teacherAnnouncement: function(classId, title, content){
    isTeacher = classindex.find({_id: classId, teachId: this.userId}).count();
    console.log(isTeacher);
    if(isTeacher == 1){
      announcement.insert({
        classId: classId,
        title: title,
        content: content,
        senderId: this.userId
      });
    }else{
      throw new Meteor.Error(500,'Access Denied.');
    }

  }
});
