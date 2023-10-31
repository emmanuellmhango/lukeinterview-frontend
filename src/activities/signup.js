import React, { useState } from "react";
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
import { USER_URL } from "../state/url";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Signup = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleSignup = async (values) => {
    setLoading(true);
    const data = {
      user: {
        name: values.name,
        email: values.email,
        password: values.password,
        username: values.username,
      },
    };
    try {
      const response = await axios.post(USER_URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = response.data;
      const { success } = result;
      if (success) {
        setLoading(false);
        alert("You have successfully signed up. Please login to continue.");
        navigation.navigate("Home");
      } else {
        setLoading(false);
        console.log(result);
        alert("Oops!. Seems there was an error. Please try again");
      }
    } catch (error) {
      setLoading(false);
      alert(
        "Seems the email is already registered. use another email or login"
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
                <Text>Name</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="default"
                  onChangeText={props.handleChange("name")}
                  value={props.values.name}
                />
                <Text>Email</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="email-address"
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                />
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
                  <Text style={styles.getStartedText}>Sign Up</Text>
                </TouchableOpacity>

                <View style={styles.bottomDiv}>
                  <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.signupTextFromLogin}>
                      Already registered? Login
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

export default Signup;
