Template.studentDashboardSchedules.events({
  "click .item": function(event){
    event.preventDefault();

    Router.go('tabs.one');
  }
});
