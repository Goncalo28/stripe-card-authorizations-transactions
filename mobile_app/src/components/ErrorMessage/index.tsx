import React from "react";
import { Text } from "react-native";
import styles from "./styles";

interface IProps {
  error: string | any;
}

export const ErrorMessage = ({ error }: IProps): React.ReactElement => {
  return <Text style={styles.error}>{error}</Text>;
};
