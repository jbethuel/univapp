Template.adminDashboardPost.events({
  "click .btn_cancel": function(event){
    event.preventDefault();

    $('.txtTitle').val('');
    $('.txtContent').val('');

    IonPopup.show({
      title: 'CANCELLED',
      template: '<div class="title_prompt">Nothing was sent.</div>',
      buttons: [{
        text: 'OK',
        type: 'button-royal',
        onTap: function() {
          IonPopup.close();
        }
      }]
    });

  },
  "click .btn_send": function(event){
    event.preventDefault();

    title = $('.txtTitle').val();
    content = $('.txtContent').val();
    student = $('.chkStud').is(':checked');
    teacher = $('.chkTeach').is(':checked');

    if(title == "" || content == "" || (student == false && teacher == false)){

      title = "ERROR!";
      template = "<div class='title_prompt'>Title and content should not be empty.</div>";
      button = "button-assertive";
      Meteor.Messages.dialog(title, template, button);

    }else{

      if(student == false){
        sendTo = "teacher";
      }else if(teacher == false){
        sendTo = "student";
      }else{
        sendTo = "both";
      }

      IonPopup.confirm({
        title: 'The news will be sent',
        template: '<div class="title_prompt">Are you sure?</div>',
        onOk: function() {
          Meteor.call('adminpost', title, content, sendTo, function(error){
            if(!error){
              IonLoading.show({
                customTemplate: '<h4>SUCCESS</h4><p>News posted!</p>',
                duration: 5000
              });
              $('.txtTitle').val('');
              $('.txtContent').val('');
            }
          });
        },
        onCancel: function() {
        }
      });

    }
  }
});
