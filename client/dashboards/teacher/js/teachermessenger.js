Template.teacherDashboardMessenger.events({
  "click .item-avatar": function(event){
    event.preventDefault();

    Router.go('teacherDashboardConversation');
  }
})
