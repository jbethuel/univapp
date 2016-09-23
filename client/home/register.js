function dialog(title, template, button){
  IonPopup.show({
    title: title,
    template: template,
    buttons: [{
      text: 'OK',
      type: button,
      onTap: function() {
        IonPopup.close();
      }
    }]
  });
};

Template.register.events({
  "click .btn_student_reg": function(event){

    event.preventDefault();
    stud_id = $('.reg_id').val();
    fullname = $('.reg_fullname').val();
    pw = $('.reg_pw').val();
    conf_pw = $('.reg_conf_pw').val();

    if(stud_id == "" || fullname == "" || pw == "" || conf_pw == ""){
      title = "ERROR";
      button = "button button-assertive";
      template = "<div class='title_prompt'>Please complete all the fields.</div>";
      dialog(title, template, button);
    }else if(pw != conf_pw){
      title = "ERROR";
      button = "button button-assertive";
      template = "<div class='title_prompt'>Password does not match.</div>";
      dialog(title, template, button);
    }else{
      IonPopup.prompt({
        title: 'Security Token',
        template: "<div class='title_prompt'>Please enter the token given by the admin.</div>",
        okText: 'Submit',
        inputType: 'password',
        inputPlaceholder: '********',
          onOk: function(error, result){
            token = result;
            Meteor.call('registerStudent', token, stud_id, fullname, pw, function(error){
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
    fullname = $('.reg_fullname').val();
    pw = $('.reg_pw').val();
    conf_pw = $('.reg_conf_pw').val();

    if(teach_id == "" || fullname == "" || pw == "" || conf_pw == "" ){
      title = "ERROR";
      button = "button button-assertive";
      template = "<div class='title_prompt'>Please complete all the fields.</div>";
      dialog(title, template, button);

    }else if(pw != conf_pw){
      title = "ERROR";
      button = "button button-assertive";
      template = "<div class='title_prompt'>Password does not match.</div>";
      dialog(title, template, button);

    }else{
      IonPopup.prompt({
        title: 'Security Token',
        template: "<div class='title_prompt'>Please enter the token given by admin.</div>",
        okText: 'Submit',
        inputType: 'password',
        inputPlaceholder: '********',
          onOk: function(error, result){
            token = result;
            Meteor.call('registerTeacher', token, teach_id, fullname, pw, function(error){
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
                      Router.go('home');
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
