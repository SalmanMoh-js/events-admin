import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "react-native";
import tw from "twrnc";
import { ScrollView, SafeAreaView, View, Text } from "react-native";
import { Image } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Badge,
  Button,
  Chip,
  IconButton,
  Pressable,
} from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Button as PaperButton, List } from "react-native-paper";
import { useSelector } from "react-redux";
import axios from "axios";
import { URL } from "../Actions/types";
import EventLoadingScreen from "../Components/eventLoadingScreen";
import Toast from "react-native-fast-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RefreshControl } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Event = ({ route }) => {
  const { isAuthenticated } = useSelector((state) => state.data);
  const navigation = useNavigation();
  const { eventId } = route.params;
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  const [errors, setErrors] = useState(null);
  const toast = useRef(null);
  function isInTheFuture(date) {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return date > today;
  }
  const viewEvent = async (id) => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": await AsyncStorage.getItem("token"),
      },
      timeout: 5000,
    };
    try {
      const res = await axios.get(`${URL}/api/event/${id}`, config);
      if (res.data.length) {
        setEvent(res.data[0]);
      } else {
        let errs = {};
        errs.deleted = true;
        setErrors(errs);
        setLoading(false);
      }
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
    viewEvent(eventId);
  }, []);
  useEffect(() => {
    if (errors) {
      if (errors.connection) {
        toast.current.show("Connection problem. Pull down to retry", {
          icon: <Icon name="alert-circle-outline" size={20} color="white" />,
          placement: "bottom",
          type: "danger",
          duration: 5000,
          style: { padding: 0 },
          textStyle: { padding: 0 },
        });
      }
      setTimeout(() => {
        setErrors(null);
      }, 8000);
    }
  }, [errors]);
  useEffect(() => {
    if (errors) {
      if (errors.deleted) {
        toast.current.show("Returned null. Event might've been removed", {
          icon: <Icon name="alert-circle-outline" size={20} color="white" />,
          placement: "bottom",
          type: "danger",
          duration: 5000,
          style: { padding: 0 },
          textStyle: { padding: 0 },
        });
      }
      setTimeout(() => {
        navigation.goBack();
      }, 5000);
    }
  }, [errors]);
  return (
    <>
      <Toast ref={toast} swipeEnabled={true} />
      {loading ? (
        <EventLoadingScreen
          viewEvent={viewEvent}
          eventId={eventId}
          loading={loading}
        />
      ) : event && Object.keys(event).length ? (
        <SafeAreaView className="bg-white absolute top-0 h-full w-full">
          <ScrollView
            className="w-full h-full"
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  viewEvent(eventId);
                }}
              />
            }
          >
            <Image
              source={{
                uri: event.banner
                  ? `http://app.addisway.com/public/banners/${event.banner}`
                  : "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg",
              }}
              className="w-full h-60 rounded-b-3xl"
            />
            <View className="p-4 border-b border-gray-200 w-full">
              <View className="flex flex-row justify-between w-2/3">
                <Text
                  className={
                    !isInTheFuture(new Date(event.date))
                      ? "text-3xl font-extrabold text-gray-600 line-through w-full"
                      : "text-3xl font-extrabold text-gray-600 w-full break-words"
                  }
                >
                  {event.name}
                </Text>
                <View className="flex flex-row">
                  <Badge
                    label={event.type}
                    style={tw.style("my-auto", {
                      backgroundColor: "#4577a9",
                    })}
                    labelStyle={tw.style("text-white")}
                    tintColor="#6866d4"
                  />
                  <Pressable
                    style={tw.style(" ml-2 py-1 px-2 rounded-full border-2", {
                      borderColor: "#4577a9",
                    })}
                    onPress={() =>
                      navigation.navigate("Edit Event", {
                        event: event,
                      })
                    }
                  >
                    <Text
                      style={tw.style("text-base text-gray-400 my-auto", {
                        color: "#4577a9",
                      })}
                    >
                      Edit Event
                    </Text>
                  </Pressable>
                </View>
              </View>
              <View className="w-full flex flex-row mt-2 justify-between">
                <View className="flex flex-row my-auto">
                  <Icon name="map-marker" size={20} color="#4577a9" />
                  <Text className="text-sm text-gray-400 ml-2">
                    {event.venue}
                  </Text>
                  <Text className="text-sm text-gray-400 ml-2">.</Text>
                  <AntDesign
                    name="user"
                    size={18}
                    style={tw.style("ml-2")}
                    color="#4577a9"
                  />
                  <Text className="text-sm text-gray-400 ml-2">
                    {event.maxPerPerson} max
                  </Text>
                  <Text className="text-sm text-gray-400 ml-2">.</Text>
                  <Text className="text-sm text-gray-400 ml-2">
                    {event.noOfTickets} Tickets
                  </Text>
                </View>
                <Text
                  style={tw.style("text-xl font-bold", {
                    color: "#4577a9",
                  })}
                >
                  {event.price} Br.
                </Text>
              </View>
            </View>
            <ScrollView
              style={tw`mt-2 bg-transparent w-full`}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {event.ticketTypes.split(",").map((type, index) => {
                return (
                  <Chip
                    key={index}
                    label={
                      type + " : " + event.prices.split(",")[index] + "Br."
                    }
                    style={tw.style("mx-1")}
                  />
                );
              })}
            </ScrollView>
            <View className="w-full flex flex-row py-3 border-b border-gray-200">
              <View className="w-1/2 px-1">
                <View
                  style={tw.style(
                    "flex flex-row p-1 border border-gray-400 rounded-lg w-full text-center items-center justify-center"
                  )}
                >
                  <Icon
                    name="calendar"
                    color="#4577a9"
                    size={28}
                    style={tw.style("my-2")}
                  />
                  <View className="flex flex-col">
                    <Text
                      style={tw.style("text-xl text-gray-500 text-center ml-2")}
                    >
                      {event.date}
                    </Text>
                  </View>
                </View>
              </View>
              <View className="w-1/2 px-1">
                <View
                  style={tw.style(
                    "flex flex-row p-1 border border-gray-400 rounded-lg w-full text-center items-center justify-center"
                  )}
                >
                  <Icon
                    name="clock-outline"
                    color="#4577a9"
                    size={28}
                    style={tw.style("my-2")}
                  />
                  <View className="flex flex-col">
                    <Text
                      style={tw.style("text-xl text-gray-500 text-center ml-2")}
                    >
                      {event.time}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View className="w-full p-4">
              <View className="flex flex-row justify-between my-auto">
                <View className="flex flex-row my-auto">
                  <Text className="text-2xl font-bold text-gray-600 mr-2 ml-4">
                    Details
                  </Text>
                  <Icon
                    name="alert-circle-outline"
                    size={24}
                    color="#4577a9"
                    style={tw.style("my-auto")}
                  />
                </View>
                <Button
                  variant="outlined"
                  title="Live stream link"
                  leading={(props) => (
                    <Icon name="link-variant-plus" {...props} color="#268ceb" />
                  )}
                  onPress={() =>
                    navigation.navigate("Set Live Stream", {
                      event: event,
                    })
                  }
                />
              </View>
              <Text className="text-lg text-gray-500 break-words m-4 text-justify">
                {event.description}
              </Text>
            </View>
            <List.Item
              title="View Tickets"
              right={(props) => (
                <List.Icon {...props} icon="chevron-right" size={24} />
              )}
              style={tw.style(
                "py-3 border border-gray-300 rounded-lg my-3 w-11/12 mx-auto"
              )}
              onPress={() =>
                navigation.navigate("Event Tickets", {
                  event: event,
                })
              }
            />
          </ScrollView>
          <View className="flex flex-row justify-between absolute top-0 w-full px-3 h-fit bg-gradient-to-b from-gray-600 to-gray-200">
            <IconButton
              icon={(props) => (
                <Icon name="arrow-left" {...props} color="white" />
              )}
              style={tw.style("")}
              onPress={() => navigation.goBack()}
            />
          </View>
        </SafeAreaView>
      ) : (
        <EventLoadingScreen
          viewEvent={viewEvent}
          eventId={eventId}
          loading={loading}
        />
      )}
    </>
  );
};

export default Event;
