import React from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CustomBackArrow = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <AntDesign
        name="caretleft"
        size={24}
        style={{
          color: "#fff",
          marginLeft: 0,
          paddingLeft: 0,
        }}
      />
    </TouchableOpacity>
  );
};

export default CustomBackArrow;
