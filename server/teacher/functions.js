Meteor.methods({
  unreadTMessages: function(class_id){
    threads.update({class_id: class_id, teach_id: this.userId}, {$set:{seenByTeacher: true}});
  },
  teacherSendMessage: function(class_id, stud_id, teach_id, message){
    threads.update({class_id: class_id, stud_id: stud_id, teach_id: this.userId}, {$set:{lastMessageDate: new Date(), seenByStudent: false}});
    messages.insert({
      class_id, class_id,
      stud_id: stud_id,
      teach_id: teach_id,
      message: message,
      sentBy: teach_id,
      createdAt: new Date()
    });
  },
  teacherAnnouncement: function(classId, title, content){
    isTeacher = classindex.find({_id: classId, teachId: this.userId}).count();
    console.log(isTeacher);
    if(isTeacher == 1){
      announcement.insert({
        classId: classId,
        title: title,
        content: content,
        senderId: this.userId,
        createdAt: new Date()
      });
    }else{
      throw new Meteor.Error(500,'Access Denied.');
    }
  },
  teacherDropClass: function(id){
    isTeacher = classindex.find({_id: id, teachId: this.userId}).count();
    if(isTeacher == 0){
      throw new Meteor.Error(500,'Access Denied.');
    }else{
      classindex.remove({_id: id, teachId: this.userId});
    }
  }
});
