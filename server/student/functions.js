Meteor.methods({
  unreadSMessages: function(class_id){
    threads.update({class_id: class_id, stud_id: this.userId}, {$set:{seenByStudent: true}});
  },
  studentSendMessage: function(class_id, stud_id, teach_id, message){
    checkThread = threads.find({class_id: class_id}).count();
    if(checkThread == 0){
      threads.insert({
        class_id: class_id,
        stud_id: stud_id,
        teach_id: teach_id,
        seenByStudent: false,
        seenByTeacher: false,
        lastMessage: message,
        lastMessageBy: stud_id,
        lastMessageDate: new Date()
      });
    }
    threads.update({class_id: class_id, stud_id: this.userId, teach_id: teach_id}, {$set:{lastMessageDate: new Date(), seenByTeacher: false}});
    messages.insert({
      class_id: class_id,
      stud_id: stud_id,
      teach_id: teach_id,
      senderName: Meteor.user({_id:this.userId}).username,
      message: message,
      sentBy: stud_id,
      createdAt: new Date()
    });
  },
  joinClass: function(studDetails,classId){
    var classinfo = classindex.find({_id:classId}).fetch();
    if(classinfo[0].rows == 0 && classinfo[0].cols == 0){
        students.insert(studDetails);
    }else{
    for(var r = 1;r <= classinfo[0].rows;r++){
      for(var c = 1;c <= classinfo[0].cols;c++){
        if(students.find({classId:classId,seatnum:r+":"+c}).count()==0){
          studDetails.seatnum = r+":"+c;
          students.insert(studDetails);
          return false;
        }
      }
    }
    }
  },
  studentMessageBoardInsert: function(classId, message){
    id = this.userId;
    isStudent = students.find({studId: id, classId: classId}).count();
    if(isStudent == 0){
      throw new Meteor.Error(500,'Access Denied.');
    }else{
      messageboard.insert({
        classId: classId,
        senderId: this.userId,
        message: message,
        createdAt: new Date()
      });
    }
  },
  studentNotClass: function(id){
    isStudent = students.find({classId: id, studId: this.userId}).count();
    if(isStudent == 0){
      throw new Meteor.Error(500,'Access Denied.');
    }else{
      students.remove({classId: id, studId: this.userId});
    }
  },
  studentDropClass: function(id){
    isStudent = students.find({classId: id, studId: this.userId}).count();
    if(isStudent == 0){
      throw new Meteor.Error(500,'Access Denied.');
    }else{
      students.update({classId: id, studId: this.userId},{$set:{drop:true,seatnum:"0:0"}});
    }
  }
});
