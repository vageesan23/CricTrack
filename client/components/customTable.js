import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Table from "react-native-flex-table";
import { map } from "../lodash";

const CustomTable = (props) => {
  return (
    <View style={styles.container}>
      <Table style={{ borderWidth: 1, borderRadius: 5, overflow: "hidden" }}>
        <Table.Header style={{backgroundColor: '#ECECEC'}}>
          <Table.Column>Shot Type</Table.Column>
          <Table.Column>Percentage </Table.Column>
          <Table.Column>Date Achieved</Table.Column>
        </Table.Header>

        {map(props.data, (obj) => {
          return (
            <Table.Row style={{height: 40,justifyContent:'center'}}>
              <Table.Column style={styles.borderCSS}><Text>{obj.shotType}</Text></Table.Column>
              <Table.Column  style={styles.borderCSS}><Text>{obj.percentage} %</Text></Table.Column>
              <Table.Column  style={styles.borderCSS}><Text>{obj.date} </Text></Table.Column>
            </Table.Row>
          );
        })}
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  borderCSS:{
   borderTopColor: "#B0B0B000",
    borderBottomColor: "#B0B0B000",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth:0
  }
  
});

export default CustomTable;
