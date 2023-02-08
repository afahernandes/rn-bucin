import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log("Authorization status:", authStatus);
    await GetFCMToken();
  }
}

const GetFCMToken = async () => {
  const fcmtoken = JSON.stringify(await messaging().getToken());
  await AsyncStorage.setItem("fcmtoken", fcmtoken);
  console.log("Unsaved Token" + fcmtoken);

  //   try {
  //     let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  //     if (fcmtoken !== null) {
  //       console.log('Saved token: ');
  //       console.log(fcmtoken);
  //     } else {
  //       try {
  //         console.log(messaging().getToken());
  //         fcmtoken = JSON.stringify(await messaging().getToken());
  //         await AsyncStorage.setItem('fcmtoken', fcmtoken);
  //         console.log('Unsaved Token' + fcmtoken);
  //       } catch (e) {
  //         console.log('token could not be saved to storage');
  //       }
  //     }
  //   } catch (error) {
  //     console.log('Could not get token from storage');
  //   }
};

export const NotificationListener = () => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log("Notification caused app to open from background state:", remoteMessage.notification);
  });

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log("Notification caused app to open from quit state:", remoteMessage.notification);
      }
    });
};
