import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import {Index} from "./index";
import { checkConnected } from "./util";
import NoConnectionScreen from "./components/noInternetConnection";
import NetInfo from '@react-native-community/netinfo';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectStatus:false
    };
  }


  componentDidMount(){
     checkConnected().then(res=>{
      this.setState({
        connectStatus:res
      })
    })
  }
  
  onReload(){
    NetInfo.fetch().then(state=>{
      this.setState({
        connectStatus : state.isConnected
      })
    });
  }

  render() {
    const {connectStatus} = this.state;
    return (
      <Provider store={store}>
        {connectStatus ? <Index connectStatus={connectStatus} {...this.props} /> : <NoConnectionScreen onReload={this.onReload()} />}
      </Provider>
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
