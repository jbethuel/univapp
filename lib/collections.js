tokens = new Mongo.Collection('tokens');
news = new Mongo.Collection('news');
classindex = new Mongo.Collection('classindex');
students = new Mongo.Collection('students');
attendance = new Mongo.Collection('attendance');
graderecordindex = new Mongo.Collection('graderecordindex');
graderecord = new Mongo.Collection('graderecord');
percentage = new Mongo.Collection('percentage');
roomactivity = new Mongo.Collection('roomactivity');

messages = new Mongo.Collection('message');
threads = new Mongo.Collection('thread');
messageboard = new Mongo.Collection('messageboard');
announcement = new Mongo.Collection('announcement');

//for uploading images

this.Images = new Meteor.Files({
  debug: true,
  collectionName: 'Images',
  allowClientCode: true, // Disallow remove files from Client
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
