Template.studentDashboardSchedules.onCreated(function(){
  id = Meteor.userId();
  this.subscribe("studentClass", id);
});

Template.studentDashboardSchedules.events({
  "click #visitClass": function(event){
    event.preventDefault();
    id = this._id;
    Router.go('studentDashboardViewClass',{
      class_id: id
    });
  },
  "click #droppedInClass":function(e){
    e.preventDefault();
    IonPopup.show({
      title: "Unable to Enter",
      template: "You are currently dropped in this class. Please talk to your "+
                "instructor regarding this issue.",
      buttons: [{
        text: 'OK',
        type: "button button-assertive",
        onTap: function() {
          IonPopup.close();
        }
      }]
    });
  }
});

Template.studentDashboardSchedules.helpers({
  myclasses:function(){
    return students.find({studId:Meteor.userId()}).fetch().reverse();
    },
  inClass:function(classId){
    id = classId;
    Meteor.subscribe("studentClassInfo", id);
    return classindex.find({_id:classId}).fetch().reverse();
  },
  name: function(teach_id){
    Meteor.subscribe("studentMessengerName", teach_id);
    return Meteor.users.find({_id:teach_id}).fetch();
  },
  isDrop:function(drop){
    console.log(drop);
    if(drop == false){
      return false;
    }else{
      return true;
    }
  }
});
