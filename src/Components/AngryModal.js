import React from 'react';
import { TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';
const { width, height, fontScale, scale } = Dimensions.get('window');
import * as Animatable from 'react-native-animatable';
import Tts from 'react-native-tts';

const images = {
    attitude: require('../../assets/attitude.png'),
    comment: require('../../assets/comment.png'),
    environment: require('../../assets/environment.png'),
    waitingTime: require('../../assets/waiting-time.png'),
}

class AngryModal extends React.Component {
    componentDidMount() {
        Tts.getInitStatus().then(() => {
            console.log(this.props);
            Tts.speak(this.props.audioText);
        });
    }
    render() {
        return (
            <View style={{ height: height * 4, width: width * 2, backgroundColor: "rgba(0,0,0,0.5)", position: "absolute", zIndex: 998 }}>
                <Animatable.View animation="fadeInDown"                
                    style={{
                        minHeight: height * 4, width: width * 2, position: "absolute", zIndex: 999,
                    }}>
                    <TouchableOpacity style={{ height: height, justifyContent: 'center' }} activeOpacity={1} >
                        <View style={{ flex: 0.8, width: width * 1 / 1.1, borderColor: "#bdc3c7", borderWidth: 1, backgroundColor: "#ecf0f1", alignSelf: "center", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flex: 0.33, paddingLeft: width * 1 / 80 }}>
                                <Image resizeMode="contain" style={styles.smilyeStyle}
                                    source={this.props.smilyeImage}
                                />
                            </View>
                            <View style={{ flex: 0.67, textAlign: 'center', paddingRight: width * 1 / 80 }}>
                                <Text style={{ color: '#2c3e50', textAlign: 'center', alignSelf: 'center', fontSize: fontScale * 20 }}>{this.props.text}</Text>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={{ padding: width * 1 / 80 }} onPress={() => alert("clicked")}>
                                            <Image style={styles.imagestyle} source={images.waitingTime} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ padding: width * 1 / 80 }} onPress={() => alert("clicked")}>
                                            <Image style={styles.imagestyle} source={images.attitude} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={{ padding: width * 1 / 80 }} onPress={() => alert("clicked")}>
                                            <Image style={styles.imagestyle} source={images.environment} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ padding: width * 1 / 80 }} onPress={() => alert("clicked")}>
                                            <Image style={styles.imagestyle} source={images.environment} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        );
    }
};

const styles = {
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
    },
    imagestyle: {
        width: 50,
        height: 50
    }
}

export { AngryModal };