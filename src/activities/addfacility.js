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
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { styles } from "../../assets/css/style";
import { FACILITY_URL } from "../state/url";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const AddFacility = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [masterFacilities, setMasterFacilities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [distrValue, setDistrValue] = useState(null);
  const [ownerValue, setOwnerValue] = useState(null);

  const getFacilitiesFromMaster = async () => {
    const result = await axios.get(MASTER_FACILITY_URL);
    setMasterFacilities(result.data);
  };
  const getDistrictsFromMaster = async () => {
    const result = await axios.get(MASTER_DISTRICT_URL);
    setDistricts(result.data);
  };

  useEffect(() => {
    getFacilitiesFromMaster();
  }, []);

  useEffect(() => {
    getDistrictsFromMaster();
  }, []);

  const handleSignup = async (values) => {
    setLoading(true);
    const districtCode = masterFacilities.filter(
      (facility) => facility.district_code === values.district_code
    );
    const facilityCodeLength = 8 - districtCode.length;
    const facility_code = districtCode
      .concat(Math.random().toString(36).substring(facilityCodeLength))
      .join("");
    const data = {
      facility: {
        facility_code: facility_code,
        facility_name: values.name,
        district_id: distrValue,
        owner_id: ownerValue,
      },
    };
    try {
      const response = await axios.post(FACILITY_URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = response.data;
      const { success } = result;
      if (success) {
        setLoading(false);
        alert("facility registered");
        navigation.navigate("Dashboard");
      } else {
        setLoading(false);
        alert("Oops!. Seems there was an error. Please try again");
      }
    } catch (error) {
      setLoading(false);
      alert("Seems there is a network error");
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
              email: "",
              password: "",
              username: "",
            }}
            onSubmit={handleSignup}
          >
            {(props) => (
              <View style={styles.loginForm}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Register</Text>
                </View>
                <Text>Facility Name</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="text"
                  onChangeText={props.handleChange("name")}
                  value={props.values.name}
                />
                <Text>District</Text>
                <DropDownPicker data={districts} setValue={setDistrValue} />

                <Text>Owner</Text>
                <DropDownPicker data={owners} setValue={setOwnerValue} />

                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={props.handleSubmit}
                >
                  <Text style={styles.getStartedText}>Add Facility</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
        <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
      </View>
    </DismissKeyboard>
  );
};

export default AddFacility;
