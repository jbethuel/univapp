Template.adminDashboardLoginUser.onCreated(function(){
  this.subscribe("appusers");
});

Template.adminDashboardLoginUser.onDestroyed(function(){
  delete Session.keys['searchuser'];
});

Template.adminDashboardLoginUser.events({
  "keyup .searchuser": function(event){
    event.preventDefault();
    user = $(".searchuser").val();
    Session.set("searchuser",user);
  }
});

Template.adminDashboardLoginUser.helpers({
  result: function(){
    var keyword = Session.get("searchuser");
    var query = ".*" + keyword + ".*";

    if(keyword == ""){
      return;
    }else{
      return Meteor.users.find({
        "username": {'$regex' : '.*' + keyword + '.*' , $options: 'i'}
      }).fetch();
    }
  },
  user: function(){
    var keyword = Session.get("searchuser");
    var query = ".*" + keyword + ".*";

    return Meteor.users.find({
      "username": {'$regex' : '.*' + keyword + '.*' , $options: 'i'}
    }).count() === 1;
  }
});
