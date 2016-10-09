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
  'click .class': function(event){
    var classIndexId = this._id;
    console.log(classIndexId);
    Router.go('teacherDashboardViewClass',{
      class_id: classIndexId
    });
  }
});
