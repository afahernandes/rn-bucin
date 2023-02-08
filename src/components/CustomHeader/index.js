import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const CustomHeader = (props) => {
  const navigation = useNavigation();
  const [icon, setIcon] = useState("arrow-left");
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View>
      <Appbar.Header style={styles.app_container}>
        <Appbar.Action iconColor="white" icon={"arrow-left"} onPress={handleBack} />
        <Appbar.Content title={<Text style={{ color: "#fff", fontWeight: "bold" }}>{props?.name}</Text>} />
      </Appbar.Header>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  app_container: {
    backgroundColor: "transparent",
    marginTop: 16,
  },
});
