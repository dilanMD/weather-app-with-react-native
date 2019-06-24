import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default class SplashScreen extends Component {	
  render() {
    return (
      <View style={styles.container}>
        <Icon name="spinner" style={styles.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	loading: {
		fontSize: 72,
		color: "black"
	},
	loadingText: {
		fontSize: 32,
		paddingTop: 20
	}
});
