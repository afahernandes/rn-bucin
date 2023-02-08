import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, TextInput, ImageBackground, Image, ScrollView, PermissionsAndroid, Alert, BackHandler } from "react-native";
import ImgBackground from "../../assets/bg.png";
import Ionicons from "react-native-vector-icons/Ionicons";
import { baseURL, PublicUrl } from "../../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import appTheme from "../../constants/colors";
import { useFocusEffect } from "@react-navigation/native";
import { ImgIllustration } from "../../assets";

export function Login({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
    fcmToken: "",
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    check_textInputChange: false,
    isDisabled: true,
  });

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.CAMERA], {
        title: "SIMANSET Permission",
        message: "SIMANSET needs access to your storage for pick file to upload.",
      });

      if (granted["android.permission.WRITE_EXTERNAL_STORAGE"] === "granted" && granted["android.permission.READ_EXTERNAL_STORAGE"] === "granted" && granted["android.permission.CAMERA"] === "granted") {
        console.log("Permission accepted");
      } else {
        console.log("Read storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        isValidUser: true,
        check_textInputChange: true,
        isDisabled: false,
      });
    } else {
      setData({
        ...data,
        username: val,
        isValidUser: false,
        check_textInputChange: false,
        isDisabled: true,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
        isDisabled: false,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
        isDisabled: true,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = async () => {
    // setIsLoading(true);
    // let formData = new FormData();
    // formData.append("username", data.username);
    // formData.append("password", data.password);
    // formData.append("device_os", data.fcmToken);
    // formData.append("device_id", data.fcmToken);
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // fetch(baseURL + "auth/login", {
    //   method: "post",
    //   config,
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     setIsLoading(false);
    //     if (responseJson.status === true) {
    //       setIsLoading(false);
    //       const role = responseJson.data.role.nama_role;
    //       const token = responseJson.acces_token;

    //       AsyncStorage.setItem("auth", responseJson.data.id_user);
    //       AsyncStorage.setItem("nama", responseJson.data.nama);
    //       AsyncStorage.setItem("token", token);
    //       AsyncStorage.setItem("role", role);

    //       switch (role) {
    //         case "user":
    //           return navigation.navigate("MainApp");
    //         default:
    //           return Alert.alert("Gagal!", "Pengguna Tidak Valid.", [{ text: "Ok" }]);
    //       }
    //     } else {
    //       setIsLoading(false);
    //       Alert.alert("Gagal!", "Username atau Password tidak sesuai.", [{ text: "Ok" }]);
    //     }
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //     Alert.alert("Gagal!", "Error", [{ text: "Ok" }]);
    //   });
    navigation.navigate("MainApp");
  };

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to Exit ?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
      };
    }, [])
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} persistentScrollbar={true} contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground source={ImgBackground} style={{ width: "100%", height: "100%" }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.illustrationWrapper}>
            <Image source={ImgIllustration} style={styles.illustrationContent} resizeMode="stretch" />
            {/* <Image source={{ uri: PublicUrl + "public/velzone/images/logo-light.png" }} style={styles.illustrationContent} /> */}
          </View>
          <View style={styles.bodyContent}>
            <Text style={styles.largeText}>Login Form</Text>
            <Text style={styles.smallText}>Please Login to Continue</Text>

            <View style={styles.action}>
              <TextInput placeholder="Username" style={styles.textInput} autoCapitalize="none" onChangeText={(val) => textInputChange(val)} onEndEditing={(e) => handleValidUser(e.nativeEvent.text)} />
              {data.check_textInputChange ? (
                <View animation="bounceIn">
                  <Ionicons name="checkmark-circle-outline" size={24} color="black" />
                </View>
              ) : null}
            </View>
            {data.isValidUser ? null : (
              <View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Username Harus Lebih dari 4 karakter</Text>
              </View>
            )}

            <View style={styles.action}>
              <TextInput placeholder="Password" secureTextEntry={data.secureTextEntry ? true : false} style={styles.textInput} autoCapitalize="none" onChangeText={(val) => handlePasswordChange(val)} />
              <TouchableOpacity onPress={updateSecureTextEntry}>{data.secureTextEntry ? <Ionicons name="eye-off" color="#0B0063" size={24} /> : <Ionicons name="eye" color="#0B0063" size={24} />}</TouchableOpacity>
            </View>
            {data.isValidPassword ? null : (
              <View>
                <Text style={styles.errorMsg}>Password Harus Lebih dari 4 karakter</Text>
              </View>
            )}

            <TouchableOpacity style={{ marginTop: 10, alignItems: "flex-end" }} onPress={() => navigation.navigate("Forgot")}>
              <Text style={{ fontFamily: "Ubuntu-Bold", color: "#000", fontSize: 15 }}>Forgot Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginBtnWrapper}
              onPress={() => {
                loginHandle();
              }}>
              <Text style={styles.loginBtnText}>SIGNIN</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  illustrationWrapper: { display: "flex", alignItems: "center" },
  illustrationContent: {
    height: 400,
    width: "100%",
    resizeMode: "contain",
  },

  bodyContent: {
    marginHorizontal: 16,
    borderRadius: 3,
    backgroundColor: "#fff",
    padding: 10,
  },
  largeText: {
    color: appTheme.PRIMARY_COLOR,
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    marginBottom: 5,
  },
  smallText: {
    fontSize: 16,
    color: appTheme.BLACK,
    fontFamily: "Roboto-Regular",
    marginBottom: 20,
  },

  loginBtnWrapper: {
    backgroundColor: appTheme.PRIMARY_COLOR,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    marginTop: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  loginBtnText: { fontWeight: "bold", fontSize: 16, color: "#fff" },

  action: {
    marginVertical: 5,
    height: 45,
    paddingHorizontal: 2,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 3,
    borderColor: appTheme.BLACK,
    borderWidth: 1,
  },

  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontFamily: "Roboto-Regular",
    fontSize: 14,
  },

  viewcheck: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
