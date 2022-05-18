import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, StyleSheet, Text, Dimensions, ScrollView } from "react-native";

import { LineChart, BarChart, PieChart } from "react-native-chart-kit";

import { isEmpty } from "../../lodash";
import SelectDropdown from "react-native-select-dropdown";
import Animated from "react-native-reanimated";
import { getUserBattingStats, getAverageShot } from "../../store/actions";
import moment from "moment";

import Lottie from "../../components/LottieFiles";
import { images } from "../../constants";

import { uniq } from "lodash";

const screenWidth = Dimensions.get("window").width;

const shots = ["Cover Drive", "Pull Shot", "Straight Drive","Scoop Shot","Cut Shot","Leg glance Shot"];


const vcdata = [
  {
    name: "Cover Drive",
    population: 25.32,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12
  },
  {
    name: "Straight Drive",
    population: 45.56,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12
  },
  {
    name: "Pull Shot",
    population: 45.66,
    color: "green",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12
  },
  {
    name: "Straight Drive",
    population: 21.1,
    color: "",
    legendFontColor: "pink",
    legendFontSize: 12
  },
  {
    name: "Scoop Shot",
    population: 99.2,
    color: "rgb(4, 0, 20)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12
  }
];
class BattingStats extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date:"2016-05-15",
      data: {
        labels: [0, 0, 0, 0],
        datasets: [
          {
            data: [0, 0, 0, 0],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            strokeWidth: 2,
          },
        ],
      },
      chartConfig: {
        backgroundGradientFrom: "#324fa6",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#001f73",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `#001f73`,
        strokeWidth: 2,
        barPercentage: 0.2,
        useShadowColorFromDataset: false,
      },
      shotSelected: "",
    };
  }

 async componentDidMount(){
    const {getAverageShot,currentUser}=this.props;
    await getAverageShot(currentUser.id);
    await this.setChart();
  }


  async componentDidUpdate(prevProps, prevState) {
    const { shotSelected } = this.state;
    const { getUserBattingStats ,currentUser} = this.props;
    try {

      if (prevState.shotSelected !== shotSelected) {
        await getUserBattingStats(currentUser.id, shotSelected);
        console.log(currentUser);
        this.setData();
      }
    } catch (error) {
      console.log("error :", error);
    }
  }

  setData() {
    const { data } = this.state;
    const { userBattingStats } = this.props;

    let accuracy = [],
      xAxis = [];
    for (const item of userBattingStats) {
      let date = moment(item.date).format("DD-MMM-YYYY");
      accuracy.push(Number(item.accuracy));
      xAxis.push(date);
    }

    data.datasets[0].data = accuracy;
    data.labels = xAxis;
    this.setState({
      data,
    });
  }

  async selectedItem(selectedItem, index) {
    const { data } = this.state;
    this.setState({
      shotSelected: selectedItem,
      data,
    });
  }

   getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
      color=color.toString();
    }
    return color;
  }

  render() {
    const { data, shotSelected, chartConfig } = this.state;
    const { userBattingStats, average } = this.props;
    console.log(userBattingStats)

    let colors=['#A598D0','#D65D8C','#9B2D06','#57BC1C','#5B2235'],chartDoc=[],i=0;

    for (let key in average) {
      if (average.hasOwnProperty(key)) {
        chartDoc.push({ name: key, population: Math.round(average[key] * 100) / 100,color:colors[i],legendFontColor: "#7F7F7F",legendFontSize: 12 })
      }
      i++;
    }
 

    return (      
      <View style={styles.container}>
      <ScrollView>
        <PieChart
          data={chartDoc}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          center={[10, 10]}
          absolute
        />
        <View style={styles.dropdownStyle}>
          <SelectDropdown
            data={shots}
            onSelect={(selectedItem, index) => {
              this.selectedItem(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={{width:190,height:40}}
            dropdownIconPosition="left"
            
          />
          {/* <DateRangeComponent/> */}

        </View>
        {shotSelected === "" ? (
          <Text style={styles.noData}>Please select an option</Text>
        ) : isEmpty(userBattingStats) ? (
          <>
            <Text style={styles.noData}>No data</Text>
            <View style={styles.con}>
              <Lottie source={images.emptyContainer} />
            </View>
          </>
        ) : (
          <Animated.ScrollView
            horizontal
            pagingEnabled
            scrollEventThrottle={16}
            snapToAlignment="center"
            snapToInterval={12}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            // onScroll={Animated.event([
            //   {nativeEvent: {contentOffset : {x:scrollX
            //   }}}
            // ],{useNativeDriver:false})}
          >
            <View style={styles.chartDiv}>
              {isEmpty(shotSelected) ? null : (
                <>
                <Text style={styles.title}> LineChart </Text>
                <LineChart
                  data={data}
                  width={screenWidth}
                  height={300}
                  verticalLabelRotation={50}
                  chartConfig={chartConfig}
                  verticalLabelRotation={35}
                  bezier
                />
                 </>
              )}
              
            </View>

            <View style={styles.chartDiv2}>
              {isEmpty(shotSelected) ? null : (
                <>
                <Text style={styles.title}> Bar Chart </Text>
               <BarChart
              //  style={graphStyle}
               data={data}
               width={screenWidth}
               height={300}
               verticalLabelRotation={50}
               yAxisLabel=""
               chartConfig={chartConfig}
               verticalLabelRotation={35}
             />
             </>
              )}
              
            </View>
          </Animated.ScrollView>
        )}
      </ScrollView>
      </View>
     
    );
  }
}



const styles = StyleSheet.create({
 
  svgCurve: {
    position: "absolute",
    width: Dimensions.get("window").width,
  },
  con: {
    height: 300,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  noData: {
    textAlign: "center",
    marginTop: 100,
    fontSize: 16,
    fontWeight: "500",
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  dropdownStyle: {
    // marginTop: 30,
    // marginLeft: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent:"center"
  },
  chartDiv: {
    marginTop: 10,
    width: screenWidth,
    height: 360,
    backgroundColor: "#FBFBFB",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
   chartDiv2: {
    marginTop: 10,
    marginLeft:30,
    width: screenWidth,
    height: 360,
    backgroundColor: "#FBFBFB",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  predictedDiv: {
    marginTop: 20,
    justifyContent: "center",
    backgroundColor: "rgba(118, 155, 213, 0.37)",
    borderRadius: 8,
    height: 48,
    marginBottom: 10,
  },
  divMsg: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    shotPredictLoading: state.shot.shotPredictLoading,
    userBattingStatsLoading: state.shot.userBattingStatsLoading,
    userBattingStats: state.shot.userBattingStats,
    currentUser:state.user.currentUser,
    average:state.shot.average,
    avgLoading:state.shot.avgLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUserBattingStats,
      getAverageShot
    },
    dispatch
  );
};

BattingStats = connect(mapStateToProps, mapDispatchToProps)(BattingStats);

export { BattingStats };
