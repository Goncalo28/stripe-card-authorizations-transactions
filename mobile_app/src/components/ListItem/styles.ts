import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFF",
    marginVertical: 6,
    borderRadius: 5,
    marginHorizontal: 24,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    minHeight: 60,
    padding: 12,
    flex: 1,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  dateAndMerchantContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dateAndTimeContainer: {
    flexDirection: "column",
    width: 100,
    marginRight: 12,
  },
  date: { marginRight: 12, fontSize: 16 },
  title: {
    fontSize: 16,
  },
});

export default styles;
