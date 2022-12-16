import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text } from "react-native";
import tw from "twrnc";
import {
  Surface,
  Button,
  Badge,
  Pressable,
  Avatar,
  Divider,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Header from "../Components/Header";
import { FAB, List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const EventListItem = ({ event }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <Pressable
      style={tw.style(
        "w-full rounded-2xl flex flex-col p-3 justify-between my-1 mt-2 bg-white shadow-md"
      )}
      onPress={() =>
        navigation.navigate("Event", {
          eventId: event.id,
        })
      }
    >
      <View>
        <View className="flex flex-row justify-between">
          <Text className="text-2xl font-bold text-slate-600 mb-2">
            {event.name}
          </Text>
          <Badge
            label={event.type}
            labelStyle={tw.style("text-white")}
            tintColor="#33cccc"
          />
        </View>
        <View className="flex flex-row justify-between">
          <View className="flex flex-row">
            <View className="flex flex-row my-auto">
              <Avatar
                image={{
                  uri: event.banner
                    ? `http://app.addisway.com/public/banners/${event.banner}`
                    : "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg",
                }}
                style={tw.style("my-auto")}
              />
              <View className="flex flex-col ml-3">
                <View className="flex flex-col mt-2">
                  <View className="flex flex-row">
                    <Icon name="map-marker" size={20} color="#4577a9" />
                    <Text className="text-sm opacity-70 ml-1">
                      {event.venue}
                    </Text>
                  </View>
                  <View className="flex flex-row mt-2">
                    <Icon name="calendar" size={20} color="#4577a9" />
                    <Text className="text-sm opacity-70 ml-1">
                      {event.date}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Text className="text-xl font-bold text-slate-600 my-auto">
            {event.price} Br.
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default EventListItem;
