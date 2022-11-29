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
import ScannerHeader from "../Components/scannerHeader";
import { BarCodeScanner } from "expo-barcode-scanner";
import { ScrollView } from "react-native";
import TicketListItem from "../Components/ticketListItem";
import LoadingTicketListItem from "../Components/loadingTicketListItem";
import { getTickets } from "../Actions/adminActions";
import { emptyErrors } from "../Actions/auth";
import Toast from "react-native-fast-toast";
import { RefreshControl } from "react-native";

const Scanner = ({ navigation }) => {
  const { tickets, loading, isAuthenticated } = useSelector(
    (state) => state.data
  );
  const errors = useSelector((state) => state.errors);
  const [hasPermission, setHasPermission] = useState(null);
  const [startScan, setStartScan] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [scrolling, setScrolling] = useState("");
  const dispatch = useDispatch();
  const toast = useRef(null);
  useEffect(() => {
    setFilteredTickets(
      tickets.filter(
        (ticket) =>
          ticket.holderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.id.toString().includes(searchQuery)
      )
    );
  }, [searchQuery]);
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
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

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
    dispatch(getTickets());
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(data);
    const scanned = tickets.filter((ticket) => ticket.id === parseInt(data));
    navigation.navigate("Ticket", {
      ticket: scanned[0],
    });
    setScanned(false);
    setStartScan(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const scanOverlay = {
    position: "absolute",
    backgroundColor: "rgba(9,0,0,0.5)",
  };
  return (
    <SafeAreaView
      style={tw.style("h-full w-full bg-slate-100 flex items-center")}
    >
      <Toast ref={toast} swipeEnabled={true} />
      <StatusBar animated={true} backgroundColor="#403a4aff" />
      <ScannerHeader />
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
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                dispatch(getTickets());
              }}
            />
          }
        >
          {loading ? (
            <LoadingFunc />
          ) : (
            filteredTickets.map((ticket) => {
              return <TicketListItem ticket={ticket} key={ticket.id} />;
            })
          )}
        </ScrollView>
      </Surface>
      {startScan ? (
        <View style={StyleSheet.absoluteFill}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={tw.style("w-full h-full")}
          />
          <View
            style={[scanOverlay, { top: 0, left: 0, width: "20%", bottom: 0 }]}
          />
          <View
            style={[
              scanOverlay,
              { top: 0, left: "20%", width: "60%", height: "33%", bottom: 0 },
            ]}
          />
          <View
            style={[
              scanOverlay,
              { left: "20%", width: "60%", height: "33%", bottom: 0 },
            ]}
          />
          <View
            style={[scanOverlay, { top: 0, right: 0, width: "20%", bottom: 0 }]}
          />
        </View>
      ) : null}
      <View className="absolute bottom-0 w-full flex items-center overflow-hidden">
        {startScan ? (
          <FAB
            icon="close"
            color="white"
            style={tw.style("mb-4", {
              backgroundColor: "#4577a9",
            })}
            onPress={() => setStartScan(false)}
          />
        ) : (
          <FAB
            icon="qrcode-scan"
            color="white"
            style={tw.style(scrolling ? "-mb-16" : "mb-4", {
              backgroundColor: "#4577a9",
            })}
            onPress={() => setStartScan(true)}
          />
        )}
      </View>
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
export default Scanner;
