import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/User/Dashboard";
import { Profile } from "../screens/Profile";
import { Onboarding } from "../screens/Onboarding";
import { UnderMaintenance } from "../screens/UnderMaintenance";
import { Login } from "../screens/Auth/Login";
import { ForgotPassword } from "../screens/Auth/ForgotPassword";
import { UpdateProfile } from "../screens/Profile/UpdateProfile";
import { UpdateAvatar } from "../screens/Profile/UpdateAvatar";
import { UpdatePass } from "../screens/Profile/UpdatePass";
import { Tentang } from "../screens/Profile/Tentang";
import Intro from "../screens/Onboarding/Intro";
import CustomTabBar from "../components/CustomTabBar";

//user

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const UserBottomStack = () => {
  return (
    <BottomTab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <BottomTab.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      <BottomTab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </BottomTab.Navigator>
  );
};

function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
      <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
      <Stack.Screen name="UnderMaintenance" component={UnderMaintenance} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Forgot" component={ForgotPassword} options={{ headerShown: false }} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ headerShown: false }} />
      <Stack.Screen name="UpdateAvatar" component={UpdateAvatar} options={{ headerShown: false }} />
      <Stack.Screen name="UpdatePass" component={UpdatePass} options={{ headerShown: false }} />
      <Stack.Screen name="Tentang" component={Tentang} options={{ headerShown: false }} />
      <Stack.Screen name="MainApp" component={UserBottomStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AppStack;
