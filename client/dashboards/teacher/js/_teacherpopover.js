Template.teacherPopover.events({
  "click .view": function(event){
    event.preventDefault();

    id = Router.current().params.class_id;
    Router.go('teacherDashboardViewClass',{
      class_id: id
    });
    $(".list").click();
  },
  "click .download": function(e){
    e.preventDefault();

    teach_id = Meteor.userId();
    stud_id = Router.current().params.stud_id;
    var csvContent = CSV.unparse(messages.find({stud_id: stud_id, teach_id: teach_id}, {fields:{'_id': 0, 'senderName': 1, 'message': 1, 'createdAt': 1}}).fetch());
    window.open('data:text/csv;charset=utf-8,' + encodeURI(csvContent), '_system', 'location=yes');
  }
});
