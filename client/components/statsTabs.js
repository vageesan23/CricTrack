import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, StyleSheet,  Dimensions } from "react-native";

import Header from "./header";


const screenWidth = Dimensions.get("window").width;
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { BattingStats } from "../containers/batting";
const Tab = createMaterialTopTabNavigator();


class StatsTabs extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    render() {
      return (
        <View style={styles.container}>
            <View>
            <Header
              customStyles={styles.svgCurve}
              customHeight={100}
              customTop={0}
              customBgColor="#0da82f"
              header="Performance"
            />
          </View>
          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle: { fontSize: 12 },
              tabBarItemStyle: { width: 100 },
              tabBarStyle: { backgroundColor: "powderblue" },
            }}
          >
            <Tab.Screen name="Batting Stats" component={BattingStats} />
            {/* <Tab.Screen name="Bowling Stats" component={EmptyScreen} /> */}
          </Tab.Navigator>
        </View>
      );
    }
  }


  function EmptyScreen() {

    return(
      <View>
   
      </View>
    )
   }
  
  const styles = StyleSheet.create({
    svgCurve: {
      position: "absolute",
      width: Dimensions.get("window").width,
    },
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
    }
   
  });
  
  const mapStateToProps = (state) => {
    return {
      shotPredictLoading: state.shot.shotPredictLoading,
      userBattingStatsLoading: state.shot.userBattingStatsLoading,
      userBattingStats: state.shot.userBattingStats,
      currentUser:state.user.currentUser
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      {
    
      },
      dispatch
    );
  };
  
  StatsTabs = connect(mapStateToProps, mapDispatchToProps)(StatsTabs);
  
  export { StatsTabs };
  