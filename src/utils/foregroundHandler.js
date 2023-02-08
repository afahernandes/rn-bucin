import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import PushNotification from "react-native-push-notification";

export default ForegroundHandler = () => {
  useEffect(() => {
    const unSubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("Foreground app notification: ", remoteMessage.notification);
      PushNotification.localNotification({
        channelId: "channelid",
        messageId: remoteMessage.messageId,
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        soundName: "sample.mp3",
        playSound: true,
      });
    });
    return unSubscribe;
  }, []);
  return null;
};
