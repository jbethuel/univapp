Template.studentPopover.events({
  "click .item": function(event){
    event.preventDefault();

    id = Router.current().params.class_id;
    Router.go('studentDashboardViewClass',{
      class_id: id
    });
    $(".list").click();
  }
});
