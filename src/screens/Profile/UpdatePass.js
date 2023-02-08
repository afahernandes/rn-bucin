import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, TextInput, Image, StyleSheet, Alert } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import appTheme from "../../constants/colors";
import ImgBackground from "../../assets/bg.png";
import Gap from "../../components/Gap";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../../config/api";

export function UpdatePass({ navigation, route }) {
  const { akun } = route.params;
  const [data, setData] = useState({
    password_lama: "",
    password_baru: "",
    konfirmasi_password: "",
    isValidOld: true,
    isValidNew: true,
    isValidConfirm: true,
    secureTextEntry: true,
  });

  const textOldChange = (val) => {
    setData({
      ...data,
      password_lama: val,
      isValidOld: true,
    });
  };
  const textNewChange = (val) => {
    setData({
      ...data,
      password_baru: val,
      isValidNew: true,
    });
  };

  const textConfirmChange = (val) => {
    setData({
      ...data,
      konfirmasi_password: val,
      isValidConfirm: true,
    });
  };

  const validation = () => {
    if (data.password_lama.trim().length <= 0) {
      setData({ ...data, isValidOld: false });
    } else if (data.password_baru.trim().length <= 0) {
      setData({ ...data, isValidNew: false });
    } else if (data.konfirmasi_password.trim().length <= 0) {
      setData({ ...data, isValidConfirm: false });
    } else if (data.konfirmasi_password != data.password_baru) {
      Alert.alert("Gagal !", "Konfirmasi Password Tidak sesuai", [{ text: "OK" }]);
    } else {
      return true;
    }
    return false;
  };
  const handleSave = async () => {
    const validate = validation();
    if (validate) {
      const token = await AsyncStorage.getItem("token");
      const id_user = await AsyncStorage.getItem("auth");
      const fdata = new FormData();
      fdata.append("id_user", id_user);
      fdata.append("old_password", data.password_lama);
      fdata.append("new_password", data.password_baru);

      const url = baseURL + "users/updatePassword";

      fetch(url, {
        method: "post",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: fdata,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === false) {
            Alert.alert("Failed !", responseJson.message, [{ text: "OK" }]);
          } else {
            Alert.alert("Success !", "Sukses Update Password...", [{ text: "OK", onPress: () => navigation.navigate("Dashboard") }]);
          }
        })
        .catch((err) => {
          console.log(err);
          Alert.alert("Failed !", "Gagal...", [{ text: "OK" }]);
        });
    }
  };
  const handleClose = () => {
    navigation.goBack();
  };
  return (
    <ImageBackground source={ImgBackground} style={[styles.container, { width: "100%", height: "100%" }]}>
      <CustomHeader name="Update Profile" navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false} persistentScrollbar={true} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.body}>
          <View style={styles.content}>
            <Text style={styles.textTitle}>UPDATE PASSWORD</Text>

            <View style={styles.formGroup}>
              <Text style={styles.textLabel}>PASSWORD LAMA</Text>
              <TextInput placeholder="password_lama" secureTextEntry={data.secureTextEntry ? true : false} style={styles.textInput} autoCapitalize="none" textContentType="password" value={data.password_lama} onChangeText={(val) => textOldChange(val)} />
              {data.isValidOld ? null : (
                <View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>*Field tidak boleh kosong</Text>
                </View>
              )}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.textLabel}>PASSWORD BARU</Text>
              <TextInput placeholder="password baru" textContentType="password" secureTextEntry={data.secureTextEntry ? true : false} style={styles.textInput} autoCapitalize="none" value={data.password_baru} onChangeText={(val) => textNewChange(val)} />
              {data.isValidNew ? null : (
                <View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>*Field tidak boleh kosong</Text>
                </View>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.textLabel}>KONFIRMASI PASSWORD</Text>
              <TextInput placeholder="konfirmasi password" textContentType="password" secureTextEntry={data.secureTextEntry ? true : false} style={styles.textInput} autoCapitalize="none" value={data.konfirmasi_password} onChangeText={(val) => textConfirmChange(val)} />
              {data.isValidConfirm ? null : (
                <View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>*Field tidak boleh kosong</Text>
                </View>
              )}
            </View>
          </View>

          <Gap height={5} />

          <View style={styles.content}>
            <View style={styles.containerbottom}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: appTheme.RED }]}
                onPress={() => {
                  handleClose();
                }}>
                <Text style={styles.textButton}>Kembali</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: appTheme.DEFAULT }]}
                onPress={() => {
                  handleSave();
                }}>
                <Text style={styles.textButton}>Update Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },

  body: {
    flex: 1,
    backgroundColor: appTheme.WHITE,
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

  content: {
    padding: 16,
    display: "flex",
    borderRadius: 7,
  },
  containerx: {
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "space-between",
  },
  textTitle: {
    fontSize: 16,
    fontFamily: "Roboto-Bold",
    marginBottom: 5,
    color: appTheme.DEFAULT,
  },

  textLabel: {
    fontFamily: "Roboto-Bold",
    color: appTheme.BLACK,
  },
  textDescription: {
    fontFamily: "Roboto-Regular",
    color: appTheme.BLACK,
    width: "60%",
    textAlign: "right",
  },

  formGroup: {
    marginVertical: 5,
  },

  textInput: {
    marginTop: 5,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    borderRadius: 3,
    color: appTheme.BLACK,
    borderColor: appTheme.PRIMARY_COLOR,
    borderWidth: 1,
  },

  textInputDisabled: {
    marginTop: 5,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    borderRadius: 3,
    color: appTheme.BLACK,
    borderColor: appTheme.PRIMARY_COLOR,
    backgroundColor: "#eee",
    borderWidth: 1,
  },
  textArea: {
    flexDirection: "row",
    borderRadius: 3,
    padding: 5,
    color: appTheme.BLACK,
    borderColor: appTheme.PRIMARY_COLOR,
    borderWidth: 1,
    textAlignVertical: "top",
  },

  errorMsg: {
    color: "#FF0000",
    fontFamily: "Roboto-Regular",
    fontSize: 14,
  },
  buttonCamera: {
    borderRadius: 5,
    backgroundColor: appTheme.DEFAULT,
  },
  button: {
    height: 40,
    width: "48%",
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
