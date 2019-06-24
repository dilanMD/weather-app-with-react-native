import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default class MetaData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDay: "Saturday"
    };
  }

  render() {
    return (
      <View style={this.props.style}>
        <View>
					<Text style={styles.day}></Text>
				</View>
				{/* Left Metadata */}
        <View style={styles.leftMeta}>
          {/* Low Temperature start */}
          <View>
            <Text style={styles.iconText}>Min Temperature</Text>
            <Icon name="temperature-low" style={[styles.icons, styles.min_temp]}>
              {" "}
              {this.props.min_temp}&deg;
            </Icon>
          </View>
          {/* High Temperature start */}
          <View>
            <Text style={styles.iconText}>Max Temperature</Text>
            <Icon name="temperature-high" style={[styles.icons, styles.max_temp]}>
              {" "}
              {this.props.max_temp}&deg;
            </Icon>
          </View>
        </View>
				{/* Right Metadata */}
        <View style={styles.rightMeta}>
          {/* Low Temperature start */}
          <View>
            <Text style={styles.iconText}>Air Pressure</Text>
            <Icon name="bong" style={[styles.icons, styles.air_pressure]}>
              {" "}
              {this.props.air_pressure} Pa
            </Icon>
          </View>
          {/* High Temperature start */}
          <View>
            <Text style={styles.iconText}>Humidity</Text>
            <Icon name="smog" style={[styles.icons, styles.humidity]}>
              {" "}
              {this.props.humidity}%
            </Icon>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  day: {
    fontSize: 18,
    flexDirection: "column",
    color: "white",
    // paddingLeft: 10,
    // paddingBottom: 10,
    // borderBottomColor: "#e0edff",
    // borderBottomWidth: 1
  },
  leftMeta: {
		flex: 1,
		flexDirection: "column",
		paddingHorizontal: 20
	},
  rightMeta: {
		flex: 1,
		flexDirection: "column",
		paddingHorizontal: 20
	},
  icons: {
    color: "white",
    fontSize: 24,
    padding: 10
  },
  iconText: {
    color: "white",
    fontSize: 16,
    paddingTop: 10,
    paddingLeft: 10
	}
});
