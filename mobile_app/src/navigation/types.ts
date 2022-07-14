import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
};

export type DashboardStackParamList = {
  Dashboard: undefined;
  ActivityHistory: undefined;
};

export type DashboardScreenNavigationProp = NativeStackNavigationProp<
  DashboardStackParamList,
  "ActivityHistory"
>;
