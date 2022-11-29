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
  ScrollView,
  RefreshControl,
} from "react-native";
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
import EventListItem from "../Components/eventListItem";
import LoadingListItem from "../Components/loadingListItem";
import { LinearGradient } from "expo-linear-gradient";
import { getEvents } from "../Actions/adminActions";
import Toast from "react-native-fast-toast";
import { emptyErrors } from "../Actions/auth";

const HomeScreen = ({ navigation }) => {
  const { events, loading, isAuthenticated } = useSelector(
    (state) => state.data
  );
  const errors = useSelector((state) => state.errors);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [filteredEvents, setFilteredEvents] = useState([]);

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
    if (!events.length) {
      dispatch(getEvents());
    }
  }, []);
  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
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
        dispatch(emptyErrors());
      }, 8000);
    }
  }, [errors]);
  useEffect(() => {
    setFilteredEvents(
      events.filter(
        (event) =>
          event.name.includes(searchQuery) ||
          event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);
  return (
    <SafeAreaView style={tw.style("h-full w-full bg-slate-100")}>
      <Toast ref={toast} swipeEnabled={true} />
      <StatusBar animated={true} backgroundColor="#403a4aff" />
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ScrollView
        style={tw`mx-auto my-1 bg-transparent w-full px-3`}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              dispatch(getEvents());
            }}
          />
        }
      >
        {loading ? (
          <LoadingFunc />
        ) : (
          filteredEvents.map((event) => {
            return <EventListItem event={event} key={event.id} />;
          })
        )}
      </ScrollView>
      <FAB
        icon="plus"
        color="white"
        style={tw.style("absolute m-4 right-0 bottom-0", {
          backgroundColor: "#4577a9",
        })}
        onPress={() => navigation.navigate("New Event")}
      />
    </SafeAreaView>
  );
};

const LoadingFunc = () => {
  let i = [1, 2, 3, 4, 5, 6];
  return (
    <>
      {i.map((i) => {
        return <LoadingListItem key={i} />;
      })}
    </>
  );
};
export default HomeScreen;
