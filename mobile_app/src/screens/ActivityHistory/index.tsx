import React, { useState } from "react";
import { View, FlatList } from "react-native";

import {
  api,
  useGetAuthorizationsTransactionsQuery,
} from "../../services/redux/api";
import { httpGetAuthorizationTransactions } from "../../services/http";
import { useAppDispatch } from "../../store";

import { ListItem } from "../../components/ListItem";
import { ErrorMessage } from "../../components/ErrorMessage";
import styles from "./styles";

export const ActivityHistory = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { isError, data } = useGetAuthorizationsTransactionsQuery({
    limit: 5,
  });

  const [error, setError] = useState<boolean>(isError);
  const onEndReached = async () => {
    if (!data?.nextAuthorization) {
      return;
    }
    try {
      //fetch new data
      const response = await httpGetAuthorizationTransactions(
        5,
        data?.nextAuthorization
      );

      //updates list and cache
      dispatch(
        api.util.updateQueryData(
          "getAuthorizationsTransactions",
          { limit: 5 },
          (cachedData) => {
            if (!cachedData.nextAuthorization || !response.nextAuthorization) {
              cachedData.nextAuthorization = response.nextAuthorization;
              return;
            }
            if (cachedData.nextAuthorization !== response.nextAuthorization) {
              cachedData.data = [...cachedData.data, ...response.data];
              cachedData.nextAuthorization = response.nextAuthorization;
            }
          }
        )
      );
    } catch (error: any) {
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      {(error || isError) && (
        <ErrorMessage error={"Unable to load more data"} />
      )}
      <FlatList
        data={data?.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListItem item={item} />}
        onEndReached={onEndReached}
        contentContainerStyle={{ paddingBottom: 60 }}
        onEndReachedThreshold={0.3}
      />
    </View>
  );
};
