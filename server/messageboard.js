Meteor.methods({
  messageBoardInsert: function(classId, senderId, message){
    messageboard.insert({
      classId: classId,
      senderId: senderId,
      message: message,
      createdAt: new Date()
    });
  }
});
