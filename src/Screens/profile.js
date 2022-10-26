import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SafeAreaView,
  Alert,
  BackHandler,
  ImageBackground,
  View,
  Text,
  StatusBar,
  Platform,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import {
  Surface,
  Badge,
  Pressable,
  Avatar,
  Divider,
  ListItem,
  TextInput,
  IconButton,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Header from "../Components/Header";
import ProfileHeader from "../Components/profileHeader";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tooltip } from "@rneui/themed";
import { Button } from "react-native-paper";

const Profile = ({ navigation }) => {
  const [profile, setProfile] = useState({
    name: "Salman Moh",
    email: "salmanmoh.eth@gmail.com",
    password: "123456",
    conPassword: "",
  });
  const [newProfile, setNewProfile] = useState({
    name: profile.name,
    email: profile.email,
    oldPassword: "",
    password: "",
    conPassword: "",
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [containerView, setContainerView] = useState({
    profileContainer: false,
    passwordChangeContainer: false,
  });
  const dispatch = useDispatch();

  const backAction = () => {
    Alert.alert("Exit App", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => {
          dispatch(resetData());
          BackHandler.exitApp();
        },
      },
    ]);
    return true;
  };

  // useEffect(() => {
  //   if (!user) {
  //     navigation.navigate("Main");
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: "Main" }],
  //     });
  //   }
  // }, [user]);

  return (
    <SafeAreaView style={tw.style("h-full w-full bg-white")}>
      <StatusBar animated={true} backgroundColor="#403a4aff" />
      <ProfileHeader />
      <View style={tw`bg-transparent w-full my-6 flex`}>
        <Avatar
          label="Salman Moh."
          size={60}
          style={tw.style("flex self-center")}
        />
        <Text className="text-3xl font-bold text-gray-500 pt-4 pb-1 w-full text-center">
          {profile.name}.
        </Text>
        <Text className="text-lg text-gray-500 pb-4 border-b border-gray-200 w-full text-center">
          {profile.email}
        </Text>
      </View>
      <ScrollView
        className="w-full"
        contentContainerStyle={tw.style("flex items-center")}
      >
        {!containerView.profileContainer && (
          <Button
            mode="outlined"
            style={tw.style("my-2")}
            color="#4577a9"
            icon="account-edit-outline"
            labelStyle={tw.style("text-lg")}
            onPress={() =>
              setContainerView({
                ...containerView,
                profileContainer: true,
              })
            }
            uppercase={false}
          >
            Edit Account Details
          </Button>
        )}
        {containerView.profileContainer && (
          <>
            <TextInput
              placeholder="Name"
              label="Name"
              value={newProfile.name}
              onChangeText={(e) =>
                setNewProfile({
                  ...newProfile,
                  name: e,
                })
              }
              style={tw.style("w-4/5 my-2 rounded-lg", {
                borderRadius: 20,
              })}
              leading={(props) => (
                <AntDesign name="user" size={20} {...props} />
              )}
              variant="outlined"
            />
            <TextInput
              placeholder="Email ID"
              label="Email ID"
              value={newProfile.email}
              onChangeText={(e) =>
                setNewProfile({
                  ...newProfile,
                  email: e,
                })
              }
              style={tw.style("w-4/5 mb-2 rounded-lg", {
                borderRadius: 20,
              })}
              leading={(props) => <Icon name="at" {...props} color="#4577a9" />}
              variant="outlined"
            />
            <View className="w-4/5 flex flex-row justify-between">
              <Button
                mode="outlined"
                style={tw.style("mb-2 border border-red-300")}
                // color="#4577a9"
                icon="close"
                labelStyle={tw.style("text-lg text-red-300")}
                onPress={() =>
                  setContainerView({
                    ...containerView,
                    profileContainer: false,
                  })
                }
                uppercase={false}
              >
                Cancel
              </Button>
              <Button
                mode="outlined"
                style={tw.style("mb-2")}
                color="#4577a9"
                icon="check"
                labelStyle={tw.style("text-lg")}
                onPress={() =>
                  setProfile({
                    ...profile,
                    name: newProfile.name,
                    email: newProfile.email,
                  })
                }
                uppercase={false}
              >
                Confirm
              </Button>
            </View>
            {!containerView.passwordChangeContainer && (
              <Button
                mode="outlined"
                style={tw.style("mb-2")}
                color="#4577a9"
                icon="pencil-lock-outline"
                labelStyle={tw.style("text-lg")}
                onPress={() =>
                  setContainerView({
                    ...containerView,
                    passwordChangeContainer: true,
                  })
                }
                uppercase={false}
              >
                Change Password
              </Button>
            )}
          </>
        )}
        {containerView.passwordChangeContainer && (
          <>
            <TextInput
              placeholder="Old Password"
              label="Old Password"
              secureTextEntry={secureTextEntry}
              value={newProfile.oldPassword}
              onChangeText={(e) =>
                setNewProfile({
                  ...newProfile,
                  oldPassword: e,
                })
              }
              style={tw.style("w-4/5 mb-2 rounded-xl")}
              leading={(props) => (
                <Icon name="lock-clock" {...props} color="#4577a9" />
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
            <TextInput
              placeholder="New Password"
              label="New Password"
              secureTextEntry={secureTextEntry}
              value={newProfile.password}
              onChangeText={(e) =>
                setNewProfile({
                  ...newProfile,
                  password: e,
                })
              }
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
            <TextInput
              placeholder="Confirm Password"
              label="Confirm Password"
              secureTextEntry={secureTextEntry}
              value={newProfile.conPassword}
              onChangeText={(e) =>
                setNewProfile({
                  ...newProfile,
                  conPassword: e,
                })
              }
              style={tw.style("w-4/5 mb-2 rounded-xl")}
              leading={(props) => (
                <Feather name="lock" {...props} color="#4577a9" />
              )}
              variant="outlined"
            />
            <View className="w-4/5 flex flex-row justify-between">
              <Button
                mode="outlined"
                style={tw.style("mb-2 border border-red-300")}
                // color="#4577a9"
                icon="close"
                labelStyle={tw.style("text-lg text-red-300")}
                onPress={() =>
                  setContainerView({
                    ...containerView,
                    passwordChangeContainer: false,
                  })
                }
                uppercase={false}
              >
                Cancel
              </Button>
              <Button
                mode="outlined"
                style={tw.style("mb-2")}
                color="#4577a9"
                icon="check"
                labelStyle={tw.style("text-lg")}
                onPress={() =>
                  setProfile({
                    ...profile,
                    password: newProfile.password,
                    conPassword: newProfile.conPassword,
                  })
                }
                uppercase={false}
                disabled={newProfile.password !== newProfile.conPassword}
              >
                Confirm
              </Button>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
