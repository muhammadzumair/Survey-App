import React, { Component } from 'react';
import { View, StatusBar, Text, Dimensions, Animated, BackHandler, ToastAndroid, TextComponent } from 'react-native';
import { Input, Textarea, Button, Icon } from "native-base"
import { SmileyButton } from '../Components';
import { connect } from 'react-redux';
import Tts from 'react-native-tts';
import Modal from '../Components/Modal';
import AngryModal from '../Components/AngryModal';
import KeepAwake from 'react-native-keep-awake';
const { width, height, fontScale, scale } = Dimensions.get('window');

export default class SurveyFrom extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1, padding: width * 1 / 40, justifyContent: "center", flexDirection: "row" }}>
                <View style={{ flex: 0.65 }} >
                    <View style={{ flex: 0.2 }} >
                        <Input style={{ borderBottomColor: "#dedede", borderBottomWidth: 1 }} placeholder="Username" />
                    </View>
                    <View style={{ flex: 0.2 }} >
                        <Input style={{ borderBottomColor: "#dedede", borderBottomWidth: 1 }} placeholder="email" />
                    </View>
                    <View style={{ flex: 0.2, }} >
                        <Input style={{ borderBottomColor: "#dedede", borderBottomWidth: 1 }} placeholder="phone number" />
                    </View>
                    <View style={{ flex: 0.3, }} >
                        <Textarea rowSpan={4} bordered placeholder="message" multiline={true} numberOfLines={10} />
                    </View>
                    <View style={{ flex: 0.1 }} >
                    </View>
                </View>
                <View style={{ flex: 0.35, justifyContent: "center", alignItems: "center" }} >
                    <View style={{ flex: 0.5, justifyContent: "center" }} >
                        <Button primary style={{ alignItems: "center", justifyContent: "center", height: width * 1 / 8, width: width * 1 / 8, borderRadius: width * 1 / 8 }}  >

                            <Icon name='send' />
                        </Button>
                    </View>
                    <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center", }} >
                        <Button style={{ backgroundColor: "#27ae60", alignItems: "center", justifyContent: "center", height: width * 1 / 8, width: width * 1 / 8, borderRadius: width * 1 / 8 }} >

                            <Icon name='mic' />
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}