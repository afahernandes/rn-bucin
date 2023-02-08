import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, TextInput, Image, StyleSheet, Alert } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import appTheme from "../../constants/colors";
import ImgBackground from "../../assets/bg.png";
import Gap from "../../components/Gap";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../../config/api";

export function UpdateProfile({ navigation, route }) {
  const { akun } = route.params;
  const [data, setData] = useState({
    email: akun.email,
    telepon: akun.no_hp,
    username: akun.username,
    isValidUsername: true,
    isValidEmail: true,
    isValidTelepon: true,
  });

  const textUsernameChange = (val) => {
    setData({
      ...data,
      username: val,
      isValidUsername: true,
    });
  };
  const textEmailChange = (val) => {
    setData({
      ...data,
      email: val,
      isValidEmail: true,
    });
  };
  const textTeleponChange = (val) => {
    setData({
      ...data,
      telepon: val,
      isValidTelepon: true,
    });
  };

  const validation = () => {
    if (data.username.trim().length <= 0) {
      setData({ ...data, isValidUsername: false });
    } else if (data.email.trim().length <= 0) {
      setData({ ...data, isValidEmail: false });
    } else if (data.telepon.trim().length <= 0) {
      setData({ ...data, isValidTelepon: false });
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
      fdata.append("username", data.username);
      fdata.append("email", data.email);
      fdata.append("telepon", data.telepon);

      const url = baseURL + "users/update";

      fetch(url, {
        method: "post",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: fdata,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          Alert.alert("Success !", "Sukses Update Akun...", [{ text: "OK", onPress: () => navigation.navigate("Dashboard") }]);
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
            <View>
              <Text style={styles.textTitle}>INFORMASI PENGGUNA</Text>
              <View style={styles.formGroup}>
                <Text style={styles.textLabel}>NAMA PENGGUNA</Text>
                <TextInput placeholder="Username" style={styles.textInputDisabled} value={akun.nama} editable={false} selectTextOnFocus={false} />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.textLabel}>NIP</Text>
                <TextInput style={styles.textInputDisabled} value={akun.nip} editable={false} selectTextOnFocus={false} />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.textLabel}>NIK</Text>
                <TextInput style={styles.textInputDisabled} value={akun.nik} editable={false} selectTextOnFocus={false} />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.textLabel}>TEMPAT / TGL LAHIR</Text>
                <TextInput style={styles.textInputDisabled} value={akun.tempat_lahir + "," + akun.tgl_lahir} editable={false} selectTextOnFocus={false} />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.textLabel}>ALAMAT DOMISILI</Text>
                <TextInput style={styles.textInputDisabled} value={akun.alamat_domisili} editable={false} selectTextOnFocus={false} />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.textLabel}>BIDANG</Text>
                <TextInput style={styles.textInputDisabled} value={akun.bidang} editable={false} selectTextOnFocus={false} />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.textLabel}>SUB BIDANG</Text>
                <TextInput style={styles.textInputDisabled} value={akun.unit_kerja} editable={false} selectTextOnFocus={false} />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.textLabel}>ROLE</Text>
                <TextInput style={styles.textInputDisabled} value={akun.role?.nama_role === "user" ? "User / Pengguna Aset" : akun.role?.nama_role} editable={false} selectTextOnFocus={false} />
              </View>
            </View>
          </View>

          <Gap height={5} />

          <View style={styles.content}>
            <Text style={styles.textTitle}>UPDATE AKUN PENGGUNA</Text>

            <View style={styles.formGroup}>
              <Text style={styles.textLabel}>USERNAME</Text>
              <TextInput placeholder="Username" style={styles.textInput} value={data.username} onChangeText={(val) => textUsernameChange(val)} />
              {data.isValidUsername ? null : (
                <View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>*Field tidak boleh kosong</Text>
                </View>
              )}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.textLabel}>EMAIL</Text>
              <TextInput placeholder="Email" textContentType="emailAddress" keyboardType="email-address" style={styles.textInput} value={data.email} onChangeText={(val) => textEmailChange(val)} />
              {data.isValidEmail ? null : (
                <View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>*Field tidak boleh kosong</Text>
                </View>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.textLabel}>Telepon</Text>
              <TextInput placeholder="Telepon" textContentType="telephoneNumber" keyboardType="number-pad" style={styles.textInput} value={data.telepon} onChangeText={(val) => textTeleponChange(val)} />
              {data.isValidTelepon ? null : (
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
                <Text style={styles.textButton}>Update Akun</Text>
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
