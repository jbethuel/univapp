Template.studentDashboardClassAnnouncement.onCreated(function(){
  this.subscribe("studentClass");
});

Template.studentDashboardClassAnnouncement.helpers({
  classid: function(){
    return students.find({}).fetch();
  },
  announcement: function(classId){
    Meteor.subscribe("studentAnnouncement", classId);
    return announcement.find({}, {sort:{createdAt: -1}}).fetch();
  },
  teacherName: function(senderId){
    id = senderId;
    Meteor.subscribe("teacherName", id);
    return Meteor.users.find({_id: id}).fetch();
  },
  classinfo: function(classId){
    Meteor.subscribe("studentClassInfo", classId);
    return classindex.find({}).fetch();
  },
  day: function(){
    return moment(this.createdAt).format('MMMM Do YYYY');
  },
  time: function(){
    return moment(this.createdAt).format('h:mm a');
  }
});

Template.studentDashboardClassAnnouncement.events({
  "click .assertive": function(event){
    event.preventDefault();
    id = this.classId;
    Router.go('studentDashboardViewClass',{
      class_id: id
    });
  }
});
