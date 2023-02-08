import React, { useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image, ImageBackground, Dimensions, StatusBar, useWindowDimensions } from "react-native";
import ImgBackground from "../../assets/bg.png";
import styles from "./onboardingStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PublicUrl, ResourceUrl } from "../../config/api";
import appTheme from "../../constants/colors";
import { ProgressBar } from "react-native-paper";
import Gap from "../../components/Gap";
export function Onboarding({ navigation }) {
  const cekData = async () => {
    const userToken = await AsyncStorage.getItem("auth");

    if (userToken) {
      return navigation.navigate("MainApp");
    } else {
      return navigation.navigate("Intro");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      cekData();
    }, 5000);
  }, [navigation]);

  const { width, height } = Dimensions.get("screen");
  return (
    <ImageBackground source={ImgBackground} style={{ width, height, zIndex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Image source={{ uri: PublicUrl + "public/images/logo_aplikasi.png" }} style={styles.illustrationContent2} />
        <Gap height={50} />
        <ProgressBar progress={0.5} color="white" style={{ height: 5, width: undefined }} />
      </SafeAreaView>
    </ImageBackground>
  );
}
