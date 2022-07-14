import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(24,26,29)",
    width: "80%",
    alignSelf: "center",
    borderRadius: 10,
    marginVertical: 24,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    elevation: 2,
    padding: 24,
  },
  totalSpendContainer: {
    flex: 1,
    marginBottom: 24,
    marginTop: -6,
  },
  amount: {
    color: "#ffff",
    fontSize: 24,
    fontWeight: "600",
  },
  text: { color: "#ffff", fontSize: 15 },
  loadingContainer: { alignItems: "flex-start", marginBottom: 5 },
  flex: { flex: 1 },
});

export default styles;
