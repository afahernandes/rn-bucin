import appTheme from "../../constants/colors";
import React from "react";
import { StyleSheet, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const GradientButton = ({ name }) => (
  <LinearGradient colors={["#fc4a1a", "#FF914D"]} style={styles.gradient}>
    <Text style={styles.textSign}>{name}</Text>
  </LinearGradient>
);

export default GradientButton;
const styles = StyleSheet.create({
  gradient: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#CCCCCC",
  },

  textSign: {
    fontSize: 18,
    color: "#000",
    fontFamily: "Poppins-Bold",
  },
});
