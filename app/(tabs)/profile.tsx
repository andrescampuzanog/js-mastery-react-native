import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

const Profile = () => {
  return (
    <View className="flex-1 px-10 bg-primary">
      <View className="flex flex-col flex-1 gap-5 justify-center items-center">
        <Image source={icons.person} className="size-10" tintColor="#Fff" />
        <Text className="text-base text-gray-500">Profile</Text>
      </View>
    </View>
  );
};

export default Profile;
