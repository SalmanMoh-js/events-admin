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
import { updatePassword, updateProfile } from "../Actions/adminActions";
import {
  addDataLoading,
  emptyErrors,
  loadAdmin,
  resetUpdate,
} from "../Actions/auth";
import Toast from "react-native-fast-toast";

const Profile = ({ navigation }) => {
  const errors = useSelector((state) => state.errors);
  const { isAuthenticated, user, dataUpdated, addDataLoading } = useSelector(
    (state) => state.data
  );
  const toast = useRef(null);
  const [newProfile, setNewProfile] = useState({
    name: user?.name,
    email: user?.email,
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
  function onProfileUpdate() {
    const updatedData = {
      name: newProfile.name,
      email: newProfile.email,
      id: user.id,
    };
    dispatch(updateProfile(updatedData));
  }
  function onPasswordUpdate() {
    const updatedPassword = {
      oldPassword: newProfile.oldPassword,
      newPassword: newProfile.password,
      id: user.id,
    };
    dispatch(updatePassword(updatedPassword));
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate("Main");
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    }
  }, [isAuthenticated]);
  useEffect(() => {
    console.log(dataUpdated);
    if (dataUpdated === "profile update") {
      setContainerView({
        ...containerView,
        profileContainer: false,
      });
      toast.current.show("Profile Updated", {
        icon: <Icon name="check" size={20} color="white" />,
        placement: "bottom",
        type: "success",
        duration: 4000,
        style: { padding: 0 },
        textStyle: { padding: 0 },
      });
      dispatch(loadAdmin());
      setTimeout(() => {
        dispatch(resetUpdate());
      }, 5000);
    }
    if (dataUpdated === "password update") {
      setContainerView({
        ...containerView,
        passwordChangeContainer: false,
      });
      toast.current.show("Password Changed", {
        icon: <Icon name="check" size={20} color="white" />,
        placement: "bottom",
        type: "success",
        duration: 4000,
        style: { padding: 0 },
        textStyle: { padding: 0 },
      });
      setTimeout(() => {
        dispatch(resetUpdate());
      }, 5000);
    }
    if (Object.keys(errors).length !== 0) {
      if (errors.password) {
        toast.current.show("Password is incorrect", {
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
  }, [dataUpdated, errors]);

  return (
    <SafeAreaView style={tw.style("h-full w-full bg-white")}>
      <Toast ref={toast} swipeEnabled={true} />
      <StatusBar animated={true} backgroundColor="#403a4aff" />
      <ProfileHeader />
      <View style={tw`bg-transparent w-full my-6 flex`}>
        <Avatar
          label={user?.name}
          size={60}
          style={tw.style("flex self-center")}
        />
        <Text className="text-3xl font-bold text-gray-500 pt-4 pb-1 w-full text-center">
          {user?.name}
        </Text>
        <Text className="text-lg text-gray-500 pb-4 border-b border-gray-200 w-full text-center">
          {user?.email}
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
                onPress={onProfileUpdate}
                uppercase={false}
                loading={addDataLoading}
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
                onPress={onPasswordUpdate}
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
