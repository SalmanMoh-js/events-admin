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

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const events = [
    {
      id: 1,
      name: "Event Name",
      venue: "Venue",
      price: 100,
      address1: "Address 1",
      address2: "Address 2",
      date: "Date",
      time: "Time",
      type: "Sport",
      banner:
        "https://img.freepik.com/free-psd/music-banner-design-template_23-2149081198.jpg?w=2000",
      noOfTickets: 500,
      maxPerPerson: 5,
      desc: "Description",
    },
    {
      id: 2,
      name: "Event Name",
      venue: "Venue",
      price: 100,
      address1: "Address 1",
      address2: "Address 2",
      date: "Date",
      time: "Time",
      type: "Religious",
      banner:
        "https://img.freepik.com/free-psd/music-banner-design-template_23-2149081198.jpg?w=2000",
      noOfTickets: 500,
      maxPerPerson: 5,
      desc: "Description",
    },
    {
      id: 3,
      name: "Event Name",
      venue: "Venue",
      price: 100,
      address1: "Address 1",
      address2: "Address 2",
      date: "Date",
      time: "Time",
      type: "Cinema",
      banner:
        "https://img.freepik.com/free-psd/music-banner-design-template_23-2149081198.jpg?w=2000",
      noOfTickets: 500,
      maxPerPerson: 5,
      desc: "Description",
    },
    {
      id: 4,
      name: "Event Name",
      venue: "Venue",
      price: 100,
      address1: "Address 1",
      address2: "Address 2",
      date: "Date",
      time: "Time",
      type: "Concert",
      banner:
        "https://img.freepik.com/free-psd/music-banner-design-template_23-2149081198.jpg?w=2000",
      noOfTickets: 500,
      maxPerPerson: 5,
      desc: "Description",
    },
  ];
  const backAction = () => {
    Alert.alert("Exit App", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => {
          dispatch(resetData());
          BackHandler.exitApp();
        },
      },
    ]);
    return true;
  };

  // useEffect(() => {
  //   if (!user) {
  //     navigation.navigate("Main");
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: "Main" }],
  //     });
  //   }
  // }, [user]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  return (
    <SafeAreaView style={tw.style("h-full w-full bg-slate-100")}>
      <StatusBar animated={true} backgroundColor="#403a4aff" />
      <Header />

      <ScrollView style={tw`mx-auto my-1 bg-transparent w-full px-3`}>
        {loading ? (
          <LoadingFunc />
        ) : (
          events.map((event) => {
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
