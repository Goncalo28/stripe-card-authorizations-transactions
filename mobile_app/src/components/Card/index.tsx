import React from "react";
import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { ICard } from "../../types";
import styles from "./styles";

interface IProps {
  data: ICard | undefined;
  isLoading: boolean;
}

export const Card = ({ data, isLoading }: IProps): React.ReactElement => {
  return (
    <View style={styles.container}>
      <View style={styles.totalSpendContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#FFFF" />
          </View>
        ) : (
          <Text style={styles.amount}>${data?.totalSpend || 0}</Text>
        )}
        <Text style={styles.text}>Total spend</Text>
      </View>
      <View style={styles.flex}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#FFFF" />
          </View>
        ) : (
          <Text style={styles.amount}>${data?.avgTransactionAmount || 0}</Text>
        )}
        <Text style={styles.text}>Avg. transaction</Text>
      </View>
    </View>
  );
};
