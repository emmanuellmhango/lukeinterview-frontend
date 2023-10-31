import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";
import store from "./src/state/store";
import Home from "./src/activities/home";
import Signup from "./src/activities/signup";
import Dashboard from "./src/activities/dashboard";
import AddFacility from "./src/activities/addfacility";
import SearchFacility from "./src/activities/search";
import FilterFacility from "./src/activities/filter";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#612cfe" />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: "#f5f5f5",
              },
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#f5f5f5",
              },
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AddFacility"
            component={AddFacility}
            options={{
              title: "Add Facility",
              headerStyle: {
                backgroundColor: "#612cfe",
              },
              headerTintColor: "#f5f5f5",
            }}
          />
          <Stack.Screen
            name="SearchFacility"
            component={SearchFacility}
            options={{
              title: "Search Facility",
              headerStyle: {
                backgroundColor: "#612cfe",
              },
              headerTintColor: "#f5f5f5",
            }}
          />
          <Stack.Screen
            name="FilterFacility"
            component={FilterFacility}
            options={{
              title: "Filter Facility",
              headerStyle: {
                backgroundColor: "#612cfe",
              },
              headerTintColor: "#f5f5f5",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
