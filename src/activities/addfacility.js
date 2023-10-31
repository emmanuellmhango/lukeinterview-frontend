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
import { Dropdown } from "react-native-element-dropdown";
import { setFacilities } from "../state/facilitySlice";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "../../assets/css/style";
import {
  FACILITY_URL,
  MASTER_FACILITY_URL,
  MASTER_DISTRICT_URL,
  MASTER_OWNER_URL,
} from "../state/url";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const AddFacility = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [masterFacilities, setMasterFacilities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [owners, setOwners] = useState([]);
  const [distrValue, setDistrValue] = useState(null);
  const [ownerValue, setOwnerValue] = useState(null);

  const getFacilitiesFromMaster = async () => {
    const result = await axios.get(MASTER_FACILITY_URL);
    setMasterFacilities(result.data);
  };
  const getOwnersFromMaster = async () => {
    const result = await axios.get(MASTER_OWNER_URL);
    setOwners(result.data);
  };
  const getDistrictsFromMaster = async () => {
    const result = await axios.get(MASTER_DISTRICT_URL);
    setDistricts(result.data);
  };

  useEffect(() => {
    getFacilitiesFromMaster();
  }, []);

  useEffect(() => {
    getOwnersFromMaster();
  }, []);

  useEffect(() => {
    getDistrictsFromMaster();
  }, []);

  const handleAddFacility = async (values) => {
    setLoading(true);
    const facilityCodeLength = 8 - distrValue.length;
    const randomNumber = Math.floor(
      10 ** (facilityCodeLength - 1) +
        Math.random() * 9 ** (facilityCodeLength - 1)
    );
    const facility_code = distrValue + randomNumber;
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
        dispatch(setFacilities(result.facilities));
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
            }}
            onSubmit={handleAddFacility}
          >
            {(props) => (
              <View style={styles.loginForm}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Register Facility</Text>
                </View>
                <Text>Facility Name</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="default"
                  onChangeText={props.handleChange("name")}
                  value={props.values.name}
                />
                <Text>District</Text>
                <Dropdown
                  style={styles.dropdown}
                  data={districts}
                  labelField="district_name"
                  valueField="district_code"
                  onChange={(item) => {
                    setDistrValue(item.district_code);
                  }}
                />

                <Text>Owner</Text>
                <Dropdown
                  style={styles.dropdown}
                  data={owners}
                  labelField="facility_owner"
                  valueField="id"
                  onChange={(item) => {
                    setOwnerValue(item.id);
                  }}
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
        </ScrollView>
        <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
      </View>
    </DismissKeyboard>
  );
};

export default AddFacility;
