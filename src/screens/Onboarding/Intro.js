import { Dimensions, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ImgBackground from "../../assets/bg.png";
import ImageIntro from "../../assets/illustration.png";
import LinearGradient from "react-native-linear-gradient";
import GradientButton from "../../components/GradientButton";

const { width, height } = Dimensions.get("screen");
const Intro = ({ navigation }) => {
  return (
    <ImageBackground source={ImgBackground} style={{ width, height, zIndex: 1 }}>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.header}>
          <Image source={ImageIntro} style={styles.logo} resizeMode="stretch" />
        </View>
        <View style={styles.footer} animation="fadeInUpBig">
          <Text style={styles.textStyle1}>BUCIN</Text>
          <Text style={styles.textStyle2}>To support functional ease of use in tire inspection</Text>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.buttonStart}>
              <GradientButton name="SIGN IN" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Intro;
const height_logo = height * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Poppins-Regular",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },

  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 15,
  },

  textStyle1: {
    color: "#fff",
    fontSize: 48,
    marginHorizontal: 16,
    textAlign: "left",
    marginBottom: 12,
    fontFamily: "Poppins-Bold",
  },
  textStyle2: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 20,
    fontFamily: "Poppins-Regular",
    marginBottom: 20,
  },
  buttonStart: {
    width: "100%",
  },
});
