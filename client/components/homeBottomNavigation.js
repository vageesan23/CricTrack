import React, { useState, useEffect } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Button

} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import "react-native-gesture-handler";
import { useRef } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import plus from "../assets/plus.png";

import { HomePage } from "../containers/home/homePage";
import { UploadMenuCard } from "../containers/upload/uploadMenuCard";

import { getAuthenticatedToken, removeAuthenticatedToken } from "../cacheStore";
import jwt_decode from "jwt-decode";
import { getCurrentUser } from "../store/actions"
import { StatsTabs } from "./statsTabs";
import UserProfile from "../containers/profile/userprofile";


const Tab = createBottomTabNavigator();

function HomeBottomNavigation(props) {
  const [userId, setUserId] = useState("");
  const [actionBar, setActionBar] = useState(false);
  const tabOffsetValue = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    async function fetchId() {
      let token = await getAuthenticatedToken();
       var userInfo = jwt_decode(token);
       setUserId(userInfo.id);
       await props.getCurrentUser(userInfo.id);
    } 
      fetchId();
  }, [])

  
  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            backgroundColor: "white",
            position: "absolute",
            bottom: 0,
            height: 80,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            paddingHorizontal: 20,
          },
        }}
      >
        {
          
        }
        <Tab.Screen
          name={"Home"}
          component={HomePage}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: "absolute",
                  top: 20,
                }}
              >
                <FontAwesome5
                  name="home"
                  size={20}
                  color={focused ? "red" : "gray"}
                ></FontAwesome5>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
              setActionBar(false);
            },
          })}
        ></Tab.Screen>

        <Tab.Screen
          name={"Search"}
          component={EmptyScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  // centring Tab Button...
                  position: "absolute",
                  top: 20,
                }}
              >
                <FontAwesome5
                  name="search"
                  size={20}
                  color={focused ? "red" : "gray"}
                ></FontAwesome5>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
              setActionBar(false);
            },
          })}
        ></Tab.Screen>

        {
          // Extra Tab Screen For Action Button..
        }

        <Tab.Screen
          name={"ActionButton"}
          component={UploadMenuCard}
          options={{
            tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    width: 55,
                    height: 55,
                    backgroundColor: "#0da82f",
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: Platform.OS == "android" ? 50 : 30,
                  }}
                >
                  <Image               
                    source={plus}
                    style={{
                      width: 22,
                      height: 22,
                      tintColor: "white",
                    }}
                  ></Image>

                </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
                
              }).start();
              setActionBar(true);
            },
          })}
        ></Tab.Screen>

        <Tab.Screen
          name={"Stats"}
          component={StatsTabs}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  // centring Tab Button...
                  position: "absolute",
                  top: 20,
                }}
              >
                <FontAwesome5
                  name="chart-bar"
                  size={20}
                  color={focused ? "red" : "gray"}
                ></FontAwesome5>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3+20 ,
                useNativeDriver: true,
              }).start();
              setActionBar(false);
            },
          })}
        ></Tab.Screen>

        <Tab.Screen
          name={"User"}
          component={UserProfile}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  // centring Tab Button...
                  position: "absolute",
                  top: 20,
                }}
              >
                <FontAwesome5
                  name="user-alt"
                  size={20}
                  color={focused ? "red" : "gray"}
                ></FontAwesome5>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4+30,
                useNativeDriver: true,
              }).start();
              setActionBar(false);
            },
          })}
        ></Tab.Screen>
      </Tab.Navigator>

      <Animated.View
        style={{
          width: getWidth() - 20,
          height: 2,
          backgroundColor: actionBar ? "transparent": "red",
          position: "absolute",
          bottom: 78,
          left: 35,
          borderRadius: 20,
          transform: [{ translateX: tabOffsetValue }],
        }}
      ></Animated.View>
    </>
  );
}

function getWidth() {
  let width = Dimensions.get("window").width;

  // Horizontal Padding = 20...
  width = width - 80;

  // Total five Tabs...
  return width / 5;
}


function EmptyScreen() {

 return(
   <View>

   </View>
 )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    shotPredictLoading: state.shot.shotPredictLoading,
    currentUser:state.user.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCurrentUser,
    },
    dispatch
  );
};

HomeBottomNavigation = connect(mapStateToProps, mapDispatchToProps)(HomeBottomNavigation);

export { HomeBottomNavigation };