import React, { useState } from "react";
import { Alert, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImgBackground from "../../assets/bg.png";
import { baseURL, PublicUrl } from "../../config/api";
import appTheme from "../../constants/colors";

export function ForgotPassword({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    isValidEmail: true,
    check_textInputChange: false,
    isDisabled: true,
  });

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        isValidEmail: true,
        check_textInputChange: true,
        isDisabled: false,
      });
    } else {
      setData({
        ...data,
        email: val,
        isValidEmail: false,
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

  const handleValidEmail = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        isValidEmail: false,
      });
    }
  };

  const loginHandle = async () => {
    setIsLoading(true);
    let formData = new FormData();
    formData.append("email", data.email);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(baseURL + "auth/login", {
      method: "post",
      config,
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setIsLoading(false);
        // if (responseJson.status === true) {
        //   setIsLoading(false);
        //   const role = responseJson.data.role.nama_role;
        //   const token = responseJson.acces_token;

        //   AsyncStorage.setItem("auth", responseJson.data.id_user);
        //   AsyncStorage.setItem("nama", responseJson.data.nama);
        //   AsyncStorage.setItem("token", token);
        //   AsyncStorage.setItem("role", role);

        // } else {
        //   setIsLoading(false);
        //   Alert.alert("Gagal!", "email atau Password tidak sesuai.", [{ text: "Ok" }]);
        // }
      })
      .catch((err) => {
        setIsLoading(false);
        //  console.log(err);
        Alert.alert("Gagal!", "Error", [{ text: "Ok" }]);
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} persistentScrollbar={true} contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground source={ImgBackground} style={{ width: "100%", height: "100%" }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.shape}>
            <View style={styles.illustrationWrapper}>
              <Image source={{ uri: PublicUrl + "public/images/logo_aplikasi.png" }} style={styles.illustrationContent} />
            </View>
          </View>
          <View style={styles.bodyContent}>
            <Text style={styles.largeText}>Forgot Password </Text>
            <Text style={styles.smallText}>Halaman ini digunakan untuk reset password Akun. Silakan isikan alamat email Anda pada form di bawah ini, kami akan mengirimkan link reset password ke alamat email Anda</Text>

            <View style={styles.action}>
              <TextInput placeholder="email" textU style={styles.textInput} autoCapitalize="none" onChangeText={(val) => textInputChange(val)} onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)} />
              {data.check_textInputChange ? (
                <View animation="bounceIn">
                  <Ionicons name="checkmark-circle-outline" size={24} color="black" />
                </View>
              ) : null}
            </View>
            {data.isValidEmail ? null : (
              <View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>email Harus Lebih dari 4 karakter</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.loginBtnWrapper}
              onPress={() => {
                loginHandle();
              }}>
              <Text style={styles.loginBtnText}>SUBMIT</Text>
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
    paddingBottom: 40,
  },
  illustrationWrapper: { display: "flex", alignItems: "center" },
  illustrationContent: {
    height: 300,
    width: 250,
    resizeMode: "contain",
  },

  bodyContent: {
    marginHorizontal: 16,
    borderRadius: 3,
    backgroundColor: "#fff",
    padding: 20,
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
