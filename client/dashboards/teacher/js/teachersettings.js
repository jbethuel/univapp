Template.uploadedFiles.helpers({
  uploadedFiles: function () {
    return Images.find({userId:Meteor.userId()});
  }
});

Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  }
});

Template.uploadForm.events({
	  "click #btnUpload": function(event){
    event.preventDefault();
     $("#fileInput").click()
  },
  'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case 
      // there was multiple files selected
      var file = e.currentTarget.files[0];
      if (file) {
       var count = Images.find({userId:Meteor.userId()}).count();
        if (count < 1) {
           console.log('insert');
          var uploadInstance = Images.insert({
          file: file,
          streams: 'dynamic',
          chunkSize: 'dynamic'
        }, false);
        uploadInstance.on('start', function() {
          template.currentUpload.set(this);
        });

        uploadInstance.on('end', function(error, fileObj) {
          if (error) {
            alert('Error during upload: ' + error.reason);
          } else {
            console.log("success upload");
          }
          template.currentUpload.set(false);
        });

        uploadInstance.start();
        }
        }else{
           console.log('update');
         var uploadInstance = Images.update({userId:Meteor.userId()},{$set:{ file: file,
          streams: 'dynamic',
          chunkSize: 'dynamic'}},false);
        uploadInstance.on('start', function() {
          template.currentUpload.set(this);
        });

        uploadInstance.on('end', function(error, fileObj) {
          if (error) {
            alert('Error during upload: ' + error.reason);
          } else {
            console.log("success upload");
          }
          template.currentUpload.set(false);
        });

        uploadInstance.start();

      
      }
    }
  }
});
