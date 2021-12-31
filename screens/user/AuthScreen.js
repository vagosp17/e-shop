import React, { useCallback, useReducer, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";
import { useDispatch } from "react-redux";

import * as authActions from "../../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occured!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const submitHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      if (isLogin) {
        await dispatch(
          authActions.login(
            formState.inputValues.email,
            formState.inputValues.password
          )
        );
      } else {
        await dispatch(
          authActions.signup(
            formState.inputValues.email,
            formState.inputValues.password
          )
        );
      }
      props.navigation.navigate("Shop");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      style={styles.screen}
    >
      <LinearGradient colors={["#fcfcfc", "#f2f2f2"]} style={styles.gradient}>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            Welcome!! Please login or Sign Up.
          </Text>
        </View>
        <View style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            {isLoading ? (
              <ActivityIndicator
                size="large"
                color={Colors.primary}
                style={styles.loading}
              />
            ) : (
              <View>
                <View style={styles.buttonContainer}>
                  <Button
                    title={isLogin ? "Login" : "Sign up"}
                    color={Colors.primary}
                    onPress={submitHandler}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <Button
                    title={isLogin ? "Switch to Sign up" : "Switch to Login"}
                    color={Colors.accent}
                    onPress={() => setIsLogin((prevValue) => !prevValue)}
                  />
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerShown: false,
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    marginVertical: 25,
    width: "70%",
  },
  messageText: {
    fontSize: 20,
    fontFamily: "open-sans-bold",
    textAlign: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    padding: 20,
    maxHeight: 400,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  buttonContainer: {
    marginTop: 10,
  },
  loading: {
    marginTop: 10,
  },
});
