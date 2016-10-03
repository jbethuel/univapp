Template.studentDashboardSearch.onCreated(function(){
  this.subscribe("classindex");
  this.subscribe("students");
  this.subscribe("appusers");
  Session.setDefault("manageSearchClass","");
  Session.setDefault("filterSemester","");
  Session.setDefault("filterYear","");
  Session.setDefault("filterDay","");
});

Template.studentDashboardSearch.onDestroyed(function(){
  delete Session.keys['manageSearchClass'];
  delete Session.keys['filterSemester'];
  delete Session.keys['filterYear'];
  delete Session.keys['filterDay'];
});

Template.studentDashboardSearch.events({
  "keyup #txtSearchDescription": function(event){
    event.preventDefault();
    Session.set("manageSearchClass",$("#txtSearchDescription").val());
  },
  "click #btnenterclass":function(event){
    event.preventDefault();
    var studDetails = {
      studId: Meteor.userId(),
      classId: this._id,
      colnum: 0,
      rownum: 0
    }
    var checkstud = students.find({studId:Meteor.userId(),classId:this._id}).count();
    console.log(checkstud);
    var roomId = this._id;
    IonPopup.prompt({
      title: 'Security Token',
      template: '<div class="title_prompt">Please enter passkey</div>',
      okText: 'Submit',
      inputType: 'password',
      inputPlaceholder: '',
        onOk: function(error, result){
          var token = result;
          console.log(roomId);
          console.log(classindex.find({_id:roomId,passkey:token}).count());
          var fnd = classindex.find({_id:roomId,passkey:token}).count();
            if(fnd == 0){
              IonLoading.show({
                customTemplate: '<h4>ERROR</h4><p>Invalid Token. Try Again.</p>',
                duration: 3000
              });
            }else{
              if(checkstud === 0){
                Meteor.call('addstudent',studDetails);
              }
              Router.go("studentDashboardSchedules");
            }
        }
    });
  }
});

Template.studentDashboardSearch.helpers({
  searchresult:function(){
    var keyword  = Session.get("manageSearchClass");
    var query = ".*"+keyword+".*";
    var sem = Session.get("filterSemester");
    var year = Session.get("filterYear");
    var day = Session.get("filterDay");

    if(keyword == ""){
      return;
    }else{
        return classindex.find({
        "description": {'$regex' : '.*' + keyword + '.*', $options: 'i'},
        sem: {'$regex' : '.*' + sem + '.*', $options: 'i'},
        sched: {'$regex' : '.*' + day + '.*', $options: 'i'},
        school_yr:{'$regex' : '.*' + year + '.*', $options: 'i'}
        }).fetch();
      }
    },
    TeacherInfo:function(teachId){
       return Meteor.users.find({_id:teachId},{username:1}).fetch();
    },
    notInclass:function(){
      return students.find({classId:this._id,studId:Meteor.userId()}).count() === 0;
    }
});
