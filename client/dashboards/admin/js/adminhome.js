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
    var nameFile = 'fileDownloaded.csv';
    Meteor.call('download', function(err, fileContent) {
      if(fileContent){
        var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
        fileURL = URL.createObjectURL(blob);
        saveAs(blob, nameFile);
        // window.open(saveAs(blob, nameFile), '_system', 'location=yes');
        // fileURL = URL.createObjectURL(blob);
        // fileTransfer.download(uri, fileURL);
      }
    });
  }
});
