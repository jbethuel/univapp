Template.adminDashboardHome.onCreated(function(){
  this.subscribe('adminTokens');
  this.subscribe('adminNews');
  this.subscribe('adminUsers');
});

Template.adminDashboardHome.helpers({
  announcements: function(){
    return news.find({}).count();
  },
  tokens: function(){
    return tokens.find({}).count();
  },
  tokensUsed: function(){
    return tokens.find({used: true}).count();
  },
  students: function(){
    return Meteor.users.find({roles: "student"}).count();
  },
  teachers: function(){
    return Meteor.users.find({roles: "teacher"}).count();
  }
});

Template.adminDashboardHome.events({
  'click .download': function(event) {
    id = Meteor.userId();
    var csvContent = CSV.unparse(Meteor.users.find({_id:id}).fetch());
    // window.open('data:text/csv;charset=utf-8,' + encodeURI(csvContent), '_system', 'location=yes');

    var fileTransfer = new FileTransfer();
    var uri = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    var fileURL =  "///sdcard/BukSu/file";

    fileTransfer.download(
     uri, fileURL, function(entry) {
        console.log("download complete: " + entry.toURL());
     },

     function(error) {
        console.log("download error source " + error.source);
        console.log("download error target " + error.target);
        console.log("download error code" + error.code);
     },

     false, {
        headers: {
           "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
        }
     }
    )

  }
});
