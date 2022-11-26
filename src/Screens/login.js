import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import {
  IconButton,
  TextInput,
  Button as MaterialButton,
  Pressable,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import tw from "twrnc";
import { Button } from "react-native-paper";
import LoginSvg from "../../assets/loginSvg.svg";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground } from "react-native";
import BgImage from "../../assets/loginbg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { emptyErrors, login, resetData } from "../Actions/auth";
import { useEffect } from "react";
import Toast from "react-native-fast-toast";
import { useRef } from "react";

const LoginScreen = ({ navigation }) => {
  const errors = useSelector((state) => state.errors);
  const { isAuthenticated, user, loading } = useSelector((state) => state.data);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const dispatch = useDispatch();
  const toast = useRef(null);
  function onLogin() {
    dispatch(login(loginData.email, loginData.password));
  }

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      if (!errors.password && !errors.user) {
        toast.current.show("Connection problem. Please try again", {
          icon: <Icon name="alert-circle-outline" size={20} color="white" />,
          placement: "bottom",
          type: "danger",
          duration: 4000,
          style: { padding: 0 },
          textStyle: { padding: 0 },
        });
      }
      setTimeout(() => {
        dispatch(emptyErrors());
      }, 5000);
    }
  }, [user, errors]);
  useEffect(() => {
    if (isAuthenticated || user) {
      navigation.navigate("Home");
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  }, [isAuthenticated, user]);

  return (
    // <LinearGradient
    //   colors={["#e0e5f0"]}
    //   start={{ x: 0, y: 1 }}
    //   end={{ x: 1, y: 0 }}
    // >
    <ImageBackground
      source={require("../../assets/loginbg.jpg")}
      resizeMode="cover"
      blurRadius={90}
    >
      <Toast ref={toast} swipeEnabled={true} />
      <ScrollView
        className="w-full h-full bg-transparent"
        contentContainerStyle={tw.style("flex items-center justify-center")}
      >
        <StatusBar animated={true} backgroundColor="#403a4aff" />
        <LoginSvg />
        <View className="w-full flex items-center justify-center p-4">
          <Text
            style={tw.style("text-3xl font-extrabold text-center my-2", {
              color: "#4577a9",
            })}
          >
            Sign in
          </Text>
          <TextInput
            placeholder="Email ID"
            style={tw.style("w-4/5 my-2 rounded-lg")}
            inputContainerStyle={tw.style(
              errors.user && "border border-red-400"
            )}
            value={loginData.email}
            onChangeText={(e) =>
              setLoginData({
                ...loginData,
                email: e,
              })
            }
            leading={(props) => <Icon name="at" {...props} color="#4577a9" />}
            trailing={(props) => (
              <Icon
                name={
                  (errors.user || errors.password) && "alert-circle-outline"
                }
                {...props}
                color="#e43f3f"
              />
            )}
            variant="outlined"
            helperText={
              (errors.user || errors.password) && "Invalid email or password"
            }
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={secureTextEntry}
            style={tw.style("w-4/5 mb-2 rounded-xl")}
            inputContainerStyle={tw.style(
              (errors.user || errors.password) && "border border-red-400"
            )}
            value={loginData.password}
            onChangeText={(e) =>
              setLoginData({
                ...loginData,
                password: e,
              })
            }
            leading={(props) => (
              <Feather name="lock" {...props} color="#4577a9" />
            )}
            trailing={(props) => (
              <>
                {secureTextEntry ? (
                  <IconButton
                    icon={(props) => (
                      <Ionicons
                        name="ios-eye-outline"
                        {...props}
                        color="#4577a9"
                      />
                    )}
                    {...props}
                    onPress={() => setSecureTextEntry(false)}
                  />
                ) : (
                  <IconButton
                    icon={(props) => (
                      <Ionicons
                        name="ios-eye-off-outline"
                        {...props}
                        color="#4577a9"
                      />
                    )}
                    {...props}
                    onPress={() => setSecureTextEntry(true)}
                  />
                )}
              </>
            )}
            variant="outlined"
          />
          <Pressable
            style={tw.style("mb-4 w-4/5 px-2")}
            onPress={() => navigation.navigate("Home")}
          >
            <Text
              style={tw.style("text-base text-right", {
                color: "#4577a9",
              })}
            >
              Forgot Password?
            </Text>
          </Pressable>
          <Button
            mode="contained"
            style={tw.style("w-4/5 mt-2 h-12 rounded-xl")}
            contentStyle={tw.style("h-full")}
            color="#4577a9"
            labelStyle={tw.style("text-lg")}
            onPress={onLogin}
            uppercase={false}
            loading={loading}
            disabled={!loginData.email || !loginData.password}
          >
            Sign in
          </Button>
          <Button
            mode="contained"
            style={tw.style("w-4/5 mt-2 h-12 rounded-xl")}
            contentStyle={tw.style("h-full")}
            color="#4577a9"
            labelStyle={tw.style("text-lg")}
            onPress={() => dispatch(resetData)}
            // onPress={() => navigation.navigate("Home")}
            uppercase={false}
          >
            Reset
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
    // </LinearGradient>
  );
};

export default LoginScreen;
