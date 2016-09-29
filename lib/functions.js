Meteor.Validation = {
//check input if it is blank or a space
CheckBlankSpace:function(CheckVar){
      if(CheckVar == "" || CheckVar == " "){
        return true;
      }else{
        return false;
      }
    },

};

//ionic popup
Meteor.Messages = {
  dialog:function(title, template, button){
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
  },

}

Meteor.Custom = {

}
