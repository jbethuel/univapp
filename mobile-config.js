App.info({
  id: 'com.buksu.alpha',
  name: 'BukSU',
  version: '0.0.1'
});

App.accessRule("blob:*");
App.setPreference('android-targetSdkVersion', 19);
App.setPreference('StatusBarStyle', 'false');
App.setPreference('StatusBarBackgroundColor', '#212121');

App.icons({
  'iphone_2x': 'resources/icon/iphone_2x.png',
  'iphone_3x': 'resources/icon/iphone_3x.png',
  'ipad': 'resources/icon/ipad.png',
  'ipad_2x': 'resources/icon/ipad_2x.png',
  'ipad_pro': 'resources/icon/ipad_pro.png',
  'ios_settings': 'resources/icon/ios_settings.png',
  'ios_settings_2x': 'resources/icon/ios_settings_2x.png',
  'ios_settings_3x': 'resources/icon/ios_settings_3x.png',
  'ios_spotlight': 'resources/icon/ios_spotlight.png',
  'ios_spotlight_2x': 'resources/icon/ios_spotlight_2x.png',
  'android_mdpi': 'resources/icon/android_mdpi.png',
  'android_hdpi': 'resources/icon/android_hdpi.png',
  'android_xhdpi': 'resources/icon/android_xhdpi.png',
  'android_xxhdpi': 'resources/icon/android_xxhdpi.png',
  'android_xxxhdpi': 'resources/icon/android_xxxhdpi.png'
});

App.launchScreens({
  'iphone_2x': 'resources/splash/iphone_2x.png',
  'iphone5': 'resources/splash/iphone5.png',
  'iphone6': 'resources/splash/iphone6.png',
  'iphone6p_portrait': 'resources/splash/iphone6p_portrait.png',
  'iphone6p_landscape': 'resources/splash/iphone6p_landscape.png',
  'ipad_portrait': 'resources/splash/ipad_portrait.png',
  'ipad_portrait_2x': 'resources/splash/ipad_portrait_2x.png',
  'ipad_landscape': 'resources/splash/ipad_landscape.png',
  'ipad_landscape_2x': 'resources/splash/ipad_landscape_2x.png',
  'android_mdpi_portrait': 'resources/splash/android_mdpi_portrait.png',
  'android_mdpi_landscape': 'resources/splash/android_mdpi_landscape.png',
  'android_hdpi_portrait': 'resources/splash/android_hdpi_portrait.png',
  'android_hdpi_landscape': 'resources/splash/android_hdpi_landscape.png',
  'android_xhdpi_portrait': 'resources/splash/android_xhdpi_portrait.png',
  'android_xhdpi_landscape': 'resources/splash/android_xhdpi_landscape.png',
  'android_xxhdpi_portrait': 'resources/splash/android_xxhdpi_portrait.png',
  'android_xxhdpi_landscape': 'resources/splash/android_xxhdpi_landscape.png'
});
