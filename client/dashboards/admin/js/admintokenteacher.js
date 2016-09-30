Template.adminDashboardTokenTeacher.onCreated(function(){
  this.subscribe('tokensTeacher');
  new Clipboard('button');
});

Template.adminDashboardTokenTeacher.events({
  "click .btn_token": function(event){
    event.preventDefault();
    Meteor.call('addTokensTeacher');
  },
  "click .btn_copy": function(event){
    event.preventDefault();
    token = this.token;
    title = "COPIED";
    button = "button button-royal";
    template = "<div class='title_prompt'>Token copied to clipboard: "+token+"</div>";
    Meteor.Messages.dialog(title, template, button);
  }
});

Template.adminDashboardTokenTeacher.helpers({
  tokens: function(){
    return tokens.find({type:'teacher'}).fetch();
  }
});
