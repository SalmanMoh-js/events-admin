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
import { useDispatch, useSelector } from "react-redux";
import {
  approveTicket,
  confirmPurchase,
  getTickets,
} from "../Actions/adminActions";
import { emptyErrors, loading, resetUpdate } from "../Actions/auth";
import { useState } from "react";

const Ticket = ({ route }) => {
  const { isAuthenticated, dataUpdated, addDataLoading } = useSelector(
    (state) => state.data
  );
  const errors = useSelector((state) => state.errors);
  const navigation = useNavigation();
  const toast = useRef(null);
  const dispatch = useDispatch();
  const [ticket, setTicket] = useState(route.params.ticket);
  useEffect(() => {
    console.log(ticket);
  }, []);
  function isInTheFuture(date) {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return date > today;
  }
  function onApproveTicket() {
    const ticketData = {
      id: ticket.id,
    };
    dispatch(approveTicket(ticketData));
  }
  function onConfirmPurchase() {
    const ticketData = {
      id: ticket.id,
    };
    dispatch(confirmPurchase(ticketData));
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
    if (dataUpdated === "ticket approve") {
      setTicket({
        ...ticket,
        confirmed: "true",
      });
      dispatch(getTickets());
      toast.current.show("Ticket Approved", {
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
    if (dataUpdated === "payment confirm") {
      setTicket({
        ...ticket,
        paid: "true",
      });
      toast.current.show("Payment Confirmed", {
        icon: <Icon name="check" size={20} color="white" />,
        placement: "bottom",
        type: "success",
        duration: 4000,
        style: { padding: 0 },
        textStyle: { padding: 0 },
      });
      dispatch(getTickets());
      setTimeout(() => {
        dispatch(resetUpdate());
      }, 5000);
    }
    if (Object.keys(errors).length !== 0) {
      if (errors.unknown) {
        toast.current.show("Connection problem. Please try again", {
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
    <SafeAreaView className="bg-white absolute top-0 h-full w-full">
      <TicketHeader />
      <Toast ref={toast} swipeEnabled={true} />
      <ScrollView className="w-full h-full">
        <View className="p-4 pb-3 border-b border-gray-200">
          <View className="flex flex-row justify-between">
            <Pressable
              onPress={() =>
                navigation.navigate("Event", {
                  eventId: ticket.eventId,
                })
              }
            >
              <Text
                className={
                  !isInTheFuture(new Date(ticket.date))
                    ? "text-3xl font-extrabold text-gray-600 line-through"
                    : "text-3xl font-extrabold text-gray-600"
                }
              >
                {ticket.eventName}
              </Text>
            </Pressable>
            <View className="flex flex-row">
              {!isInTheFuture(new Date(ticket.date)) ? (
                <Badge
                  label="Expired"
                  style={tw.style("my-auto", { backgroundColor: "#9ea6ad" })}
                  labelStyle={tw.style("text-white")}
                  tintColor="#b4b4c5"
                />
              ) : (
                <>
                  <Badge
                    label={
                      ticket.confirmed === "true"
                        ? "Confirmed"
                        : "Not Confirmed"
                    }
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
              <Text className="text-sm text-gray-400 ml-2">{ticket.venue}</Text>
              <Text className="text-sm text-gray-400 ml-2">.</Text>
              <AntDesign
                name="calendar"
                size={18}
                style={tw.style("ml-2")}
                color="#4577a9"
              />
              <Text className="text-sm text-gray-400 ml-2">{ticket.date}</Text>
              <Text className="text-sm text-gray-400 ml-2">.</Text>
              <Feather
                name="hash"
                size={18}
                style={tw.style("ml-2")}
                color="#4577a9"
              />
              <Pressable
                onPress={async () => {
                  try {
                    await Clipboard.setStringAsync(ticket.id.toString());
                    toast.current.show("ID Copied", {
                      icon: (
                        <Icon name="content-copy" size={20} color="white" />
                      ),
                      type: "normal",
                      duration: 3000,
                      style: { padding: 0, marginTop: 20 },
                      textStyle: { padding: 0 },
                    });
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <Text className="text-sm text-gray-400 ml-2">{ticket.id}</Text>
              </Pressable>
            </View>
            <Text
              style={tw.style("text-xl font-bold", {
                color: "#4577a9",
                textDecorationLine: ticket.expired === "true" && "line-through",
              })}
            >
              {ticket.price} Br.
            </Text>
          </View>
          <Text
            style={tw.style("text-base font-bold text-right", {
              color: ticket.paid === "true" ? "#4577a9" : "#db7171",
              textDecorationLine: ticket.expired === "true" && "line-through",
            })}
          >
            {ticket.paid === "true" ? "Paid" : "Unpaid"}
          </Text>
        </View>
        <View className="w-full p-4">
          <ListItem
            title={ticket.holderName}
            secondaryText="Holder Name"
            leading={<AntDesign name="user" size={24} />}
          />
          <ListItem
            title={ticket.dateOfPurchase}
            secondaryText="Date of Purchase"
            leading={<AntDesign name="calendar" size={24} />}
          />
          <ListItem
            title={ticket.buyerName}
            secondaryText="Purchaser Account"
            leading={<Icon name="account-cash-outline" size={24} />}
          />
        </View>
      </ScrollView>
      <View
        className={
          ticket.paid === "true"
            ? "absolute bottom-6 mb-2 w-4/5 flex flex-row justify-center items-center self-center"
            : "absolute bottom-6 mb-2 w-4/5 flex flex-row justify-between items-center self-center"
        }
      >
        {ticket.paid !== "true" && (
          <Button
            mode="standard"
            style={tw.style("w-2/5 bg-green-600 rounded-md")}
            color="#ffffff"
            icon="check"
            uppercase={false}
            labelStyle={tw.style("text-lg")}
            onPress={onConfirmPurchase}
            loading={addDataLoading}
          >
            Paid
          </Button>
        )}
        {ticket.expired !== "true" && ticket.confirmed !== "true" && (
          <Button
            mode="standard"
            style={tw.style("w-2/5 rounded-md", {
              backgroundColor: "#4577a9",
            })}
            color="#ffffff"
            icon="check"
            uppercase={false}
            labelStyle={tw.style("text-lg")}
            onPress={onApproveTicket}
            loading={addDataLoading}
          >
            Approve
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Ticket;
