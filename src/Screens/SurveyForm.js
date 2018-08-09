import React, { Component } from 'react';
import { View, StatusBar, Text, Dimensions, Animated, BackHandler, ToastAndroid } from 'react-native';
import { Item, Input, Textarea, Button } from 'native-base';
import { connect } from 'react-redux';
import KeepAwake from 'react-native-keep-awake';
const { width, height, fontScale, scale } = Dimensions.get('window');


class SurveyForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        this.props.isError ? ToastAndroid.show(this.props.errorMessage) : null

        return (
            <View style={{ flex: 1, padding: width * 1 / 30, flexDirection:'row' }} >
                <KeepAwake />
                <View style={{flex:0.65}}>
                    <View style={{ flex: 0.2 }}>
                        <Input style={{ flex: 1, borderBottomColor: "#dedede", borderBottomWidth: 1 }} placeholder="Username" />
                    </View>
                    <View style={{ flex: 0.2 }}>
                        <Input style={{ flex: 1, borderBottomColor: "#dedede", borderBottomWidth: 1 }} placeholder="Email" keyboardType='email-address' />
                    </View>
                    <View style={{ flex: 0.2 }}>
                        <Input style={{ flex: 1, borderBottomColor: "#dedede", borderBottomWidth: 1 }} placeholder="Phone Number" keyboardType='number-pad' />
                    </View>
                    <View style={{ flex: 0.4 }}>
                        <Textarea rowSpan={5} numberOfLines={5} multiline={true} bordered placeholder="Message..." />
                    </View>
                </View>
                <View style={{ flex: 0.35 }}>
                    {/* <Button /> */}
                </View>
            </View >
        )

    }
}

const styles = {

}

const mapStateToProps = (state) => {
    return {
        isError: state.dbReducer.isError,
        errorMessage: state.dbReducer.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyForm);
// export default Main;