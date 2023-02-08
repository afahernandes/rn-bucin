import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, StatusBar, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { AppRegistry } from "react-native";
import AppStack from "./src/navigators/Stack";

const App = () => {
  return (
    <PaperProvider>
      {/* <ForegroundHandler /> */}
      <StatusBar animated={true} translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.areaContainer}>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;

AppRegistry.registerComponent("app", () => HeadlessCheck);
const styles = StyleSheet.create({
  areaContainer: {
    flex: 1,
    backgroundColor: "transparent",
    paddingTop: Platform.OS === "android" ? 0 : 0,
  },
});
