import React, { useEffect, useRef } from "react";
import { StatusBar } from "react-native";
import tw from "twrnc";
import { ScrollView, SafeAreaView, View, Text } from "react-native";
import { Image } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Badge,
  IconButton,
  ListItem,
  Pressable,
} from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { Button, Button as PaperButton } from "react-native-paper";
import TicketHeader from "../Components/ticketHeader";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-fast-toast";

const Ticket = ({ route }) => {
  const navigation = useNavigation();
  const toast = useRef(null);
  const { ticket } = route.params;
  return (
    <SafeAreaView className="bg-white absolute top-0 h-full w-full">
      <TicketHeader />
      <ScrollView className="w-full h-full">
        <View className="p-4 pb-3 border-b border-gray-200">
          <View className="flex flex-row justify-between">
            <Text
              className={
                ticket.expired
                  ? "text-3xl font-extrabold text-gray-600 line-through"
                  : "text-3xl font-extrabold text-gray-600"
              }
            >
              {ticket.eventName}
            </Text>
            <View className="flex flex-row">
              {ticket.expired ? (
                <Badge
                  label="Expired"
                  style={tw.style("my-auto", { backgroundColor: "#9ea6ad" })}
                  labelStyle={tw.style("text-white")}
                  tintColor="#b4b4c5"
                />
              ) : (
                <>
                  <Badge
                    label={ticket.type}
                    style={tw.style("my-auto", {
                      backgroundColor:
                        ticket.type === "Vip" ? "#b0b316" : "#4577a9",
                    })}
                    labelStyle={tw.style("text-white")}
                    tintColor={ticket.type === "Vip" ? "#b0b316" : "#4577a9"}
                  />
                  <Badge
                    label={ticket.confirmed ? "Confirmed" : "Not Confirmed"}
                    style={tw.style("mx-2 my-auto", {
                      backgroundColor: "#329466",
                    })}
                    labelStyle={tw.style("text-white")}
                    tintColor="#6866d4"
                  />
                </>
              )}
            </View>
          </View>
          <View className="w-full flex flex-row mt-2 justify-between">
            <View className="flex flex-row my-auto">
              <Icon name="map-marker" size={20} color="#4577a9" />
              <Text className="text-sm text-gray-400 ml-2">Venue</Text>
              <Text className="text-sm text-gray-400 ml-2">.</Text>
              <AntDesign
                name="calendar"
                size={18}
                style={tw.style("ml-2")}
                color="#4577a9"
              />
              <Text className="text-sm text-gray-400 ml-2">
                {ticket.eventDate}
              </Text>
              <Text className="text-sm text-gray-400 ml-2">.</Text>
              <Feather
                name="hash"
                size={18}
                style={tw.style("ml-2")}
                color="#4577a9"
              />
              <Pressable
                onPress={async () => {
                  await Clipboard.setStringAsync(ticket.ticketId);
                  toast.current.show("ID Copied", {
                    icon: <Icon name="content-copy" size={20} color="white" />,
                    type: "normal",
                    duration: 3000,
                    style: { padding: 0, marginTop: 20 },
                    textStyle: { padding: 0 },
                  });
                }}
              >
                <Text className="text-sm text-gray-400 ml-2">
                  {ticket.ticketId}
                </Text>
              </Pressable>
            </View>
            <Text
              style={tw.style("text-xl font-bold", {
                color: "#4577a9",
                textDecorationLine: ticket.expired && "line-through",
              })}
            >
              {ticket.price} Br.
            </Text>
          </View>
          <Text
            style={tw.style("text-base font-bold text-right", {
              color: ticket.paid ? "#4577a9" : "#db7171",
              textDecorationLine: ticket.expired && "line-through",
            })}
          >
            {ticket.paid ? "Paid" : "Unpaid"}
          </Text>
        </View>
        <View className="w-full p-4">
          <ListItem
            title={ticket.name}
            secondaryText="Holder Name"
            leading={<AntDesign name="user" size={24} />}
          />
          <ListItem
            title={ticket.purchaseDate}
            secondaryText="Date of Purchase"
            leading={<AntDesign name="calendar" size={24} />}
          />
          <ListItem
            title={ticket.buyer}
            secondaryText="Purchaser Account"
            leading={<Icon name="account-cash-outline" size={24} />}
          />
        </View>
      </ScrollView>
      <Toast ref={toast} />
      <View
        className={
          ticket.paid
            ? "absolute bottom-6 mb-2 w-4/5 flex flex-row justify-center items-center self-center"
            : "absolute bottom-6 mb-2 w-4/5 flex flex-row justify-between items-center self-center"
        }
      >
        {!ticket.paid && (
          <Button
            mode="standard"
            style={tw.style("w-2/5 bg-green-600 rounded-md")}
            color="#ffffff"
            icon="check"
            uppercase={false}
            labelStyle={tw.style("text-lg")}
          >
            Paid
          </Button>
        )}
        {!ticket.expired && !ticket.confirmed && (
          <Button
            mode="standard"
            style={tw.style("w-2/5 rounded-md", {
              backgroundColor: "#4577a9",
            })}
            color="#ffffff"
            icon="check"
            uppercase={false}
            labelStyle={tw.style("text-lg")}
          >
            Confirm
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Ticket;
