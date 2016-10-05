Template.adminDashboardModify.onCreated(function(){
  this.subscribe("appusers");
});

Template.adminDashboardModify.onDestroyed(function(){
  delete Session.keys['searchuser'];
});

Template.adminDashboardModify.events({
  "keyup .searchuser": function(event){
    event.preventDefault();
    user = $(".searchuser").val();
    Session.set("searchuser",user);
  },
  "click .item-icon-right": function(event){
    event.preventDefault();
    var id = this._id;
    Session.set("userId", id);
  },
  "click .btn_clear": function(event){
    event.preventDefault();
    $(".searchuser").val("");
    Session.set("searchuser", "");
  }
});

Template.adminDashboardModify.helpers({
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
