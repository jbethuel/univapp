Template.teacherDashboardClass.onCreated(function() {
  new Clipboard(".copy");
  this.subscribe("classindex");
  Session.set("manageSearchClass", "");
  Session.set("filterSemester", "");
  Session.set("filterYear", "");
  Session.set("filterDay", "");
});

Template.teacherDashboardClass.helpers({
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
  "keyup .searchuser": function(event) {
    event.preventDefault();
    Session.set("manageSearchClass", $("#searchuser").val());
  },
  "click .copy": function(event){
    event.preventDefault();
    passkey = this.passkey;
    title = "COPIED";
    button = "button button-balanced";
    template = "<div class='title_prompt'>Token copied to clipboard: "+passkey+"</div>";
    Meteor.Messages.dialog(title, template, button);
  },
  'click [data-action=showActionSheet]': function(event, template) {
    var classIndexId = this._id;

    IonActionSheet.show({
      titleText: 'Actions',
      buttons: [  {
        text: 'View Class'
      }],

      destructiveText: 'Delete',
      cancelText: 'Cancel',
      cancel: function() {
        console.log('Cancelled!');
      },
      buttonClicked: function(index) {

        if (index == 0) {
          console.log(classIndexId);
          Router.go('teacherDashboardViewClass',{
            class_id: classIndexId
          });
          // Router.go('teacherDashboardSeatplan', {
          //   class_id: classIndexId
          // });
        }
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('Destructive Action!');

        IonPopup.prompt({
          title: 'Delete Class',
          template: "<div class='title_prompt'>You're about to delete this class, please type CONFIRM</div>",
          okText: 'Submit',
          inputType: 'Text',
            onOk: function(error, result){
              token = result;
              if(token === "CONFIRM"){
                Meteor.call("deleteClass", classIndexId);
                IonLoading.show({
                  customTemplate: '<p>The class was successfully deleted.</p>',
                  duration: 3000
                });
              }else{
                IonLoading.show({
                  customTemplate: '<h4>ERROR</h4><p>The class was not successfully deleted.</p>',
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
