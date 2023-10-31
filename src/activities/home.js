import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";

import Spinner from "react-native-loading-spinner-overlay";
import { setUser } from "../state/userSlice";
import { styles } from "../../assets/css/style";
import { USER_URL } from "../state/url";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    setLoading(true);
    const data = {
      username: values.username,
      password: values.password,
    };

    try {
      const response = await axios.get(
        USER_URL,
        { params: data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { success, user } = response.data;

      if (success) {
        setLoading(false);
        dispatch(setUser(user));
        navigation.navigate("Dashboard");
      } else {
        setLoading(false);
        alert("Oops!. Seems the provided details are wrong. Please try again");
      }
    } catch (error) {
      setLoading(false);
      alert("Seems there is network problem. Please try again");
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
            initialValues={{ username: "", password: "" }}
            onSubmit={handleLogin}
          >
            {(props) => (
              <View style={styles.loginForm1}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Login</Text>
                </View>
                <Text>Username</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="default"
                  onChangeText={props.handleChange("username")}
                  value={props.values.username}
                />
                <Text style={styles.textLeft}>Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                />

                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={props.handleSubmit}
                >
                  <Text style={styles.getStartedText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.bottomDiv}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Signup")}
                  >
                    <Text style={styles.signupTextFromLogin}>
                      New Account? Sign up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
        <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
      </View>
    </DismissKeyboard>
  );
};

export default Home;
