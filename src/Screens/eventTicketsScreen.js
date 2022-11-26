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
import { getEventsTickets, getTickets } from "../Actions/adminActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL } from "../Actions/types";

const EventTickets = ({ navigation, route }) => {
  const { isAuthenticated } = useSelector((state) => state.data);
  const { eventId } = route.params;
  const [searchQuery, setSearchQuery] = useState("");
  const [tickets, setTickets] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scrolling, setScrolling] = useState("");
  const dispatch = useDispatch();

  const getEventsTickets = async () => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": await AsyncStorage.getItem("token"),
      },
    };
    try {
      const res = await axios.get(`${URL}/api/ticket/event/:id`, config);
      setTickets(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
      setLoading(false);
    }
  };
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
    getEventsTickets();
  }, []);
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
