import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { useScrollToTop } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "./homeScreen";
import Scanner from "./scanner";
import Profile from "./profile";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Tab.Screen
        name="Landing"
        component={HomeScreen}
        options={{
          tabBarIcon: (props) => <Octicons name="home" size={20} {...props} />,
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={Scanner}
        options={{
          tabBarIcon: (props) => (
            <Icon name="card-bulleted-outline" size={20} {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: (props) => <AntDesign name="user" size={20} {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}
