import React, { Component } from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Register } from "./containers/auth/index";

import {HomeBottomNavigation} from "./components/homeBottomNavigation";
import { ShowPrediction, ShowStance } from "./containers/batting/index";
// bowling screens
import {
  ShowBowlingPrediction,
  BowlingHomeScreen,
} from "./containers/bowling/index";
import { HomePage,WelcomePage } from "./containers/home/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userAuthenticated } from "./store/actions";
import { loadFonts } from "./util";
import { StatsTabs } from "./components/statsTabs";


export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
    };
  }

  async componentDidMount() {
    await loadFonts();
   }
  

  async componentDidMount() {
    const { userAuthenticated } = this.props;
    await userAuthenticated();

    this.setState({
      authenticated: this.props.authenticatedUser,
    });
  }

  componentDidUpdate(prevProps) {
    const { authenticatedUser } = this.props;
    if (prevProps.authenticatedUser !== authenticatedUser) {
      this.setState({
        authenticated: authenticatedUser,
      });
    }
  }

  render() {
    const Stack = createStackNavigator();
    const { authenticatedUser } = this.props;
    console.log('authenticatedUser :', authenticatedUser);

    return (
      <NavigationContainer>
        {authenticatedUser ? (
          <Stack.Navigator initialRouteName="HomePage">
            <Stack.Screen
              name="HomePage"
              component={HomeBottomNavigation}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Home"
              component={HomePage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="show"
              component={ShowPrediction}
              options={{
                headerShown: false,
              }}
            />

              <Stack.Screen
              name="stancePrediction"
              component={ShowStance}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="stats"
              component={StatsTabs}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="bowlingHome"
              component={BowlingHomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="bowlingPrediction"
              component={ShowBowlingPrediction}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen
              name="Welcome"
              component={WelcomePage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
});


const mapStateToProps = (state) => {
    return {
      authenticatedUser: state.user.authenticatedUser,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      {
        userAuthenticated 
      },
      dispatch
    );
  };
  
  Index = connect(mapStateToProps, mapDispatchToProps)(Index);
  
  export { Index };
  