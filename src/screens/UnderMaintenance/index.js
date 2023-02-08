import React from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity } from "react-native";
import ImgBackground from "../../assets/bg.png";
import Img1 from "../../assets/icon/presentation.png";
import CustomHeader from "../../components/CustomHeader";
import styles from "./underMaintenanceStyle";
import appTheme from "../../constants/colors";

export function UnderMaintenance({ navigation }) {
  const handleClose = () => {
    navigation.goBack();
  };
  return (
    <ImageBackground source={ImgBackground} style={[styles.container, { width: "100%", height: "100%" }]}>
      <CustomHeader name="Under Maintenance" navigation={navigation} />
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            marginBottom: "15%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.textTitle}>Upps! Sorry...</Text>
          <Text style={styles.textSubTitle}>This page is under maintenance</Text>
          <View style={styles.containerbottom}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: appTheme.DEFAULT }]}
              onPress={() => {
                handleClose();
              }}
            >
              <Text style={styles.textButton}>Back To Main Page</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
