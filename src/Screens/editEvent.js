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
  Image,
} from "react-native";
import tw from "twrnc";
import {
  Surface,
  Button,
  Badge,
  Pressable,
  TextInput,
  Chip,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import EditEventHeader from "../Components/editEventHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL } from "../Actions/types";
import Toast from "react-native-fast-toast";
import { getEvents } from "../Actions/adminActions";

const EditEvent = ({ route, navigation }) => {
  const { isAuthenticated } = useSelector((state) => state.data);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false);
  const toast = useRef(null);
  const dispatch = useDispatch();
  const { event } = route.params;
  const types = [
    "Concert",
    "Party",
    "Sport",
    "Auction",
    "Religious",
    "Exhibition",
    "Cinema",
    "Comedy",
  ];
  const [newEvent, setNewEvent] = useState({
    id: event.id,
    name: event.name,
    banner: event.banner,
    venue: event.venue,
    address1: event.address1,
    address2: event.address2,
    date: event.date,
    time: event.time,
    type: event.type,
    price: event.price,
    dateTime: event.dateTime,
    noOfTickets: event.noOfTickets,
    maxPerPerson: event.maxPerPerson,
    description: event.description,
    createdAt: event.createdAt,
  });
  const [showDatePicker, setShowDatePicker] = useState({
    showDate: false,
    showTime: false,
  });
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-");
  }
  function formatTime(dt) {
    var hours = dt.getHours(); // gives the value in 24 hours format
    var AmOrPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    var minutes = dt.getMinutes();
    const formatter = (time) => {
      if (time < 10) {
        return "0" + time;
      } else {
        return time;
      }
    };
    var finalTime = formatter(hours) + ":" + formatter(minutes) + " " + AmOrPm;
    return finalTime;
  }
  const onTypePress = (type) => {
    if (newEvent.type === type) {
      setNewEvent({
        ...newEvent,
        type: "",
      });
    } else {
      setNewEvent({
        ...newEvent,
        type: type,
      });
    }
  };
  const updateEvent = async () => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": await AsyncStorage.getItem("token"),
      },
      timeout: 5000,
    };
    const body = JSON.stringify(newEvent);
    try {
      const res = await axios.post(
        `${URL}/api/event/${newEvent.id}`,
        body,
        config
      );
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
      if (err.response) {
        setErrors(err.response.data);
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
      }
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
    if (errors && Object.keys(errors).length !== 0) {
      toast.current.show("Connection problem. Please try again", {
        icon: <Icon name="alert-circle-outline" size={20} color="white" />,
        placement: "bottom",
        type: "danger",
        duration: 4000,
        style: { padding: 0 },
        textStyle: { padding: 0 },
      });
      console.log("Errors: ", errors);
    }
    if (success) {
      setErrors(null);
      dispatch(getEvents);
      navigation.goBack();
    }
  }, [event, errors, success]);
  return (
    <SafeAreaView style={tw.style("h-full w-full bg-white")}>
      <Toast ref={toast} swipeEnabled={true} />
      <StatusBar animated={true} backgroundColor="#403a4aff" />
      <EditEventHeader updateEvent={updateEvent} loading={loading} />
      <ScrollView style={tw`mx-auto mt-4 bg-transparent w-full h-4/5 px-3`}>
        <View className="w-full py-1">
          <TextInput
            label="Event Name"
            value={newEvent.name}
            onChangeText={(e) =>
              setNewEvent({
                ...newEvent,
                name: e,
              })
            }
            style={tw.style("w-full")}
          />
        </View>
        <View className="w-full flex flex-row py-1">
          <View className="w-1/2 px-1">
            <TextInput
              label="Venue"
              value={newEvent.venue}
              onChangeText={(e) =>
                setNewEvent({
                  ...newEvent,
                  venue: e,
                })
              }
              style={tw.style("w-full")}
            />
          </View>
          <View className="w-1/2 px-1">
            <TextInput
              label="Price"
              keyboardType="number-pad"
              value={newEvent.price}
              onChangeText={(e) =>
                setNewEvent({
                  ...newEvent,
                  price: e,
                })
              }
              style={tw.style("w-full")}
            />
          </View>
        </View>
        <View className="w-full py-1">
          <TextInput
            label="Address 1"
            value={newEvent.address1}
            onChangeText={(e) =>
              setNewEvent({
                ...newEvent,
                address1: e,
              })
            }
            style={tw.style("w-full")}
          />
        </View>
        <View className="w-full py-1">
          <TextInput
            label="Address 2"
            value={newEvent.address2}
            onChangeText={(e) =>
              setNewEvent({
                ...newEvent,
                address2: e,
              })
            }
            style={tw.style("w-full")}
          />
        </View>
        <View className="w-full flex flex-row py-1">
          <View className="w-1/2 px-1">
            <Pressable
              onPress={() =>
                setShowDatePicker({
                  ...showDatePicker,
                  showDate: true,
                })
              }
              style={tw.style(
                "flex flex-row p-1 border border-gray-400 rounded-3xl w-full text-center items-center justify-center"
              )}
            >
              <Icon
                name="calendar"
                color="#424141"
                size={28}
                style={tw.style("my-2")}
              />
              <View className="flex flex-col">
                <Text
                  style={tw.style("text-xl text-gray-500 text-center ml-2")}
                >
                  {newEvent.date.toString()}
                </Text>
              </View>
            </Pressable>
          </View>
          <View className="w-1/2 px-1">
            <Pressable
              onPress={() =>
                setShowDatePicker({
                  ...showDatePicker,
                  showTime: true,
                })
              }
              style={tw.style(
                "flex flex-row p-1 border border-gray-400 rounded-3xl w-full text-center items-center justify-center"
              )}
            >
              <Icon
                name="clock-outline"
                color="#424141"
                size={28}
                style={tw.style("my-2")}
              />
              <View className="flex flex-col">
                <Text
                  style={tw.style("text-xl text-gray-500 text-center ml-2")}
                >
                  {newEvent.time ? newEvent.time : formatTime(new Date())}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
        <ScrollView
          style={tw`mx-auto my-4 bg-transparent w-full px-3`}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {types.map((type, index) => {
            return (
              <Chip
                key={index}
                label={type}
                style={tw.style("ml-1")}
                onPress={() => onTypePress(type)}
                variant={newEvent.type === type ? "filled" : "outlined"}
                trailing={(props) => (
                  <Icon
                    name={newEvent.type === type ? "check" : null}
                    {...props}
                  />
                )}
              />
            );
          })}
        </ScrollView>
        <View className="w-full flex flex-row py-1">
          <View className="w-1/2 px-1">
            <TextInput
              label="No of Tickets"
              keyboardType="number-pad"
              value={newEvent.noOfTickets}
              onChangeText={(e) =>
                setNewEvent({
                  ...newEvent,
                  noOfTickets: e,
                })
              }
              style={tw.style("w-full")}
            />
          </View>
          <View className="w-1/2 px-1">
            <TextInput
              label="Maximum Per Person"
              keyboardType="number-pad"
              value={newEvent.maxPerPerson}
              onChangeText={(e) =>
                setNewEvent({
                  ...newEvent,
                  maxPerPerson: e,
                })
              }
              style={tw.style("w-full")}
            />
          </View>
        </View>
        <View className="w-full py-1">
          <TextInput
            label="Description"
            multiline
            numberOfLines={5}
            value={newEvent.description}
            onChangeText={(e) =>
              setNewEvent({
                ...newEvent,
                description: e,
              })
            }
            style={tw`w-full`}
            inputStyle={tw`rounded-xl`}
          />
        </View>
        <Button
          title="Update Banner"
          variant="text"
          color="#4577a9"
          style={tw.style("my-6 w-1/2 mx-auto")}
          onPress={() =>
            navigation.navigate("Edit Banner", {
              event: event,
            })
          }
          compact
        />
      </ScrollView>
      <DateTimePickerModal
        testID="dateTimePicker"
        isVisible={showDatePicker.showDate}
        mode="date"
        date={new Date(newEvent.date)}
        onChange={(date) => {
          setNewEvent({
            ...newEvent,
            date: formatDate(date),
          });
        }}
        onConfirm={(date) => {
          setNewEvent({
            ...newEvent,
            date: formatDate(date),
          });
          setShowDatePicker({
            ...showDatePicker,
            showDate: false,
          });
        }}
        onCancel={() => {
          setShowDatePicker({
            ...showDatePicker,
            showDate: false,
          });
        }}
      />
      <DateTimePickerModal
        testID="dateTimePicker"
        isVisible={showDatePicker.showTime}
        is24Hour={false}
        mode="time"
        date={new Date()}
        onChange={(date) => {
          setNewEvent({
            ...newEvent,
            time: formatTime(date),
          });
        }}
        onConfirm={(date) => {
          setNewEvent({
            ...newEvent,
            time: formatTime(date),
          });
          setShowDatePicker({
            ...showDatePicker,
            showTime: false,
          });
        }}
        onCancel={() => {
          setShowDatePicker({
            ...showDatePicker,
            showTime: false,
          });
        }}
      />
    </SafeAreaView>
  );
};

export default EditEvent;
