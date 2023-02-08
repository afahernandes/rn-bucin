import { StyleSheet } from "react-native";
import appTheme from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  illustrationWrapper: { display: "flex", alignItems: "center" },

  illustrationContent2: {
    width: "100%",
    height: 50,
    resizeMode: "contain",
  },
  largeText: {
    marginTop: 20,
    color: appTheme.WHITE,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
  },
  smallText: {
    color: appTheme.WHITE,
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: "500",
    marginBottom: 20,
  },

  footer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  loginBtnWrapper: {
    backgroundColor: appTheme.PRIMARY_COLOR,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    borderRadius: 7,
  },
  loginBtnText: { fontWeight: "bold", fontSize: 16, color: "#fff" },
});

export default styles;
