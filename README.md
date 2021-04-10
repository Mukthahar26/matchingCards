Total amount after update. need to update amount in customers list, 

npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle


react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios

2. Edit schema and select Release
3. Run/Archive like normal ios App

cd android && ./gradlew clean && ./gradlew assembleRelease

cd android && ./gradlew clean && ./gradlew bundleRelease




# menu sound
https://www.soundeffectsplus.com/product/menu-button-click-double-11/


# chipttt (using)
https://www.soundeffectsplus.com/product/menu-button-click-snap-08/

# images downloaded from 
https://uxwing.com/panda-icon/



# admob lot of error issues solution:
==================================
# replace below code in this path : \node_modules\react-native-admob\android\build.gradle 
apply plugin: 'com.android.library'

android {
    compileSdkVersion 27
    buildToolsVersion "27.0.3"

    defaultConfig {
        minSdkVersion 16
        targetSdkVersion 26
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation 'com.facebook.react:react-native:+'
    implementation 'com.google.android.gms:play-services-ads:16.0.0'
}