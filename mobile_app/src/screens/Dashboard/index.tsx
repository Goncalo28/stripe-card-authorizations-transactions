import React, { useCallback } from "react";
import { ScrollView, RefreshControl, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-paper";

import {
  useGetAuthorizationsTransactionsQuery,
  useGetCardDetailsQuery,
} from "../../services/redux/api";

import { Card } from "../../components/Card";
import { RecentActivity } from "../../components/RecentActivity";
import { CustomBarChart } from "../../components/CustomBarChart";
import { Header } from "../../components/Header";
import { ErrorMessage } from "../../components/ErrorMessage";
import styles from "./styles";

export const Dashboard = (): React.ReactElement => {
  //rtk queries
  //un comment pollingInterval to re-fetch data every 1 minute
  //leaving it commented, we can refresh data by pulling down on screen

  const cardDetails = useGetCardDetailsQuery(undefined, {
    // pollingInterval: 60000,
  });

  const authorizationsTransactions = useGetAuthorizationsTransactionsQuery(
    {
      limit: 5,
    }
    // { pollingInterval: 60000 }
  );

  //fetching states
  const isLoadingInitially =
    authorizationsTransactions.isLoading && cardDetails.isLoading;
  const isFetchingNewData =
    authorizationsTransactions.isFetching && cardDetails.isFetching;

  const onRefresh = useCallback(() => {
    cardDetails.refetch();
    authorizationsTransactions.refetch();
  }, [cardDetails.refetch, authorizationsTransactions.refetch]);

  if (isLoadingInitially) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="rgb(44,43,219)" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingNewData}
            onRefresh={onRefresh}
          />
        }
      >
        {/* CARD */}
        <Card data={cardDetails.data} isLoading={isFetchingNewData} />
        {cardDetails.error && (
          <ErrorMessage error={"Error loading card details"} />
        )}

        {/* RECENT ACTIVITY */}
        <Header header={"Recent activity"} />
        {authorizationsTransactions.isError && (
          <ErrorMessage error={"Error loading authorizations transactions"} />
        )}

        <RecentActivity data={authorizationsTransactions.data?.data || []} />

        {/* BAR CHART */}
        <Header header={"Transaction categories"} />
        {cardDetails.error && (
          <ErrorMessage error={"Error loading categories"} />
        )}
        {cardDetails.data?.categories && (
          <CustomBarChart chartData={cardDetails.data.categories} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
