import React from "react";
import { Text } from "react-native";
import styles from "./styles";

export const Header = ({ header }: { header: string }): React.ReactElement => {
  return <Text style={styles.text}>{header}</Text>;
};
