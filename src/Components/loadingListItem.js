import tw from "twrnc";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Surface,
  Button,
  Badge,
  Pressable,
  Avatar,
  Divider,
} from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Skeleton } from "@rneui/themed";
import { Text, View } from "react-native";

const LoadingListItem = ({ event, loading }) => {
  return (
    <View
      style={tw.style(
        "w-full rounded-2xl flex flex-col p-3 justify-between my-1 mt-2 bg-white shadow-md"
      )}
    >
      <View>
        <View className="flex flex-row justify-between mb-2">
          <Skeleton
            animation="wave"
            width={160}
            height={20}
            style={tw.style("rounded-md bg-gray-200")}
          />
          <Skeleton
            animation="wave"
            width={40}
            height={20}
            style={tw.style("rounded-md bg-gray-200")}
          />
        </View>
        <View className="flex flex-row justify-between">
          <View className="flex flex-row">
            <View className="flex flex-row my-auto">
              <Skeleton
                animation="wave"
                circle
                width={50}
                height={50}
                style={tw.style("bg-gray-200")}
              />
              <View className="flex flex-col ml-3">
                <View className="flex flex-col mt-2">
                  <View className="flex flex-row">
                    <Skeleton
                      animation="wave"
                      width={90}
                      height={20}
                      style={tw.style("rounded-md ml-1 bg-gray-200")}
                    />
                  </View>
                  <View className="flex flex-row mt-2">
                    <Skeleton
                      animation="wave"
                      width={90}
                      height={20}
                      style={tw.style("rounded-md ml-1 bg-gray-200")}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Skeleton
            animation="wave"
            width={50}
            height={20}
            style={tw.style("rounded-md my-auto bg-gray-200")}
          />
        </View>
      </View>
    </View>
  );
};

export default LoadingListItem;
