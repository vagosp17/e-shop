import React from "react";
import { StyleSheet } from "react-native";

import { useSelector } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";

import { ShopNavigator, AuthNavigator } from "./ShopNavigator";
import StartupScreen from "../screens/StartupScreen";

const AppNavigator = () => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
