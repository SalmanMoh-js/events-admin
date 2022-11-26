import React from "react";
import { useDispatch } from "react-redux";
import { View } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-fast-toast";
import { Skeleton } from "@rneui/themed";

const LoadingTicketListItem = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View
      style={tw.style(
        "w-full rounded-2xl flex flex-row justify-between my-1 mt-2 bg-transparent shadow-md"
      )}
    >
      <View
        style={tw.style("w-2/5 h-28 bg-white rounded-md flex flex-col", {
          borderRightWidth: 2,
          borderColor: "#4577a9",
          borderStyle: "dashed",
        })}
      >
        <Skeleton
          animation="wave"
          width={50}
          height={30}
          style={tw.style("rounded-md bg-gray-200 m-auto")}
        />
        <View className="w-full flex flex-row p-2">
          <Skeleton
            animation="wave"
            width={130}
            height={20}
            style={tw.style("rounded-md bg-gray-200")}
          />
        </View>
      </View>
      <View className="w-3/5 bg-white rounded-md flex flex-col p-2">
        <Skeleton
          animation="wave"
          width={160}
          height={20}
          style={tw.style("rounded-md bg-gray-200")}
        />
        <View className="w-full flex flex-row py-2 justify-between">
          <View className="flex flex-row">
            <Skeleton
              animation="wave"
              width={130}
              height={15}
              style={tw.style("rounded-md bg-gray-200")}
            />
          </View>
        </View>
        <Skeleton
          animation="wave"
          width={110}
          height={20}
          style={tw.style("rounded-md bg-gray-200")}
        />
      </View>
    </View>
  );
};

export default LoadingTicketListItem;
