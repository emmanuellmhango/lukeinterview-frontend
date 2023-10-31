import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from "react-native";
import { Formik } from "formik";
import Spinner from "react-native-loading-spinner-overlay";
import { useSelector } from "react-redux";
import { styles } from "../../assets/css/style";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const SearchFacility = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [newFacilities, setNewFacilities] = useState(null);
  const { facilities } = useSelector((state) => state.facilities);

  const handleAddFacility = async (values) => {
    setLoading(true);

    const facility_name = values.name;

    const similarFacilities = facilities.filter((facility) =>
      facility.facility_name.toLowerCase().includes(facility_name.toLowerCase())
    );
    if (similarFacilities.length === 0) {
      setLoading(false);
      alert("No facility found with the supplied term");
    } else {
      setLoading(false);
      setNewFacilities(similarFacilities);
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
        >
          <Formik
            initialValues={{
              name: "",
            }}
            onSubmit={handleAddFacility}
          >
            {(props) => (
              <View style={styles.loginForm}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Search Facility</Text>
                </View>
                <TextInput
                  style={styles.input}
                  keyboardType="text"
                  placeholder="Facility Name"
                  onChangeText={props.handleChange("name")}
                  value={props.values.name}
                />

                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={props.handleSubmit}
                >
                  <Text style={styles.getStartedText}>Add Facility</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>

          {newFacilities ||
            (newFacilities > 0 &&
              newFacilities.map((facility) => (
                <View key={facility.id} style={styles.facility}>
                  <Text style={styles.facilityName}>
                    {facility.facility_code}
                  </Text>
                  <Text style={styles.facilityName}>
                    {facility.facility_name}
                  </Text>
                </View>
              )))}
        </ScrollView>
        <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
      </View>
    </DismissKeyboard>
  );
};

export default SearchFacility;
