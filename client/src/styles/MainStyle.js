import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#8bf4e6",
  },
  boxContainer: {
    // flex: 1,
    // justifyContent: "center",
    // padding: 16,
    backgroundColor: "#8bf4e6",
  },
  inputContainer: {
    flexDirection: "row",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#19A974",
    borderWidth: 1,
    borderRadius: 10,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#8bf4e6",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#00CCFF",
    color: "#ffffff",
    padding: 10,
    marginTop: 16,
    marginLeft: 130,
    marginRight: 130,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingVertical: 10,
  },
  text: {
    color: "#111825",
    fontSize: 18,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  inputError: {
    color: "#E7040F",
    fontSize: 18,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  pickerInput: {
    fontSize: 8,
    height: 40,
    width: "100%",
    backgroundColor:"#ffff"
  },
  textInput: {
    borderRadius: 5,
    paddingLeft: 15,
    padding: 3,
    height: 40,
    width: "100%",
    textAlign:"center"
  },
  containerDatePicker: {
    // flex:1,
    backgroundColor: "#8bf4e6",
    // alignItems: 'center',
    justifyContent: "center",
    marginBottom: 10
  },
  screenContainer: {
    flex: 1,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 4,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  inputStyle: {
    flex: 1,
  },

});

export default styles;
