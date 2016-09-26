Template.studentDashboardMessenger.events({
  "click .item": function(event){
    event.preventDefault();

    Router.go('studentDashboardConversation');
  }
});
