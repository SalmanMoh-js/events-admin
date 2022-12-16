import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView, View, Text, StatusBar, ScrollView } from "react-native";
import tw from "twrnc";
import {
  Button,
  Pressable,
  TextInput,
  Chip,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import NewEventHeader from "../Components/newEventHeader";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getEvents, postEvent } from "../Actions/adminActions";
import { emptyErrors, resetUpdate } from "../Actions/auth";
import Toast from "react-native-fast-toast";
import { useRef } from "react";

const NewEvent = ({ navigation }) => {
  const errors = useSelector((state) => state.errors);
  const { isAuthenticated, dataUpdated, addDataLoading } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();
  const toast = useRef(null);
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
    name: "",
    venue: "",
    price: "",
    livePrice: "",
    address1: "",
    address2: "",
    date: formatDate(new Date()),
    time: "",
    type: "",
    prices: "",
    ticketTypes: "",
    noOfTickets: "",
    maxPerPerson: "",
    description: "",
  });
  const [showDatePicker, setShowDatePicker] = useState({
    showDate: false,
    showTime: false,
  });
  const [validated, setValidated] = useState(false);
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

  function onEventPost() {
    let eventData = newEvent;
    eventData.dateTime = new Date(eventData.date).getTime();
    console.log(eventData.dateTime);
    dispatch(postEvent(eventData));
  }
  useEffect(() => {
    if (!isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
      navigation.navigate("Main");
    }
  }, [isAuthenticated]);
  useEffect(() => {
    console.log(dataUpdated);
    if (dataUpdated === "event post") {
      dispatch(getEvents());
      toast.current.show("Event posted. You can set the banner.", {
        icon: <Icon name="check" size={20} color="white" />,
        placement: "bottom",
        type: "normal",
        duration: 4000,
        style: { padding: 0 },
        textStyle: { padding: 0 },
      });
      dispatch(resetUpdate());
    }
    if (Object.keys(errors).length !== 0) {
      toast.current.show("Unknown error", {
        icon: <Icon name="alert-circle-outline" size={20} color="white" />,
        placement: "bottom",
        type: "danger",
        duration: 4000,
        style: { padding: 0 },
        textStyle: { padding: 0 },
      });
      setTimeout(() => {
        dispatch(emptyErrors());
      }, 5000);
    }
  }, [dataUpdated, errors]);
  useEffect(() => {
    setValidated(
      Object.values(newEvent).every((value) => {
        if (!value.toString().trim().length || value === 0) {
          return false;
        }
        return true;
      })
    );
  }, [newEvent]);
  return (
    <SafeAreaView style={tw.style("h-full w-full bg-white")}>
      <StatusBar animated={true} backgroundColor="#403a4aff" />
      <Toast ref={toast} swipeEnabled={true} />
      <NewEventHeader />
      <ScrollView style={tw`mx-auto mt-4 bg-transparent w-full h-4/5 px-3`}>
        <View className="w-full flex flex-row py-1">
          <View className="w-1/2 px-1">
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
        </View>
        <View className="w-full flex flex-row py-1">
          <View className="w-1/2 px-1">
            <TextInput
              label="Standard Price"
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
          <View className="w-1/2 px-1">
            <TextInput
              label="Live Stream Price"
              keyboardType="number-pad"
              value={newEvent.livePrice}
              onChangeText={(e) =>
                setNewEvent({
                  ...newEvent,
                  livePrice: e,
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
          style={tw`mx-auto my-4 bg-transparent w-full`}
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
        <View className="w-full flex flex-row py-1">
          <View className="w-1/2 px-1">
            <TextInput
              label="More Ticket types"
              value={newEvent.ticketTypes}
              helperText="Comma separated"
              onChangeText={(e) =>
                setNewEvent({
                  ...newEvent,
                  ticketTypes: e,
                })
              }
              style={tw.style("w-full")}
            />
          </View>
          <View className="w-1/2 px-1">
            <TextInput
              label="Prices"
              keyboardType="number-pad"
              value={newEvent.prices}
              helperText="Comma separated"
              onChangeText={(e) =>
                setNewEvent({
                  ...newEvent,
                  prices: e,
                })
              }
              style={tw.style("w-full")}
            />
          </View>
        </View>
      </ScrollView>
      <Button
        title="Confirm"
        variant="contained"
        color="#4577a9"
        tintColor="white"
        style={tw.style("w-11/12 h-15 mx-auto mb-4")}
        titleStyle={tw`text-white text-xl font-bold my-auto`}
        contentContainerStyle={tw.style("h-full")}
        trailing={(props) => <Icon name="chevron-right" {...props} size={30} />}
        onPress={onEventPost}
        loading={addDataLoading}
        disabled={
          !validated ||
          (newEvent.ticketTypes.match(/,/g) || []).length !==
            (newEvent.prices.match(/,/g) || []).length
        }
      />
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

export default NewEvent;
