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

const LoginScreen = ({ navigation }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
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
            style={tw.style("w-4/5 my-2 rounded-lg", {
              borderRadius: 20,
            })}
            leading={(props) => <Icon name="at" {...props} color="#4577a9" />}
            variant="outlined"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={secureTextEntry}
            style={tw.style("w-4/5 mb-2 rounded-xl")}
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
            onPress={() => navigation.navigate("Home")}
            uppercase={false}
          >
            Sign in
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
    // </LinearGradient>
  );
};

export default LoginScreen;
