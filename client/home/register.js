Template.register.events({
  "click .btn_student_reg": function(event){

    event.preventDefault();
    stud_id = $('.reg_id').val();
    firstname = $('.reg_firstname').val();
    middlename = $('.reg_middlename').val();
    lastname = $('.reg_lastname').val();
    pw = $('.reg_pw').val();
    conf_pw = $('.reg_conf_pw').val();

    if(Meteor.Validation.CheckBlankSpace(stud_id) || Meteor.Validation.CheckBlankSpace(firstname) || Meteor.Validation.CheckBlankSpace(middlename) || Meteor.Validation.CheckBlankSpace(lastname) || Meteor.Validation.CheckBlankSpace(pw) || Meteor.Validation.CheckBlankSpace(conf_pw)){
      title = "ERROR";
      button = "button button-assertive";
      template = "<div class='title_prompt'>Please complete all the fields.</div>";
      Meteor.Messages.dialog(title, template, button);
    }else if(pw != conf_pw){
      title = "ERROR";
      button = "button button-assertive";
      template = "<div class='title_prompt'>Password does not match.</div>";
      Meteor.Messages.dialog(title, template, button);
    }else{
      IonPopup.prompt({
        title: 'Security Token',
        template: "<div class='title_prompt'>Please enter the token given by the admin.</div>",
        okText: 'Submit',
        inputType: 'password',
        inputPlaceholder: '********',
          onOk: function(error, result){
            token = result;
            Meteor.call('registerStudent', token, stud_id, firstname, middlename, lastname, pw, function(error){
              if(error && error.error === 'invalid'){
                IonLoading.show({
                  customTemplate: '<h4>ERROR</h4><p>Invalid Token. Try Again.</p>',
                  duration: 3000
                });
              }else{
                IonPopup.show({
                  title: "success",
                  template: "You can now login.",
                  buttons: [{
                    text: 'OK',
                    type: "button button-balanced",
                    onTap: function() {
                      Router.go('login');
                      IonPopup.close();
                    }
                  }]
                });
              }//else
            });//meteor call
          }
      });
    }//else
  },//click .btn_reg

  "click .btn_teacher_reg": function(event){
    event.preventDefault();
    teach_id = $('.reg_id').val();
    firstname = $('.reg_firstname').val();
    middlename = $('.reg_middlename').val();
    lastname = $('.reg_lastname').val();
    pw = $('.reg_pw').val();
    conf_pw = $('.reg_conf_pw').val();

    if(Meteor.Validation.CheckBlankSpace(teach_id) || Meteor.Validation.CheckBlankSpace(firstname) || Meteor.Validation.CheckBlankSpace(middlename) || Meteor.Validation.CheckBlankSpace(lastname) || Meteor.Validation.CheckBlankSpace(pw) || Meteor.Validation.CheckBlankSpace(conf_pw)){
      title = "ERROR";
      button = "button button-assertive";
      template = "<div class='title_prompt'>Please complete all the fields.</div>";
      Meteor.Messages.dialog(title, template, button);

    }else if(pw != conf_pw){
      title = "ERROR";
      button = "button button-assertive";
      template = "<div class='title_prompt'>Password does not match.</div>";
      Meteor.Messages.dialog(title, template, button);

    }else{
      IonPopup.prompt({
        title: 'Security Token',
        template: "<div class='title_prompt'>Please enter the token given by admin.</div>",
        okText: 'Submit',
        inputType: 'password',
        inputPlaceholder: '********',
          onOk: function(error, result){
            token = result;
            Meteor.call('registerTeacher', token, teach_id, firstname, middlename, lastname, pw, function(error){
              if(error && error.error === 'invalid'){
                IonLoading.show({
                  customTemplate: '<h4>ERROR</h4><p>Invalid Token. Try Again.</p>',
                  duration: 3000
                });
              }else{
                IonPopup.show({
                  title: "success",
                  template: "You can now login.",
                  buttons: [{
                    text: 'OK',
                    type: "button button-balanced",
                    onTap: function() {
                      IonPopup.close();
                      Router.go('login');
                    }
                  }]
                });
              }
            });
          }
      });
    }
  }
});
