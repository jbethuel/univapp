Template.adminDashboardTokenTeacher.onCreated(function(){
  this.subscribe('tokensTeacher');
  new Clipboard('button');
});

Template.adminDashboardTokenTeacher.events({
  "click .btn_token": function(event){
    event.preventDefault();
    Meteor.call('addTokensTeacher');
  }
});

Template.adminDashboardTokenTeacher.helpers({
  tokens: function(){
    return tokens.find({type:'teacher'}).fetch();
  }
});
