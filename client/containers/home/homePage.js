import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import { getLatestStats } from "../../store/actions";
import Header from "../../components/header";
import BoxContainer from "../../components/BoxContainer";
import { getUserId, loadFonts, SHOTS } from "../../util";
import { filter, size, sum, isEmpty, map } from "../../lodash";
import Lottie from "../../components/LottieFiles";
import { images } from "../../constants";



class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shotDetails: {},
    };
  }

  async componentDidMount() {
    const { getLatestStats } = this.props;
    let userId = await getUserId();
    await Promise.all([getLatestStats(userId), loadFonts()]);
  }


  render() {
    const { currentUser, latestStats } = this.props;



    return (
      <View>
        <View>
          <Header
            customStyles={styles.svgCurve}
            customHeight={100}
            customTop={0}
            customBgColor="#0da82f"
            header="Latest Stats"
            currentUser={currentUser}
          />
        </View>

        <BoxContainer style={styles.boxContainer}>
          {!isEmpty(latestStats) ? (
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Poppins", marginBottom: 30  }}>
                Batting Performance
              </Text>

              {map(SHOTS,(shotName)=>{
                return(
                  <PercentageForEachShot
                  shotName={shotName}
                  {...this.props}
                />
                )
              })}
  
            </View>
          ) : (
            <View style={styles.lottie}>
              <Text style={{ textAlign: "center" }}>
                Please Wait Fetching Data
              </Text>
              <Lottie source={images.fetchDataLoader} />
            </View>
          )}
        </BoxContainer>
      </View>
    );
  }
}

class PercentageForEachShot extends Component {

  
  render(){
    const {shotName,latestStats}=this.props;

    let filteredShots = filter(
      latestStats,
      (i) => i.shotType === shotName
      );
    let numberOfShot = "",
      percentage = [],
      average = "";
    if (filteredShots) {
      numberOfShot = size(filteredShots);

      for (const item of filteredShots) {
        percentage.push(parseInt(item.accuracy));
      }

      average = sum(percentage) / numberOfShot;
      average=parseFloat(average).toFixed(2);
    }


    return(
      <View style={styles.shotInfo}>
      <Text style={{ fontSize: 15, fontFamily: "Poppins-Light" }}>
      {shotName}
      </Text>
      <View style={styles.yellowContainer}>
        <View style={styles.percentage}>
          <Text style={styles.textStyle}>
            {average ? `${average} %` : "-"} 
          </Text>
        </View>
        <View style={styles.numberofshots}>
          <Text style={styles.textStyle}>{numberOfShot=== 0 ? "-" : `${numberOfShot} Shots`} </Text>
        </View>
      </View>
    </View>
    )
  }
}


const styles = StyleSheet.create({
  shotInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  lottie: {
    height: 190,
  },
  percentage: {
    width: 100,
    height: 30,
    backgroundColor: "#FFBA82",
    borderRadius: 8,
  },

  numberofshots: {
    width: 100,
    height: 30,
    backgroundColor: "#FFBA82",
    borderRadius: 8,
    marginTop: 3,
  },
  textStyle: {
    marginTop: 3,
    fontSize: 14,
    fontFamily: "Poppins",
    color: "black",
    textAlign: "center",
  },

  yellowContainer: {
    display: "flex",
    flexDirection: "column",
  },
  boxContainer: {
    backgroundColor: "#fff",
    marginTop: 85,
    padding: 20,
    height: 480,
  },
  svgCurve: {
    position: "absolute",
    width: Dimensions.get("window").width,
  },
  headerContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    textAlign: "left",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#ffffff",
    textAlign: "left",
  },
});
const mapStateToProps = (state) => {
  return {
    shotPredictLoading: state.shot.shotPredictLoading,
    currentUser: state.user.currentUser,
    latestStats: state.shot.latestStats,
    latestStatsLoading: state.shot.latestStatsLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getLatestStats,
    },
    dispatch
  );
};
HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export { HomePage };
