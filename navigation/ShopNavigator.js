import React from "react";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";

import Colors from "../constants/Colors";
import ProductsOverviewScreen, {
  screenOptions as productOverviewScreenOptions,
} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen, {
  screenOptions as productDetailScreenOptions,
} from "../screens/shop/ProductDetailsScreen";
import CartScreen, {
  screenOptions as cartScreenOptions,
} from "../screens/shop/CartScreen";
import OrdersScreen, {
  screenOptions as orderScreenOptions,
} from "../screens/shop/OrdersScreen";
import UserProductsScreen, {
  screenOptions as userProductScreenOptions,
} from "../screens/user/UserProductsScreen";
import EditProductScreen, {
  screenOptions as editProductScreenOptions,
} from "../screens/user/EditProductScreen";
import AuthScreen, {
  screenOptions as authScreenOptions,
} from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";

import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsStackNavigator = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={productOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailsScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

const OrdersStackNavigator = createStackNavigator();

const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={orderScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

const AdminStackNavigator = createStackNavigator();

const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={userProductScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1 }}>
            <SafeAreaView
              style={{ paddingTop: 40 }}
              forceInset={{ top: "always", horizontal: "never" }}
            >
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      screenOptions={{
        activeTintColor: Colors.primary,
        drawerActiveTintColor: Colors.primary,
        headerShown: false,
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-card" : "ios-card"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
