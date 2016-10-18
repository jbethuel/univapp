Template.studentSubmitFile.onCreated(function(){
    this.currentUpload = new ReactiveVar(false);
});

Template.studentSubmitFile.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  }
});

Template.studentSubmitFile.events({
  "click #btnSubmit":function(e, template){
    e.preventDefault();
    var errors = false,
        varfile = document.getElementById("fileinput").files,
        activityId = Session.get("currentActivityId");
      if(varfile.length > 0){
        for(var f=0;f<varfile.length;f++){
          var file = varfile[f];
          console.log(file);
          file.activityId = activityId;

          if(file){
          var uploadInstance = ActivityFiles.insert({
            file: file,
            meta:{
              activityId:activityId,
              activityFile:false
            },
            streams: 'dynamic',
            chunkSize: 'dynamic'
          }, false);
          console.log(uploadInstance);
          uploadInstance.on('start', function() {
            console.log(this);
            template.currentUpload.set(this);
          });

          uploadInstance.on('end', function(error, fileObj) {
            if (error) {
              errors = true;
              IonLoading.show({
                customTemplate: '<h4>ERROR</h4><p>'+ error.reason +'.</p>',
                duration: 3000
              });
            }
            template.currentUpload.set(false);
          });

          uploadInstance.start();
        }
      }
      }
      if(errors == false){
      IonPopup.show({
        title: "success",
        template: "The activity has successfully saved.",
        buttons: [{
          text: 'OK',
          type: "button button-balanced",
          onTap: function() {
            IonPopup.close();
            IonModal.close();
          }
        }]
      });
      }
  }

});
