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

export default function EventTicketsHeader() {
  const navigation = useNavigation();
  return (
    <Surface
      style={tw.style(
        "w-full px-3 py-2 flex flex-row justify-between shadow-md"
      )}
    >
      <View className="flex flex-row justify-start w-full">
        <IconButton
          icon={(props) => <Icon name="arrow-left" {...props} />}
          onPress={() => navigation.goBack()}
        />
        <Text className="text-2xl font-bold text-gray-500 my-auto mx-3">
          Tickets
        </Text>
      </View>
    </Surface>
  );
}
