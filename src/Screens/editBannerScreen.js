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
import { useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../Actions/types";
import axios from "axios";
import Toast from "react-native-fast-toast";

const EditBannerScreen = ({ navigation, route }) => {
  const { isAuthenticated } = useSelector((state) => state.data);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false);
  const toast = useRef(null);
  const { event } = route.params;
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
  const updateBanner = async () => {
    setLoading(true);
    const bannerData = new FormData();
    bannerData.append("banner", {
      name: event.name + new Date() + "_banner",
      uri: image.uri,
      type: "image/jpg",
    });
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        "x-auth-token": await AsyncStorage.getItem("token"),
      },
      onUploadProgress: ({ loaded, total }) =>
        setProgress(parseInt((loaded / total) * 100)),
    };
    try {
      const res = await axios.post(
        `${URL}/api/event/set-banner/${event.id}`,
        bannerData,
        config
      );
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
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
      toast.current.show(
        "Event banner updated. Refresh event to see updates.",
        {
          icon: <Icon name="check" size={20} color="white" />,
          placement: "bottom",
          type: "normal",
          duration: 3000,
          style: { padding: 0 },
          textStyle: { padding: 0 },
        }
      );
      setTimeout(() => {
        navigation.goBack();
      }, 3000);
    }
  }, [event, success, errors]);
  return (
    <SafeAreaView style={tw.style("h-full w-full bg-white flex items-center")}>
      <Toast ref={toast} swipeEnabled={true} />
      <StatusBar animated={true} backgroundColor="#403a4aff" />
      <SetBannerHeader mode="edit" />
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
                  : event.banner
                  ? event.banner
                  : "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg",
              }}
              className="w-full h-60 rounded-3xl"
            />
          </TouchableOpacity>
          <Button
            title={progress ? `${progress}%` : "Update"}
            variant="contained"
            color="#4577a9"
            tintColor="white"
            style={tw.style("w-1/2 mx-auto my-6")}
            loading={loading}
            onPress={updateBanner}
            disabled={loading || progress}
          />
        </View>
      </View>
      <Button
        title="skip"
        variant="text"
        color="#4577a9"
        style={tw.style("absolute bottom-4 w-1/2 mx-auto")}
        onPress={() => navigation.navigate("Home")}
        compact
      />
    </SafeAreaView>
  );
};

export default EditBannerScreen;
