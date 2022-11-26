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
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-fast-toast";

const TicketListItem = ({ ticket }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useRef(null);

  function isInTheFuture(date) {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return date > today;
  }
  return (
    <Pressable
      style={tw.style(
        "w-full rounded-2xl flex flex-row justify-between my-1 mt-2 bg-transparent shadow-md"
      )}
      onPress={() =>
        navigation.navigate("Ticket", {
          ticket: ticket,
        })
      }
    >
      <View
        style={tw.style("w-2/5 h-28 bg-white rounded-md flex flex-col", {
          borderRightWidth: 2,
          borderColor: "#4577a9",
          borderStyle: "dashed",
        })}
      >
        <Text className="text-2xl font-bold text-blue-600 m-auto">
          {ticket.price} Br.
        </Text>
        <View className="w-full flex flex-row p-2">
          <Icon name="calendar" size={20} color="#4577a9" />
          <Text className="text-sm text-blue-600 ml-2">
            {ticket.dateOfPurchase}
          </Text>
        </View>
      </View>
      <View className="w-3/5 bg-white rounded-md flex flex-col p-2">
        <Text className="text-xl font-bold text-slate-600 text-left">
          {ticket.buyerName}
        </Text>
        <View className="w-full flex flex-row py-2 justify-between">
          <View className="flex flex-row">
            <Icon
              name="ticket-confirmation-outline"
              size={20}
              color="#4577a9"
            />
            <Pressable
              onPress={async () => {
                await Clipboard.setStringAsync(ticket.id.toString());
                toast.current.show("ID Copied", {
                  icon: <Icon name="content-copy" size={20} color="white" />,
                  type: "normal",
                  duration: 2000,
                  style: { padding: 0, marginTop: 20 },
                  textStyle: { padding: 0 },
                });
              }}
            >
              <Text className="text-sm text-blue-600 ml-2">{ticket.id}</Text>
            </Pressable>
          </View>
          {!isInTheFuture(new Date(ticket.date)) && (
            <Badge
              label="Expired"
              labelStyle={tw.style("text-white")}
              tintColor="#33cccc"
            />
          )}
        </View>
        <Text className="text-lg font-bold text-slate-600 text-left">
          {ticket.eventName}
        </Text>
      </View>
      <Toast ref={toast} />
    </Pressable>
  );
};

export default TicketListItem;
