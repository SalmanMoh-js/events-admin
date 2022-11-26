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
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import { useNavigation } from "@react-navigation/native";
import { Searchbar, TextInput } from "react-native-paper";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInput = useRef(null);
  const navigation = useNavigation();
  return (
    <Surface
      style={tw.style(
        "w-full px-3 py-2 flex flex-row justify-between shadow-md"
      )}
    >
      <View className="flex flex-row">
        <View className="flex flex-col w-11/12">
          {showSearch ? (
            <Searchbar
              ref={searchInput}
              style={tw.style("w-full")}
              placeholder="Search"
              onChangeText={(e) => setSearchQuery(e)}
              value={searchQuery}
            />
          ) : (
            <Text className="text-3xl font-bold text-gray-500 my-auto">
              Events
            </Text>
          )}
        </View>
      </View>
      <View className="flex flex-row -ml-3">
        {showSearch ? (
          <IconButton
            icon={(props) => <AntDesign name="close" size={20} {...props} />}
            onPress={() => setShowSearch(false)}
          />
        ) : (
          <IconButton
            icon={(props) => <AntDesign name="search1" size={20} {...props} />}
            onPress={() => {
              setShowSearch(true);
            }}
          />
        )}
      </View>
    </Surface>
  );
}
