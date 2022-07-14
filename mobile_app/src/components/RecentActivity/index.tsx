import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { DashboardScreenNavigationProp } from "../../navigation/types";
import { IAuthorization, ITransaction } from "../../types";

import { ListItem } from "../ListItem";
import styles from "./styles";

interface IProps {
  data: IAuthorization[] | ITransaction[];
}

export const RecentActivity = ({ data }: IProps): React.ReactElement => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  return (
    <View style={styles.innerContainer}>
      {data.slice(0, 5).map((item) => {
        return (
          <ListItem
            item={item}
            key={item.id}
            containerStyle={styles.itemContainer}
          />
        );
      })}

      {/* GO TO ACTIVITY HISTORY */}
      <TouchableOpacity
        onPress={() => navigation.navigate("ActivityHistory")}
        style={styles.touchable}
      >
        <Text style={styles.seeAll}>See All</Text>
      </TouchableOpacity>
    </View>
  );
};
