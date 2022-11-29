import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Pressable,
  Surface,
} from "@react-native-material/core";
import tw from "twrnc";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import { useNavigation } from "@react-navigation/native";
import Popover, { PopoverPlacement, Rect } from "react-native-popover-view";
import { logout } from "../Actions/auth";
import { useDispatch } from "react-redux";

export default function ProfileHeader() {
  const dispatch = useDispatch();
  const [showPopover, setShowPopover] = useState(false);
  const navigation = useNavigation();
  return (
    <Surface
      style={tw.style(
        "w-full px-3 py-2 flex flex-row justify-between shadow-md"
      )}
    >
      <View className="flex flex-row">
        <View className="flex flex-col w-11/12">
          <Text className="text-3xl font-bold text-gray-500 my-auto">
            Profile
          </Text>
        </View>
      </View>
      <View className="flex flex-row -ml-3">
        <Popover
          isVisible={showPopover}
          onRequestClose={() => setShowPopover(false)}
          from={
            <TouchableOpacity onPress={() => setShowPopover(true)}>
              <IconButton
                icon={(props) => (
                  <Feather name="more-vertical" size={20} {...props} />
                )}
                disabled
              />
            </TouchableOpacity>
          }
          backgroundStyle={{ opacity: 0.1 }}
          popoverStyle={tw.style("bg-white shadow-lg py-2 w-48")}
        >
          <Button
            title="logout"
            variant="text"
            color="#e05656"
            leading={(props) => (
              <Icon name="logout" {...props} style={tw.style("ml-3")} />
            )}
            onPress={() => {
              dispatch(logout());
              navigation.navigate("Main");
            }}
            style={tw.style("text-left px-2")}
            titleStyle={tw.style("text-left w-full")}
          />
        </Popover>
      </View>
    </Surface>
  );
}
