import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import appTheme from "../../constants/colors";
import { combineData } from "../../utils/DataHelper";
function CustomTabBar(props) {
  const [data, setData] = useState({ activeNavTab: "Dashboard" });

  const handleNavigation = (route) => {
    setData(combineData(data, { activeNavTab: route }));
    props?.navigation.navigate(route);
  };

  const getColor = (title) => {
    let color;
    if (title === data?.activeNavTab) {
      color = appTheme.HEADER;
    } else {
      color = appTheme.PRIMARY_COLOR;
    }
    return color;
  };

  return (
    <View style={styles.menuWrapper}>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => handleNavigation("Dashboard")}>
          <MaterialIcons name="home" size={26} color={getColor("Dashboard")} />
          <Text style={{ color: getColor("Dashboard") }}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => handleNavigation("Assets")}>
          <MaterialIcons name="archive" size={24} color={getColor("Assets")} />
          <Text style={{ color: getColor("Assets") }}>Aset</Text>
        </TouchableOpacity>
        {/* 
        <TouchableOpacity style={styles.plusBtnContainer} onPress={() => handleNavigation("Scanner")}>
          <MaterialCommunityIcons name="qrcode" size={50} color="#fff" />
        </TouchableOpacity> */}
        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => handleNavigation("Notifikasi")}>
          <MaterialIcons name="notifications" size={24} color={getColor("Activities")} />
          <Text style={{ color: getColor("Activities") }}>Notifikasi</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => handleNavigation("Profile")}>
          <MaterialCommunityIcons name="account" size={24} color={getColor("Profile")} />
          <Text style={{ color: getColor("Profile") }}>Akun</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  menuWrapper: {
    backgroundColor: "transparent",
  },
  menuContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: "#000000",
    elevation: 4,

    padding: 5,
    paddingHorizontal: 24,
    // borderTopStartRadius: 10,
    // borderTopEndRadius: 10,
  },
  // plusBtnContainer: {
  //   backgroundColor: appTheme.HEADER,
  //   height: 70,
  //   width: 70,
  //   position: "absolute",
  //   bottom: 5,
  //   left: "45%",
  //   marginLeft: "auto",
  //   marginRight: "auto",
  //   zIndex: 1,
  //   borderRadius: 50,
  //   display: "flex",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   shadowColor: "#000000",
  //   elevation: 2,
  // },
});

export default CustomTabBar;
