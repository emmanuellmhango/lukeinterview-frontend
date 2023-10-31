import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    height: "10%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingLeft: 5,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    width: "80%",
    height: 32,
  },
  loginBtn: {
    width: "50%",
    backgroundColor: "#612cfe",
    borderRadius: 27,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  signupTextFromLogin: {
    color: "#612cfe",
    justifyContent: "center",
    fontSize: 14,
  },
  dropdown: {
    margin: 16,
    height: 34,
    width: "80%",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingLeft: 5,
    borderRadius: 15,
    marginBottom: 10,
  },
  loginTestButton: {
    color: "#fff",
    fontWeight: "bold",
  },
  facilities: {
    height: "90%",
    backgroundColor: "#000",
  },
  headerControls: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    height: "10%",
    backgroundColor: "#612cfe",
    padding: 10,
  },
  filterText: {
    color: "#f5f5f5",
    fontSize: 16,
  },
  getStartedText: {
    color: "#f5f5f5",
    fontWeight: "bold",
    fontSize: 16,
  },
  facility: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  facilityName: {
    fontSize: 16,
    color: "#ccc",
  },
  loginForm: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomDiv: {
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
