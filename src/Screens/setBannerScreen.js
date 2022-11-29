import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import { Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { getEvents, postEvent } from "../Actions/adminActions";
import mime from "mime";
import { emptyErrors, resetUpdate } from "../Actions/auth";
import SetBannerHeader from "../Components/setBannerHeader";

const SetBannerScreen = ({ navigation, route }) => {
  const errors = useSelector((state) => state.errors);
  const { isAuthenticated, dataUpdated, addDataLoading } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();
  const { event } = route.params;
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  function onEventPost() {
    // eventData.append("banner", {
    //   name: image.fileName,
    //   type: image.type,
    //   uri: Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
    // });
    dispatch(postEvent(newEvent));
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
      navigation.goBack();
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
  return (
    <SafeAreaView style={tw.style("h-full w-full bg-white flex items-center")}>
      <StatusBar animated={true} backgroundColor="#403a4aff" />
      <SetBannerHeader />
      <View className="flex flex-col justify-between my-3 h-full p-3 w-full">
        <View>
          <TouchableOpacity
            onPress={pickImage}
            style={tw.style(
              "flex-col border border-gray-400 rounded-3xl w-full text-center items-center justify-center"
            )}
          >
            <Image
              source={{
                uri: image
                  ? image.uri
                  : "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg",
              }}
              className="w-full h-60 rounded-3xl"
            />
          </TouchableOpacity>
          <Button
            title="Upload"
            variant="contained"
            color="#4577a9"
            tintColor="white"
            style={tw.style("w-1/2 mx-auto my-6")}
            loading={addDataLoading}
          />
        </View>
      </View>
      <Button
        title="skip"
        variant="text"
        color="#4577a9"
        style={tw.style("absolute bottom-4 w-1/2 mx-auto")}
        loading={addDataLoading}
        onPress={() => navigation.navigate("Home")}
        compact
      />
    </SafeAreaView>
  );
};

export default SetBannerScreen;
