tokens = new Mongo.Collection('tokens');
news = new Mongo.Collection('news');
classindex = new Mongo.Collection('classindex');
students = new Mongo.Collection('students');
attendanceindex = new Mongo.Collection('attendanceindex');
attendance = new Mongo.Collection('attendance');
messageboard = new Mongo.Collection('messageboard');

//for uploading images

this.Images = new Meteor.Files({
  debug: true,
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024*1024*10 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});

if (Meteor.isServer) {
  Images.denyClient();
  Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
  });

} else {

  Meteor.subscribe('files.images.all');
}
