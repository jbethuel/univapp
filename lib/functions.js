Meteor.Validation = {

CheckBlankSpace:function(CheckVar){
      if(CheckVar == "" || CheckVar == " "){
        return true;
      }else{
        return false;
      }
    },

};

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
