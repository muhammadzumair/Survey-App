import React, { Component } from 'react';
import { View, Text,Dimensions} from "react-native";
const { width, height, fontScale, scale } = Dimensions.get('window');


export default class ThankYouScreen extends Component {

    constructor(props) {
        super(props);
        this.timeRef = "";

    }
    componentDidMount() {
        this.timeRef = setTimeout(() => {
            this.props.navigation.navigate("main");
        }, 3000)
    }
    componentWillUnmount() {
        clearTimeout(this.timeRef)
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                <Text style={{ fontFamily: "Lato-Rgular", fontSize: fontScale * 50,color:"#000" }} >Thank You</Text>
            </View>
        )
    }

}