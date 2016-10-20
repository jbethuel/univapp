Push.Configure({
  gcm: {
    apiKey: 'AIzaSyC3kvvwKJzqj-SzJB6hI7CDNNXx2OSI2Tw',
    projectNumber: 736841207820
  }
  // production: true,
  // 'sound' true,
  // 'badge' true,
  // 'alert' true,
  // 'vibrate' true,
  // 'sendInterval': 15000, Configurable interval between sending
  // 'sendBatchSize': 1, Configurable number of notifications to send per batch
  // 'keepNotifications': false,
//
});

Push.allow({
    send: function(userId, notification) {
        return true; // Allow all users to send
    }
});

Meteor.methods({

  notify: function(){
    Push.send({
      from: 'Test',
      title: 'Hello',
      text: 'World',
      badge: 12,
      // sound: fileInPublicFolder
      query: {
        userId: 'xxxxxxxxxxxx'
      }
    });
  }

});
