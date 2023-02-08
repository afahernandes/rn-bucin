import React from "react";
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity } from "react-native";
import ImgBackground from "../../assets/bg.png";
import CustomHeader from "../../components/CustomHeader";
import appTheme from "../../constants/colors";

export function Tentang({ navigation }) {
  const handleClose = () => {
    navigation.goBack();
  };
  return (
    <ImageBackground source={ImgBackground} style={[styles.container, { width: "100%", height: "100%" }]}>
      <CustomHeader name="TENTANG APLIKASI" navigation={navigation} />
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            marginBottom: "15%",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Text style={styles.textTitle}>SIMANSET</Text>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              textAlign: "center",
              color: appTheme.BLACK,
              marginBottom: 5,
            }}>
            SISTEM INFORMASI MANAGEMENT ASSET
          </Text>
          <Text style={{ fontFamily: "Roboto-Regular", textAlign: "center", color: appTheme.BLACK, marginBottom: 20 }}>Version 1.0.1</Text>
          <View style={styles.containerbottom}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: appTheme.DEFAULT }]}
              onPress={() => {
                handleClose();
              }}>
              <Text style={styles.textButton}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 19,
  },
  projectsBody: {
    flex: 1,
    backgroundColor: appTheme.BACKGROUND,
  },

  rowJustifyBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  textTitle: {
    fontSize: 24,
    fontFamily: "Roboto-Bold",
    marginBottom: 5,
    marginTop: 20,
    color: appTheme.DEFAULT,
  },
  textStatus: {
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    color: appTheme.DEFAULT,
  },
  textSubTitle: {
    fontSize: 14,
    fontFamily: "Roboto-Bold",
    marginBottom: 3,
    color: appTheme.BLACK,
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  textButton: {
    color: appTheme.WHITE,
    fontFamily: "Roboto-Bold",
  },
  containerbottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
