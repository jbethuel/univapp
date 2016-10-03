// Template.uploadedFiles.helpers({
//   uploadedFiles: function () {
//     return Images.find();
//   }
// });

// Template.uploadForm.onCreated(function () {
//   this.currentUpload = new ReactiveVar(false);
// });

// Template.uploadForm.helpers({
//   currentUpload: function () {
//     return Template.instance().currentUpload.get();
//   }
// });

// Template.uploadForm.events({
//   'change #fileInput': function (e, template) {
//     if (e.currentTarget.files && e.currentTarget.files[0]) {
//       // We upload only one file, in case 
//       // there was multiple files selected
//       var file = e.currentTarget.files[0];
//       if (file) {
//         var uploadInstance = Images.insert({
//           file: file,
//           streams: 'dynamic',
//           chunkSize: 'dynamic'
//         }, false);

//         uploadInstance.on('start', function() {
//           template.currentUpload.set(this);
//         });

//         uploadInstance.on('end', function(error, fileObj) {
//           if (error) {
//             alert('Error during upload: ' + error.reason);
//           } else {
//             alert('File "' + fileObj.name + '" successfully uploaded');
//           }
//           template.currentUpload.set(false);
//         });

//         uploadInstance.start();
//       }
//     }
//   }
// });

Template.teacherDashboardSettings.events({
  "click #btnUpload": function(event){
    event.preventDefault();
     $("#fileopen").click()
  },
  "change #fileopen": function(){
    console.log('wew');
  }
});


