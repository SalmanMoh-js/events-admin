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
import { RefreshControl } from "react-native";
import Toast from "react-native-fast-toast";

const EventTickets = ({ navigation, route }) => {
  const { isAuthenticated } = useSelector((state) => state.data);
  const { eventId } = route.params;
  const [searchQuery, setSearchQuery] = useState("");
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const getEventsTickets = async () => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": await AsyncStorage.getItem("token"),
      },
      timeout: 5000,
    };
    try {
      const res = await axios.get(
        `${URL}/api/ticket/event/${eventId.toString()}`,
        config
      );
      setTickets(res.data);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        setErrors(err.response.data);
        setLoading(false);
      } else if (err.request) {
        let errs = {};
        errs.connection = true;
        setErrors(errs);
        console.log(errors);
        setLoading(false);
      } else {
        let errs = {};
        errs.unknown = true;
        setErrors(errs);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    if (!searchQuery.trim().length) {
      setFilteredTickets(tickets);
    } else {
      setFilteredTickets(
        tickets.filter(
          (ticket) =>
            ticket.holderName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            ticket.eventName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            ticket.id.toString().includes(searchQuery)
        )
      );
    }
  }, [searchQuery]);
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
  useEffect(() => {
    if (errors) {
      if (errors.connection || errors.unknown) {
        toast.current.show("Connection problem. Please try again", {
          icon: <Icon name="alert-circle-outline" size={20} color="white" />,
          placement: "bottom",
          type: "danger",
          duration: 5000,
          style: { padding: 0 },
          textStyle: { padding: 0 },
        });
      }
      console.log(errors);
      setTimeout(() => {
        setErrors(null);
      }, 8000);
    }
  }, [errors]);
  return (
    <SafeAreaView
      style={tw.style("h-full w-full bg-slate-100 flex items-center")}
    >
      <Toast ref={toast} swipeEnabled={true} />
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
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                getEventsTickets();
              }}
            />
          }
        >
          {loading ? (
            <LoadingFunc />
          ) : searchQuery.trim().length ? (
            filteredTickets.map((ticket) => {
              return <TicketListItem ticket={ticket} key={ticket.id} />;
            })
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
