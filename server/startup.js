Meteor.startup(function(){
  checkadmin = Meteor.users.find({roles: 'admin'}).count();
  if(checkadmin == 0){
      adminDetails= {
      username: "000",
      password: "admin",
      profile:{
        fullname:"ADMINISTRATION"
      }
    }
    id = Accounts.createUser(adminDetails);
    Roles.addUsersToRoles(id, 'admin');
  }
});
