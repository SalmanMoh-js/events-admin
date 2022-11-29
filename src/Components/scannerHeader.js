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
import { Searchbar, TextInput } from "react-native-paper";

export default function ScannerHeader() {
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
            Tickets
          </Text>
        </View>
      </View>
      <View className="flex flex-row -ml-3">
        <IconButton
          icon={(props) => (
            <Feather name="more-vertical" size={20} {...props} />
          )}
        />
      </View>
    </Surface>
  );
}
