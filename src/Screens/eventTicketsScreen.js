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
  StyleSheet,
} from "react-native";
import tw from "twrnc";
import { Surface, Button, Badge, Pressable } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { FAB, Searchbar } from "react-native-paper";
import { ScrollView } from "react-native";
import TicketListItem from "../Components/ticketListItem";
import LoadingTicketListItem from "../Components/loadingTicketListItem";
import EventTicketsHeader from "../Components/eventTicketsHeader";

const EventTickets = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [startScan, setStartScan] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [scrolling, setScrolling] = useState("");
  const dispatch = useDispatch();
  const tickets = [
    {
      id: 1,
      ticketId: "000113454xsd",
      name: "Holder Name",
      buyer: "Buyer Name",
      confirmed: false,
      paid: true,
      purchaseDate: "DoP",
      eventName: "Event Name",
      eventDate: "DoE",
      price: 500,
      expired: true,
      type: "Standard",
    },
    {
      id: 2,
      ticketId: "000113454xsd",
      name: "Holder Name",
      buyer: "Buyer Name",
      confirmed: true,
      paid: true,
      purchaseDate: "DoP",
      eventName: "Event Name",
      eventDate: "DoE",
      price: 500,
      expired: false,
      type: "Standard",
    },
    {
      id: 3,
      ticketId: "000114545xsd",
      name: "Holder Name",
      buyer: "Buyer Name",
      confirmed: false,
      paid: true,
      purchaseDate: "DoP",
      eventName: "Event Name",
      eventDate: "DoE",
      price: 500,
      expired: false,
      type: "Standard",
    },
    {
      id: 4,
      ticketId: "00048754xsd",
      name: "Holder Name",
      buyer: "Buyer Name",
      confirmed: false,
      paid: false,
      purchaseDate: "DoP",
      eventName: "Event Name",
      eventDate: "DoE",
      price: 500,
      expired: false,
      type: "Vip",
    },
  ];
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  // useEffect(() => {
  //   if (!user) {
  //     navigation.navigate("Main");
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: "Main" }],
  //     });
  //   }
  // }, [user]);

  return (
    <SafeAreaView
      style={tw.style("h-full w-full bg-slate-100 flex items-center")}
    >
      <StatusBar animated={true} backgroundColor="#403a4aff" />
      <EventTicketsHeader />
      <Surface style={tw`mx-auto bg-transparent w-full h-full p-2`}>
        <Searchbar
          style={tw.style("w-full")}
          placeholder="Search"
          onChangeText={(e) => setSearchQuery(e)}
          value={searchQuery}
        />
        <ScrollView
          style={tw`mx-auto my-1 bg-transparent w-full mb-16 px-3`}
          onMomentumScrollBegin={() => setScrolling(true)}
          onMomentumScrollEnd={() => setScrolling(false)}
        >
          {loading ? (
            <LoadingFunc />
          ) : (
            tickets.map((ticket) => {
              return <TicketListItem ticket={ticket} key={ticket.id} />;
            })
          )}
        </ScrollView>
      </Surface>
    </SafeAreaView>
  );
};

const LoadingFunc = () => {
  let i = [1, 2, 3, 4, 5, 6];
  return (
    <>
      {i.map((i) => {
        return <LoadingTicketListItem key={i} />;
      })}
    </>
  );
};
export default EventTickets;
