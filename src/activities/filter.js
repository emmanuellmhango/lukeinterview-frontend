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
import { useSelector } from "react-redux";
import { Formik } from "formik";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { Dropdown } from "react-native-element-dropdown";
import { styles } from "../../assets/css/style";
import {
  FACILITY_URL,
  MASTER_DISTRICT_URL,
  MASTER_OWNER_URL,
} from "../state/url";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const FilterFacility = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [owners, setOwners] = useState([]);
  const [distrValue, setDistrValue] = useState(null);
  const [ownerValue, setOwnerValue] = useState(null);
  const [newFacilities, setNewFacilities] = useState(null);
  const { facilities } = useSelector((state) => state.facilities);

  const getOwnersFromMaster = async () => {
    const result = await axios.get(MASTER_OWNER_URL);
    setOwners(result.data);
  };
  const getDistrictsFromMaster = async () => {
    const result = await axios.get(MASTER_DISTRICT_URL);
    setDistricts(result.data);
  };

  useEffect(() => {
    getOwnersFromMaster();
  }, []);

  useEffect(() => {
    getDistrictsFromMaster();
  }, []);

  const handleAddFacility = async (values) => {
    setLoading(true);

    const district_id = distrValue;
    const owner_id = ownerValue;

    if (district_id !== null || owner_id !== null) {
      const similarFacilities = facilities.filter((facility) => {
        const districtMatches =
          district_id !== null ? facility.district_id === district_id : true;
        const ownerMatches =
          owner_id !== null ? facility.owner_id === owner_id : true;
        return districtMatches && ownerMatches;
      });

      if (similarFacilities.length === 0) {
        setLoading(false);
        alert("No facility found with the supplied term");
      } else {
        setLoading(false);
        setNewFacilities(similarFacilities);
      }
    } else {
      setLoading(false);
      alert(
        "Both district_id and owner_id are null. Please provide at least one of them."
      );
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
                  <Text style={styles.headerText}>Filter Facility By</Text>
                </View>

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
                  <Text style={styles.getStartedText}>Filter results</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <View style={styles.dataResults2}>
            {newFacilities && newFacilities.length > 0 && (
              <View style={styles.searchResults}>
                <Text style={styles.headerText2}>Search Results</Text>
              </View>
            )}
            <View style={styles.searchResultsresults}>
              {newFacilities &&
                newFacilities.length > 0 &&
                newFacilities.map((facility) => (
                  <TouchableOpacity key={facility.id}>
                    <View style={styles.facility}>
                      <Text style={styles.facilityName}>
                        {facility.facility_code}
                      </Text>
                      <Text style={styles.facilityName}>
                        {facility.facility_name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        </ScrollView>
        <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
      </View>
    </DismissKeyboard>
  );
};

export default FilterFacility;
