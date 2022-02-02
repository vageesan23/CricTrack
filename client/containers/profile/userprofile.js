import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { userAuthenticated } from "./store/actions";
import { StyleSheet, Text, View, Button } from "react-native";
import { userSignout } from "../../store/actions";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async signOut() {
    const { userSignout } = this.props;
    await userSignout();
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="Signout" onPress={()=>this.signOut()}></Button>
      </View>
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
      userSignout,
    },
    dispatch
  );
};

UserProfile = connect(mapStateToProps, mapDispatchToProps)(UserProfile);

export { UserProfile };
