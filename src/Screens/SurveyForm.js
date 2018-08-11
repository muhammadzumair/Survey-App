import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    PermissionsAndroid,
    Dimensions,
    ToastAndroid, TextComponent,
    ActivityIndicator, Image, TouchableOpacity, ProgressBarAndroid
} from 'react-native';
import Firebase from 'react-native-firebase';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { Input, Textarea, Button, Icon, } from "native-base"
import { connect } from 'react-redux';
import DBActions from '../Store/Actions/DBActions/DBActions';
import Ionicons from 'react-native-vector-icons/FontAwesome';

const { width, height, fontScale, scale } = Dimensions.get('window');

class SurveyForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTime: 0.0,
            recording: false,
            paused: false,
            stoppedRecording: false,
            finished: false,
            audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
            hasPermission: undefined,
            filePath: '', userName: "", email: "", phoneNum: "", message: "",
            stopBtn: true,
            toggleRecording: false
        };
        this.time = {};
    }
    prepareRecordingPath(audioPath) {
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",
            AudioEncoding: "aac",
            AudioEncodingBitRate: 32000
        });
    }
    setBackGoTime = (time) => {
        this.time = setTimeout(() => {
            this.props.navigation.goBack()
        }, time)
    }
    clearBackGoTime = () => {
        clearTimeout(this.time)
    }
    componentWillUnmount() {
        this.clearBackGoTime();
    }

    componentDidMount() {
        this.setBackGoTime(15000);
        this._checkPermission().then((hasPermission) => {
            this.setState({ hasPermission });

            if (!hasPermission) return;

            this.prepareRecordingPath(this.state.audioPath);

            AudioRecorder.onProgress = (data) => {
                this.setState({ currentTime: Math.floor(data.currentTime) });
            };

            AudioRecorder.onFinished = (data) => {
                // Android callback comes in the form of a promise instead.
                if (Platform.OS === 'ios') {
                    this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
                }
            };
        });
    }

    _checkPermission() {
        if (Platform.OS !== 'android') {
            return Promise.resolve(true);
        }

        const rationale = {
            'title': 'Microphone Permission',
            'message': 'AudioExample needs access to your microphone so you can record audio.'
        };

        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
            .then((result) => {
                console.log('Permission result:', result);
                return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
            });
    }
    toggleRecordingHandler = (record, stop) => {
        if (this.state.toggleRecording) {
            stop();
            this.setState({ toggleRecording: false })
        }
        else {
            record();
            this.setState({ toggleRecording: true })
        }
    }

    _renderButton(type, title, onPress, active) {
        var style = (active) ? styles.activeButtonText : styles.buttonText;

        return (
            <View style={{ flex: 1 }}>
                {
                    <View style={{ justifyContent: "center", alignItems: 'center' }}>
                        <Button disabled={this.props.isProgress} onPress={() => { this.toggleRecordingHandler(() => { this._record() }, () => { this._stop() }) }} style={{ backgroundColor: "#27ae60", alignSelf: 'center', alignItems: "center", justifyContent: "center", height: width * 1 / 8, width: width * 1 / 8, borderRadius: width * 1 / 8 }} >
                            {this.state.toggleRecording ? <Ionicons name={"stop"} size={fontScale * 20} color="#fff" /> : <Icon name={title} style={{ fontSize: fontScale * 30, color: "#fff" }} />}
                        </Button>
                    </View >
                }
            </View>
        );
    }
    async _stop() {
        if (!this.state.recording) {
            console.warn('Can\'t stop, not recording!');
            return;
        }

        this.setState({ stoppedRecording: true, recording: false, paused: false });

        try {
            const filePath = await AudioRecorder.stopRecording();

            if (Platform.OS === 'android') {
                this._finishRecording(true, filePath);
            }
            return filePath;
        } catch (error) {
            console.error(error);
        }
    }
    async _record() {
        if (this.state.recording) {
            console.warn('Already recording!');
            return;
        }

        if (!this.state.hasPermission) {
            console.warn('Can\'t record, no permission granted!');
            return;
        }

        if (this.state.stoppedRecording) {
            this.prepareRecordingPath(this.state.audioPath);
        }

        this.setState({ recording: true, paused: false, stopBtn: false });
        let filePath;
        try {
            filePath = await AudioRecorder.startRecording();
            this.clearBackGoTime();
        } catch (error) {
            console.error(error);
        }
        this.setState({ filePath: filePath });
    }

    _finishRecording(didSucceed, filePath, fileSize) {
        console.log('filePath from state: ', this.state.filePath);
        console.log("stop...");
        this.setBackGoTime(15000);
        this.setState({ finished: didSucceed });
    }
    uploadAudio = () => {
        if (this.state.message.length > 0 && this.state.message.length < 10) {
            ToastAndroid.show("feeback message is too short", ToastAndroid.SHORT)
            return;
        }
        if (this.state.filePath.length > 0) {
            this._stop();
            this.props.showLoader()
            let file = this.state.filePath;
            let metadata = {
                contentType: 'audio/mpeg_4'
            };
            console.log('before file uploading');
            var uploadTask = Firebase.storage().ref(`/audio${this.props.userResponseKey}`).put(file, metadata);
            console.log('after file uploading')
            uploadTask.on(Firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case Firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case Firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                }, (error) => {
                    console.log('error message: ', error.code);
                    switch (error.code) {
                        case 'storage/unauthorized':
                            break;

                        case 'storage/canceled':
                            break;

                        case 'storage/unknown':
                            break;
                    }
                }, (snapshot) => {
                    console.log(snapshot);
                    console.log(snapshot.downloadURL)
                    if (this.state.message.length > 0) {
                        let obj = {
                            userName: this.state.userName,
                            phoneNum: this.state.phoneNum,
                            email: this.state.email,
                            message: this.state.message,
                            audioURL: snapshot.downloadURL
                        }
                        this.props.hiderLoader()
                        this.props.userFeedBack(this.props.currLocation, this.props.date, this.props.userResponseKey, obj)
                    } else {
                        let obj = {
                            userName: this.state.userName,
                            phoneNum: this.state.phoneNum,
                            email: this.state.email,
                            audioURL: snapshot.downloadURL
                        }
                        this.props.hiderLoader()
                        this.props.userFeedBack(this.props.currLocation, this.props.date, this.props.userResponseKey, obj)
                    }
                    this.props.navigation.navigate("thankYouScreen")
                });
        }
        else {
            let obj = {
                userName: this.state.userName,
                phoneNum: this.state.phoneNum,
                email: this.state.email,
                message: this.state.message
            }
            if (this.state.message.length >= 10) {
                this.props.hiderLoader()
                this.props.userFeedBack(this.props.currLocation, this.props.date, this.props.userResponseKey, obj)
                this.props.navigation.navigate("thankYouScreen")
            } else {
                ToastAndroid.show("feeback is required", ToastAndroid.SHORT)
            }
        }
    }
    render() {
        return (

            <View style={{ flex: 1, padding: width * 1 / 40, justifyContent: "center", flexDirection: "row", backgroundColor: "#ecf0f1" }}>
                <View style={{ flex: 0.65 }} >
                    <View style={{ flex: 0.2 }} >
                        <Input disabled={this.props.isProgress} style={{ fontFamily: 'Lato-Regular', borderBottomColor: "#dedede", borderBottomWidth: 1 }} placeholder="Username" onChangeText={(text) => { this.setState({ userName: text }); this.clearBackGoTime(); this.setBackGoTime(30000) }} />
                    </View>
                    <View style={{ flex: 0.2 }} >
                        <Input disabled={this.props.isProgress} style={{ fontFamily: 'Lato-Regular', borderBottomColor: "#dedede", borderBottomWidth: 1 }} placeholder="email" onChangeText={(text) => { this.setState({ email: text }); this.clearBackGoTime(); this.setBackGoTime(30000) }} />
                    </View>
                    <View style={{ flex: 0.2, }} >
                        <Input disabled={this.props.isProgress} style={{ fontFamily: 'Lato-Regular', borderBottomColor: "#dedede", borderBottomWidth: 1 }} keyboardType={"number-pad"} placeholder="phone number" onChangeText={(text) => { this.setState({ phoneNum: text }); this.clearBackGoTime(); this.setBackGoTime(30000) }} />
                    </View>
                    <View style={{ flex: 0.3, }} >
                        <Textarea disabled={true} rowSpan={4} style={{ fontFamily: 'Lato-Regular' }} bordered placeholder="Feedback..." multiline={true} numberOfLines={10} onChangeText={(text) => { this.setState({ message: text }); this.clearBackGoTime(); this.setBackGoTime(30000) }} />
                    </View>
                    <View style={{ flex: 0.1 }} >
                    </View>
                </View>
                <View style={{ flex: 0.35, justifyContent: "center", alignItems: "center" }} >
                    <View style={{ flex: 0.5, justifyContent: "center" }} >
                        <Button disabled={this.props.isProgress} onPress={this.uploadAudio} primary style={{ alignItems: "center", justifyContent: "center", height: width * 1 / 8, width: width * 1 / 8, borderRadius: width * 1 / 8 }}  >
                            <Icon name='send' size={fontScale * 20} color="#fff" />
                        </Button>
                    </View>
                    <View style={{ flex: 0.5, alignItems: "center" }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            {this._renderButton(this.state.toggleRecording, "mic", () => { this._record() }, this.state.recording)}
                        </View>
                        <View>
                            {
                                this.state.toggleRecording ?
                                    <View style={{ flex: 1 }} >
                                        <Text style={{ fontFamily: "Lato-Regulart" }} >Listening...</Text>
                                        <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" />
                                    </View>
                                    : null
                            }
                        </View>
                        <View>
                            {
                                this.props.isProgress ?

                                    <ActivityIndicator size="large" color="#0000ff" />

                                    :
                                    null
                            }
                        </View>
                    </View>
                </View>
            </View>

        )
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2b608a",
    },
    controls: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    progressText: {
        paddingTop: 50,
        fontSize: 50,
        color: "#fff"
    },
    button: {
        padding: 20
    },
    disabledButtonText: {
        color: '#eee'
    },
    buttonText: {
        fontSize: 20,
        color: "#fff"
    },
    activeButtonText: {
        fontSize: 20,
        color: "#B81F00"
    }

});
let mapStateToProps = (state) => {
    return {
        isProgress: state.dbReducer.isProgress,
        isError: state.dbReducer.isError,
        errorMessage: state.dbReducer.errorMessage,
        currLocation: state.dbReducer.currLocation,
        date: state.dbReducer.date,
        userResponseKey: state.dbReducer.userResponseKey
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        userFeedBack: (branch, date, key, obj) => dispatch(DBActions.userFeedBack(branch, date, key, obj)),
        showLoader: () => dispatch(DBActions.showLoaderOnUploading()),
        hiderLoader: () => dispatch(DBActions.hideLoaderOnUploading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyForm)
