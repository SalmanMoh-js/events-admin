import React from "react";
import { Easing } from "react-native";
import "react-native-gesture-handler";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import BottomTab from "./bottomTab";
import NewEvent from "./newEvent";
import Event from "./event";
import EditEvent from "./editEvent";
import LoginScreen from "./login";
import Ticket from "./ticket";
import EventTickets from "./eventTicketsScreen";
import SetBannerScreen from "./setBannerScreen";

const Stack = createStackNavigator();
const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const closeConfig = {
  animation: "timing",
  config: {
    duration: 300,
    easing: Easing.linear,
  },
};
export default function AuthStack({ navigation }) {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen
        name="Main"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={BottomTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="New Event"
        component={NewEvent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Set Banner"
        component={SetBannerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Event"
        component={Event}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Event Tickets"
        component={EventTickets}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Ticket"
        component={Ticket}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name="Edit Event"
        component={EditEvent}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
