import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, TextInput, Image, StyleSheet, Alert } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import appTheme from "../../constants/colors";
import ImgBackground from "../../assets/bg.png";
import { IconButton } from "react-native-paper";
import { launchImageLibrary } from "react-native-image-picker"; // Migration from 2.x.x to 3.x.x => showImagePicker API is removed.
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL, PublicUrl } from "../../config/api";

export function UpdateAvatar({ navigation, route }) {
  const { akun } = route.params;
  const [chooseFile, setChooseFile] = useState({});
  const [data, setData] = useState({
    avatar: "",
    isValidImage: true,
  });

  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchImageLibrary(options, (res) => {
      //console.log('Response = ', res);
      if (res.didCancel) {
        console.log("User cancelled image picker");
      } else if (res.error) {
        console.log("ImagePicker Error: ", res.error);
      } else if (res.customButton) {
        console.log("User tapped custom button: ", res.customButton);
        alert(res.customButton);
      } else {
        const result = res.assets[0];
        setChooseFile({
          ...chooseFile,
          fileName: result.fileName,
          fileType: result.type,
          fileUri: result.uri,
        });
        setData({ ...data, isValidImage: true });
      }
    });
  };

  const validation = () => {
    if (!chooseFile.fileUri) {
      setData({ ...data, isValidImage: false });
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
      fdata.append("avatar", {
        uri: chooseFile.fileUri,
        type: chooseFile.fileType,
        name: chooseFile.fileName,
      });
      const url = baseURL + "users/updateAvatar";

      fetch(url, {
        method: "post",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: fdata,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          Alert.alert("Success !", "Success Update Avatar...", [{ text: "OK", onPress: () => navigation.goBack() }]);
        })
        .catch((err) => {
          console.log(err);
          Alert.alert("Failed !", "Failed...", [{ text: "OK" }]);
        });
    }
  };
  const handleClose = () => {
    navigation.goBack();
  };
  return (
    <ImageBackground source={ImgBackground} style={[styles.container, { width: "100%", height: "100%" }]}>
      <CustomHeader name="Update Avatar" navigation={navigation} />
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            marginBottom: "15%",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <View style={styles.content}>
            <Text style={styles.textLabel}>UPLOAD FOTO</Text>
            <View style={styles.textInput}>
              {chooseFile.fileUri ? (
                <Image
                  style={styles.profilePhoto}
                  source={{
                    uri: chooseFile.fileUri,
                  }}
                />
              ) : (
                <Image style={styles.profilePhoto} source={{ uri: PublicUrl + "public/images/user/" + akun.avatar }} />
              )}
            </View>
            <View style={{ alignItems: "flex-end", marginTop: -50 }}>
              <IconButton
                icon="camera"
                iconColor="#fff"
                style={styles.buttonCamera}
                onPress={() => {
                  cameraLaunch();
                }}></IconButton>
            </View>
          </View>
          <View style={styles.containerbottom}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: appTheme.DEFAULT }]}
              onPress={() => {
                handleSave();
              }}>
              <Text style={styles.textButton}>Update Avatar</Text>
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
  content: {
    padding: 16,
    display: "flex",
    borderRadius: 7,
  },
  buttonCamera: {
    borderRadius: 5,
    backgroundColor: appTheme.PRIMARY_COLOR,
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
  textLabel: {
    fontFamily: "Roboto-Bold",
    color: appTheme.BLACK,
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
  profilePhoto: {
    height: 150,
    width: 150,
    borderRadius: 50,
    marginBottom: 5,
  },
});

export default styles;
