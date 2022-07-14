import React from "react";
import { Text, View, ViewStyle } from "react-native";
import styles from "./styles";

interface IProps {
  item: any;
  containerStyle?: ViewStyle;
}

export class ListItem extends React.PureComponent<IProps> {
  render() {
    const { type, merchantName, amount, approved, date, time } =
      this.props.item;
    const hasApprovedProperty = this.props.item.hasOwnProperty("approved");

    const dollarAmount =
      type === "issuing.transaction" ? `-$${amount}` : `$${amount}`;

    const approvedOrDeclined = approved ? "Approved" : "Declined";
    const approvedOrDeclinedColor = approved ? "#27e449" : "#e85757";

    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <View style={styles.dateAndMerchantContainer}>
          <View style={styles.dateAndTimeContainer}>
            <Text style={styles.title}>{date}</Text>
            <Text style={styles.title}>{time}</Text>
          </View>
          <Text style={[styles.title, { flex: 1 }]}>{merchantName}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.title}>{dollarAmount}</Text>
          {hasApprovedProperty && (
            <Text style={[styles.title, { color: approvedOrDeclinedColor }]}>
              {approvedOrDeclined}
            </Text>
          )}
        </View>
      </View>
    );
  }
}
