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
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { Searchbar, TextInput } from "react-native-paper";

export default function SetBannerHeader({ mode }) {
  const navigation = useNavigation();
  return (
    <Surface
      style={tw.style(
        "w-full px-3 py-2 flex flex-row justify-between shadow-md"
      )}
    >
      <View className="flex flex-row justify-start py-2">
        <Text className="text-2xl font-bold text-gray-500 my-auto ml-3">
          {mode === "edit" && "Edit"} Banner
        </Text>
      </View>
    </Surface>
  );
}
