Template.adminDashboardAbout.rendered = function() {
  IonSideMenu.snapper.disable();
};

Template.adminDashboardAbout.destroyed = function() {
  IonSideMenu.snapper.enable();
};
