import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { DashboardStackParamList } from "../types";

import { Dashboard } from "../../screens/Dashboard";
import { ActivityHistory } from "../../screens/ActivityHistory";

const Stack = createNativeStackNavigator<DashboardStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const options: NativeStackNavigationOptions = {
  headerShown: true,
  headerBackTitleVisible: false,
  headerTitle: "Activity",
};

export const DashboardNavigator = (): React.ReactElement => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen
        options={options}
        name="ActivityHistory"
        component={ActivityHistory}
      />
    </Stack.Navigator>
  );
};
