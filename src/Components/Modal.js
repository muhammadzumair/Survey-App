import React from 'react';
import { TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';
import { Button } from "native-base"
import { connect } from 'react-redux';
const { width, height, fontScale, scale } = Dimensions.get('window');
import * as Animatable from 'react-native-animatable';
import Tts from 'react-native-tts';
import Firebase from 'react-native-firebase';
import DBActions from '../Store/Actions/DBActions/DBActions';

class Modal extends React.Component {

    componentDidMount() {
        let obj = {
            userResponse: this.props.userResponse,
            timeStamp: Firebase.firestore.FieldValue.serverTimestamp(),
            location: this.props.currLocation
        }

        // console.log(Firebase.firestore.FieldValue.serverTimestamp())

        this.props.userResPush(obj, this.props.date);

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
                        <View style={{ flex: 0.8, width: width * 1 / 1.1, borderColor: "#bdc3c7", borderWidth: 1, backgroundColor: "#ecf0f1", alignSelf: "center" }}>
                            <View style={{ alignSelf: 'flex-end', padding: width * 1 / 80 }}>
                                <TouchableOpacity onPress={() => { Tts.stop(); this.props.setDefault() }}>
                                    <Image style={{ width: 25, height: 25 }} source={require('../../assets/no.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flex: 0.33, paddingLeft: width * 1 / 80 }}>
                                    <Image resizeMode="contain" style={styles.smilyeStyle}
                                        source={this.props.smilyeImage}
                                    />
                                </View>
                                <View style={{ flex: 0.67, textAlign: 'center', paddingRight: width * 1 / 80 }}>
                                    <Text style={{ fontFamily: 'Lato-Regular', color: '#2c3e50', textAlign: 'center', alignSelf: 'center', fontSize: fontScale * 20 }}>{this.props.text}</Text>
                                </View>
                            </View>
                            <View style={{ padding: width * 1 / 40 }} >
                                <Button style={{ alignSelf: 'center', width: width * 1 / 2 }} full onPress={() => { Tts.stop(); this.props.setDefault(); this.props.navigateToForm() }}>
                                    <Text style={{ color: "#fff", fontFamily: 'Lato-Regular' }} >Want to tell us more ?</Text>
                                </Button>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        );
    }
};

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
        fontFamily:"Lato-Regular"
    }
}

let mapStateToProps = (state) => {
    return {
        currLocation: state.dbReducer.currLocation,
        date: state.dbReducer.date
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        userResPush: (obj, date) => dispatch(DBActions.userResPush(obj, date))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);