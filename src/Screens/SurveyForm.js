import React, { Component } from 'react';
import { View, StatusBar, Text, Dimensions, Animated, BackHandler, ToastAndroid, TextComponent } from 'react-native';
import { Input, Textarea, Button, Icon,Root,Toast } from "native-base"
import { SmileyButton } from '../Components';
import { connect } from 'react-redux';
import Tts from 'react-native-tts';
import Modal from '../Components/Modal';
import AngryModal from '../Components/AngryModal';
import KeepAwake from 'react-native-keep-awake';
import DBActions from '../Store/Actions/DBActions/DBActions';
const { width, height, fontScale, scale } = Dimensions.get('window');

 class SurveyForm extends Component {

    constructor(props) {
        super(props);
        this.state = { userName: "", email: "", phoneNum: "", message: "" }
    }
    buttonHandler = () => {
        
        let obj = {
            userName: this.state.userName,
            phoneNum: this.state.phoneNum,
            email: this.state.email,
            message: this.state.message

        }
        if(this.state.message.length>=10){
            this.props.userFeedBack(this.props.currLocation,this.props.date,this.props.userResponseKey,obj)
            this.props.navigation.goBack()
        }else{
            ToastAndroid.show("feeback is required",ToastAndroid.SHORT)
        }
    }
    render() {
        return (
            
            <View style={{ flex: 1, padding: width * 1 / 40, justifyContent: "center", flexDirection: "row" }}>
                <View style={{ flex: 0.65 }} >
                    <View style={{ flex: 0.2 }} >
                        <Input style={{ borderBottomColor: "#dedede", borderBottomWidth: 1 }} placeholder="Username" onChangeText={(text) => this.setState({ userName: text })} />
                    </View>
                    <View style={{ flex: 0.2 }} >
                        <Input style={{ borderBottomColor: "#dedede", borderBottomWidth: 1 }} placeholder="email" onChangeText={(text) => this.setState({ email: text })} />
                    </View>
                    <View style={{ flex: 0.2, }} >
                        <Input style={{ borderBottomColor: "#dedede", borderBottomWidth: 1 }} keyboardType={"number-pad"} placeholder="phone number" onChangeText={(text) => this.setState({ phoneNum: text })} />
                    </View>
                    <View style={{ flex: 0.3, }} >
                        <Textarea rowSpan={4} bordered placeholder="Feedback..." multiline={true} numberOfLines={10} onChangeText={(text) => this.setState({ message: text })} />
                    </View>
                    <View style={{ flex: 0.1 }} >
                    </View>
                </View>
                <View style={{ flex: 0.35, justifyContent: "center", alignItems: "center" }} >
                    <View style={{ flex: 0.5, justifyContent: "center" }} >
                        <Button onPress={()=>{this.buttonHandler()}}  primary style={{ alignItems: "center", justifyContent: "center", height: width * 1 / 8, width: width * 1 / 8, borderRadius: width * 1 / 8 }}  >

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
let mapStateToProps = (state) => {
    return {
        
        isError: state.dbReducer.isError,
        errorMessage: state.dbReducer.errorMessage,
        currLocation: state.dbReducer.currLocation,
        date: state.dbReducer.date,
        userResponseKey:state.dbReducer.userResponseKey
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        userFeedBack:(branch,date,key,obj)=>dispatch(DBActions.userFeedBack(branch,date,key,obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyForm)
