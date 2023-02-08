import React, { useContext, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, ImageBackground, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import appTheme from "../../constants/colors";
import ImgBackground from "../../assets/bg.png";
import CustomHeader from "../../components/CustomHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL, PublicUrl } from "../../config/api";
import { RefreshControl } from "react-native-gesture-handler";

export function Profile({ navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      getData();
    });
    return focusHandler;
  }, [navigation]);

  const getData = async () => {
    setIsLoading(true);
    const Autorization = await AsyncStorage.getItem("token");
    const kd_user = await AsyncStorage.getItem("auth");

    const url = baseURL + "users/profile/" + kd_user;

    try {
      await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + Autorization,
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          setIsLoading(false);

          if (responseData.status == true) {
            setData(responseData.data);
          } else {
            setData([]);
          }
        })
        .catch((err) => {});
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handlePress = () => {
    navigation.navigate("UnderMaintenance");
  };

  const handleUpdateProfile = () => {
    navigation.navigate("UpdateProfile", { akun: data });
  };

  const UpdateAvatar = () => {
    navigation.navigate("UpdateAvatar", { akun: data });
  };
  const handleUpdatePassword = () => {
    navigation.navigate("UpdatePass", { akun: data });
  };

  const handleTentang = () => {
    navigation.navigate("Tentang", { akun: data });
  };

  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl colors={["#9Bd35A", "#689F38"]} refreshing={isLoading} onRefresh={getData} />}>
        <View>
          <ImageBackground source={ImgBackground} style={styles.imgBgs} imageStyle={styles.imgBg}>
            <CustomHeader name="Akun" navigation={navigation} />

            <View style={[styles.profileDetailsSection, { marginHorizontal: 16 }]}>
              <View style={styles.profileInfoSection}>
                <View style={[styles.statisticsContainer, { marginRight: 10 }]}>
                  <Image style={styles.profilePhoto} source={{ uri: PublicUrl + "public/images/user/" + data.avatar }} />
                </View>
                <View style={styles.statisticsContainer2}>
                  <View style={styles.blockStyle}>
                    <Text style={styles.statisticsText}>Email</Text>
                    <Text style={styles.statisticsTitle}>{data.email}</Text>
                  </View>
                  <View style={styles.blockStyle}>
                    <Text style={styles.statisticsText}>Telepon</Text>
                    <Text style={styles.statisticsTitle}>{data.no_hp}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.nameText}>{data.nama}</Text>
              <Text style={styles.designationText}>{data.role?.nama_role === "user" ? "Pengguna Aset" : data.role?.judul_role}</Text>
            </View>
          </ImageBackground>
          <View style={styles.exploreSection}>
            <Text style={styles.exploreHeader}>KELOLA AKUN</Text>
            <View>
              <TouchableOpacity onPress={() => handleUpdateProfile()}>
                <View style={styles.buttonMenu}>
                  <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons name="account" color={appTheme.PRIMARY_COLOR} size={20} />
                    <Text style={styles.textMenu}>Update Profile</Text>
                  </View>
                  <MaterialCommunityIcons name="arrow-right" color={appTheme.BLACK} size={12} style={{ marginTop: 5 }} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleUpdatePassword()}>
                <View style={styles.buttonMenu}>
                  <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons name="lock" color={appTheme.PRIMARY_COLOR} size={20} />
                    <Text style={styles.textMenu}>Ubah Password</Text>
                  </View>
                  <MaterialCommunityIcons name="arrow-right" color={appTheme.BLACK} size={12} style={{ marginTop: 5 }} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => UpdateAvatar()}>
                <View style={styles.buttonMenu}>
                  <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons name="face-recognition" color={appTheme.PRIMARY_COLOR} size={20} />
                    <Text style={styles.textMenu}>Update Avatar</Text>
                  </View>
                  <MaterialCommunityIcons name="arrow-right" color={appTheme.BLACK} size={12} style={{ marginTop: 5 }} />
                </View>
              </TouchableOpacity>
              <Text style={styles.exploreHeader}>UMUM</Text>

              <TouchableOpacity onPress={() => handleTentang()}>
                <View style={styles.buttonMenu}>
                  <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons name="information" color={appTheme.PRIMARY_COLOR} size={20} />
                    <Text style={styles.textMenu}>Tentang Aplikasi</Text>
                  </View>
                  <MaterialCommunityIcons name="arrow-right" color={appTheme.BLACK} size={12} style={{ marginTop: 5 }} />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  textAlign: "center",
                  color: appTheme.BLACK,
                  marginBottom: 5,
                }}>
                SISTEM MANAGEMENT ASSET
              </Text>
              <Text style={{ color: appTheme.BLACK, fontFamily: "Roboto-Regular", textAlign: "center" }}>Version 1.0.5</Text>
            </View>
            <View style={{ alignItems: "center", marginTop: 10, marginBottom: 15 }}>
              <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
                <Text style={styles.textButton}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },

  profileDetailsSection: {
    paddingHorizontal: 16,
  },
  imgBg: {
    borderBottomLeftRadius: 40,
    height: "100%",
    width: "100%",
  },
  imgBgs: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
  },
  profileInfoSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  profilePhoto: {
    height: 80,
    width: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  blockStyle: {
    width: "100%",
    padding: 5,
    borderColor: appTheme.WHITE,
  },
  statisticsContainer: {
    display: "flex",
    width: "25%",
  },
  statisticsContainer2: {
    display: "flex",
    width: "75%",
  },
  statisticsText: {
    color: appTheme.INFO,
    fontSize: 14,
    fontWeight: "bold",
  },
  statisticsTitle: {
    fontSize: 14,
    color: appTheme.WHITE,
  },
  profileCenterSection: {
    display: "flex",
    alignItems: "center",
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
    color: appTheme.WHITE,
  },
  designationText: {
    fontSize: 16,
    color: appTheme.BLACK,
    marginBottom: 20,
    color: appTheme.WHITE,
  },
  editProfileWrapper: {
    backgroundColor: appTheme.PRIMARY_COLOR,
    paddingHorizontal: 25,
    borderRadius: 5,
    paddingVertical: 10,
  },
  editProfileText: {
    color: "#fff",
  },
  exploreSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  exploreHeader: {
    color: appTheme.PRIMARY_COLOR,
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },
  exploreContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  singleExplore: {
    height: 80,
    width: "28%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    backgroundColor: "#fff",
    margin: 1,
    marginBottom: 20,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  exploreText: {
    fontWeight: "bold",
    fontSize: 14,
    color: appTheme.PRIMARY_COLOR,
  },
  buttonMenu: {
    padding: 15,
    backgroundColor: "#FFF",
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 2,
  },

  textMenu: {
    color: appTheme.BLACK,
    marginTop: 3,
    marginLeft: 10,
  },
  button: {
    backgroundColor: appTheme.PRIMARY_COLOR,
    height: 40,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  textButton: {
    color: appTheme.WHITE,
    fontFamily: "Roboto-Bold",
  },
});
