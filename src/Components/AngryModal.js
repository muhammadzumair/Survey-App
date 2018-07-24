import React from 'react';
import { TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';
const { width, height, fontScale, scale } = Dimensions.get('window');
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import Tts from 'react-native-tts';
import Firebase from 'react-native-firebase';
import DBActions from '../Store/Actions/DBActions/DBActions';


const images = {
    attitude: require('../../assets/attitude.png'),
    environment: require('../../assets/environment.png'),
    waitingTime: require('../../assets/waiting-time.png'),
    badService: require('../../assets/badService.png')
}

class AngryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClick: false
        }
    }

    pushResponse = (reason) => {
        let obj = {
            userResponse: this.props.userResponse,
            reason,
            timeStamp: Firebase.firestore.FieldValue.serverTimestamp(),
            location: this.props.currLocation

        }
        this.props.userResPush(obj, this.props.date);
        this.setState({isClick: true});
    }

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
                        <View style={{ flex: 0.8, width: width * 1 / 1.1, borderColor: "#bdc3c7", borderWidth: 1, backgroundColor: "#ecf0f1", alignSelf: "center" }}>
                            <View style={{ alignSelf: 'flex-end', padding: width * 1 / 80 }}>
                                <TouchableOpacity onPress={() => { Tts.stop(); this.props.setDefault() }}>
                                    <Image style={{ width: 25, height: 25 }} source={require('../../assets/no.png')} />
                                </TouchableOpacity>
                            </View>


                            {
                                this.state.isClick ? 
                                <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: fontScale * 40}}>Thankyou</Text>
                                </View>
                                :

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ flex: 0.33, paddingLeft: width * 1 / 80 }}>
                                        <Image resizeMode="contain" style={styles.smilyeStyle}
                                            source={this.props.smilyeImage}
                                        />
                                    </View>
                                    <View style={{ flex: 0.67, textAlign: 'center', paddingRight: width * 1 / 80 }}>
                                        <Text style={{ color: '#2c3e50', textAlign: 'center', alignSelf: 'center', fontSize: fontScale * 20 }}>{this.props.text}</Text>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity style={{ padding: width * 1 / 80 }} onPress={() => this.pushResponse('Waiting Time')}>
                                                    <Image style={styles.imagestyle} source={images.waitingTime} />
                                                    <Text>waiting Time</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ padding: width * 1 / 80 }} onPress={() => this.pushResponse('Attitude')}>
                                                    <Image style={styles.imagestyle} source={images.attitude} />
                                                    <Text>Attitude</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity style={{ padding: width * 1 / 80 }} onPress={() => this.pushResponse('Enviroment')}>
                                                    <Image style={styles.imagestyle} source={images.environment} />
                                                    <Text>Enviroment</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ padding: width * 1 / 80 }} onPress={() => this.pushResponse('Bad Service')}>
                                                    <Image style={styles.imagestyle} source={images.badService} />
                                                    <Text>Bad Service</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>}
                        </View  >
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

export default connect(mapStateToProps, mapDispatchToProps)(AngryModal);