import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity, Image, View, Text, Dimensions, Animated } from 'react-native';
const { width, height, fontScale, scale } = Dimensions.get('window');
import Tts from 'react-native-tts';



export default class AngryModal extends Component {
    constructor(props) {
        super(props);
        

    }
    componentDidMount() {
        console.log(Tts);
        Tts.getInitStatus().then(() => {
            Tts.setDucking(true)
            Tts.speak(this.props.text);
        });
    }
    render() {
        console.log(this.props);
        return (
            <View style={{ height: height * 4, width: width * 2, backgroundColor: "rgba(0,0,0,0.5)", position: "absolute", zIndex: 998 }}>
                <Animatable.View animation="fadeInDown"            
                    style={{
                        minHeight: height * 4, width: width * 2, position: "absolute", zIndex: 999,
                    }}>
                    <TouchableOpacity style={{ height: height, justifyContent: 'center' }} activeOpacity={1} >
                        <View style={{ flex: 0.8, width: width * 0.95, alignSelf: "center", flexDirection: "row", backgroundColor: "#ecf0f1" }}>
                            <View style={{ flex: 0.3, justifyContent: "center", alignItems: "center", paddingLeft: width * 1 / 40 }} >
                                <Image source={this.props.smilyeImage} style={{ height: 180, width: 180 }} />
                            </View>
                            <View style={{ flex: 0.7, justifyContent: "center", alignItems: "center", }} >
                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={{ fontSize: fontScale * 20, textAlign: "center", color: "#34495e", paddingRight: width * 1 / 40 }} >{this.props.text}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }} >
                                    <TouchableOpacity style={{ padding: width * 1 / 80 }} >
                                        <Image source={require('../../assets/attitude.png')} style={{ width: 50, height: 50 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ padding: width * 1 / 80 }} >
                                        <Image source={require('../../assets/environment.png')} style={{ width: 50, height: 50 }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: "row" }} >
                                    <TouchableOpacity style={{ padding: width * 1 / 80 }} >
                                        <Image source={require('../../assets/waiting-time.png')} style={{ width: 50, height: 50 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ padding: width * 1 / 80 }} >
                                        <Image source={require('../../assets/waiting-time.png')} style={{ width: 50, height: 50 }} />
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        )
    }
}


const styles = {
    buttonStyle: {
        alignSelf: 'center'
    },
    smilyeStyle: {
        width: 180,
        height: 180
    },
    textStyle: {
        width: '100%',
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: fontScale * 20,
        marginBottom: height * 1 / 20,
        color: '#000066',
        fontWeight: 'bold',
        // fontFamily: 'Arial'
    }
}




