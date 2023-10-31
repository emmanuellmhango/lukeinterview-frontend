import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { styles } from "../../assets/css/style";
// import { FACILITY_URL } from "../state/url";
import { MASTER_FACILITY_URL } from "../state/url";
import { setFacilities } from "../state/facilitySlice";

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const { facilities } = useSelector((state) => state.facilities);
  const [loading, setLoading] = useState(false);

  const getFacilities = async () => {
    const result = await axios.get(MASTER_FACILITY_URL);
    const { success, facilities } = result.data;
    if (success) {
      dispatch(setFacilities(facilities));
    } else {
      alert("Oops!. Seems there are no facilities");
    }
  };

  useEffect(() => {
    getFacilities();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
      >
        <View style={styles.loginForm}>
          <View style={styles.headerControls}>
            <TouchableOpacity
              onPress={() => navigation.navigate("AddFacility")}
            >
              <Text style={styles.filterText}>Add Facility</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <Text style={styles.filterText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Filter")}>
              <Text style={styles.filterText}>Filter</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.facilities}>
            {facilities &&
              facilities.map((facility) => (
                <View key={facility.id} style={styles.facility}>
                  <Text style={styles.facilityName}>
                    {facility.facility_code}
                  </Text>
                  <Text style={styles.facilityName}>
                    {facility.facility_name}
                  </Text>
                  <Text style={styles.facilityPhone}>{facility.phone}</Text>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
      <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
    </View>
  );
};

export default Dashboard;