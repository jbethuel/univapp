Template.adminDashboardTokenStudent.onCreated(function(){
  this.subscribe('tokensStudent');
  new Clipboard('button');
});

Template.adminDashboardTokenStudent.events({
  "click .btn_token": function(event){
    event.preventDefault();
    Meteor.call('addTokensStudent');
  }
});

Template.adminDashboardTokenStudent.helpers({
  tokens: function(){
    return tokens.find({type:'student'}).fetch();
  }
});
