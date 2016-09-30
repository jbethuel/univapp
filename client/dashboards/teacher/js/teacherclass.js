Template.teacherDashboardClass.onCreated(function() {
  this.subscribe("classindex");
  Session.setDefault("manageSearchClass", "");
  Session.setDefault("filterSemester", "");
  Session.setDefault("filterYear", "");
  Session.setDefault("filterDay", "");
});

Template.teacherDashboardClass.helpers({
  //display the classes of the user
  classes: function() {
    var teachId = Meteor.userId();
    var keyword = Session.get("manageSearchClass");
    var query = ".*" + keyword + ".*";
    var sem = Session.get("filterSemester");
    var year = Session.get("filterYear");
    var day = Session.get("filterDay");
    return classindex.find({
      "description": {
        '$regex': '.*' + keyword + '.*',
        $options: 'i'
      },
      sem: {
        '$regex': '.*' + sem + '.*',
        $options: 'i'
      },
      sched: {
        '$regex': '.*' + day + '.*',
        $options: 'i'
      },
      school_yr: {
        '$regex': '.*' + year + '.*',
        $options: 'i'
      },
      teachId: teachId
    }).fetch();
  },
});

Template.teacherDashboardClass.events({
  "keyup #txtSearchDescription": function(event) {
    event.preventDefault();
    Session.set("manageSearchClass", $("#txtSearchDescription").val());
  },
  'click [data-action=showActionSheet]': function(event, template) {
    var classIndexId = this._id;
    console.log(classIndexId);

    IonActionSheet.show({
      titleText: 'Actions',
      buttons: [  {
        text: 'View <i class="icon ion-edit"></i>'
      }],
      destructiveText: 'Delete',
      cancelText: 'Cancel',
      cancel: function() {
        console.log('Cancelled!');
      },
      buttonClicked: function(index) {

        if (index == 0) {
          console.log(classIndexId);
          Router.go('teacherDashboardSeatplan', {
            class_id: classIndexId
          });
        }
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('Destructive Action!');

        IonPopup.prompt({
          title: 'Delete Record',
          template: "<div class='title_prompt'>You're about to delete this record. Are you sure you want to delete this? please type YES</div>",
          okText: 'Submit',
          inputType: 'Text',
            onOk: function(error, result){
              token = result;
              if(token === "YES"){
                Meteor.call("deleteClass", classIndexId);
                IonLoading.show({
                  customTemplate: '<p>The record was successfully deleted.</p>',
                  duration: 3000
                });
              }else{
                IonLoading.show({
                  customTemplate: '<h4>ERROR</h4><p>The record was not successfully deleted.</p>',
                  duration: 3000
                });
              }
            }
        });
        return true;
      }
    });
  }
});

Template.filter.events({
  "click #selSemester": function(event) {
    event.preventDefault();
    Session.set("filterSemester", $("#selSemester").val());
  },
  "click #selYear": function(event) {
    event.preventDefault();
    Session.set("filterYear", $("#selYear").val());
  },
  "click #selDay": function(event) {
    event.preventDefault();
    Session.set("filterDay", $("#selDay").val());
  }
});
