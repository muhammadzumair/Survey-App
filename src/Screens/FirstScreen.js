import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar, View, Dimensions, ToastAndroid, Image } from 'react-native';
import Fire from '../Store/Firebase/firebaseDB';
import KeepAwake from 'react-native-keep-awake';
import { Container, Header, Title, Content, Button, Icon, Text, Right, Body, Left, Picker, Form, Item, Input, Label, Fab } from "native-base";
import DBActions from '../Store/Actions/DBActions/DBActions';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
// const Item = Picker.Item;-
const { height, width, fontScale, scale } = Dimensions.get("window");
class FirstScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { selected: "none", key: null, inputText: '' }
    }
    componentDidMount() {
        this.props.getLocations();
        this.props.getDate();
    }
    handler = (value) => {
        this.props.locations.forEach(item => {
            if (item.key === value) {
                this.setState({ selected: value, key: item.pin })
            }
        })
        // this.setState({ selected: value })
    }
    buttonHandler = () => {
        console.log(this.state)
        if (this.state.key == this.state.inputText && this.props.errorMessage == "") {
            this.props.saveLoaction(this.state.selected);
            this.props.navigation.navigate('main');
        } else if (this.props.errorMessage === "ajax error 0") {
            ToastAndroid.show("internet error", ToastAndroid.SHORT)
        }
        else {
            ToastAndroid.show("wrong password", ToastAndroid.SHORT);
        }
    }


    render() {
        this.props.isError ? ToastAndroid.show("Not connected to internet", ToastAndroid.SHORT) : null
        this.props.makeErrorFalse();
        return (

            <View style={{ flex: 1, alignItems: "center", justifyContent: "space-between", backgroundColor: "#ecf0f1" }} >
                <KeepAwake />
                <StatusBar hidden={true} />
                <View style={{ flex: 0.2, flexDirection: "row" }} >
                    <View style={{ flex: 0.1, alignSelf: "flex-start" }}>
                        <Image source={require("../../assets/ico/hdpi/icon.png")} />
                    </View>
                    <View style={{ flex: 0.9, alignItems: "center" }} >
                        <Text style={{ fontSize: fontScale * 30, fontFamily: 'Lato-Regular', padding: width * 1 / 40 }}>Please Select Your Branch Location</Text>
                    </View>
                </View>
                <View style={{ flex: 0.1, justifyContent: "center", width: width * 1 / 2 }} >
                    <Item picker>
                        <Picker
                            style={{

                                height: height * 1 / 10,
                                width: width * 1 / 2,


                            }}
                            mode="dialog"
                            iosHeader="Select your branch"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            selectedValue={this.state.selected}
                            onValueChange={value => { this.handler(value) }}

                        >
                            <Picker.Item label="Select your branch location" value="none" />
                            {/* <Picker.Item label="Tariq Road" value="Tariq Road" />
                            <Picker.Item label="Gulshan" value="Gulshan" />
                            <Picker.Item label="Nazimabad" value="Nazimabad" />
                            <Picker.Item label="Askari" value="Askari" />
                            <Picker.Item label="Clifton" value="Clifton" /> */}
                            {
                                this.props.locations.map((value, i) => {
                                    return <Picker.Item label={value.key} value={value.key} key={i} />
                                })
                            }
                        </Picker>
                    </Item>

                </View>
                <View style={{ flex: 0.1, width: width * 1 / 2, justifyContent: "center" }} >
                    <Item  >
                        <Input style={{ fontFamily: 'Lato-Regular' }} placeholder="enter key" value={this.state.inputText} onChangeText={(text) => { this.setState({ inputText: text }) }} />
                    </Item>
                </View>
                <View style={{ flex: 0.2, width: width * 1 / 2 }} >
                    <Button full style={{ flex: 0.5, flexDirection: "row", backgroundColor: '#1abc9c', alignSelf: 'center', borderRadius: width * 1 / 50, alignItems: "center", }} onPress={() => { this.buttonHandler() }}>
                        <Text style={{ fontFamily: 'Lato-Regular' }}>Next</Text>
                        <MaterialIcons name={"navigate-next"} size={fontScale * 30} color={"#fff"} />
                    </Button>

                </View>
                {/* <Fab style={{ flex: 1, backgroundColor: '#1abc9c' }} onPress={() => { this.buttonHandler() }} >
                        <MaterialIcons name={"navigate-next"} size={fontScale * 30} color={"#fff"} />

                    </Fab> */}
            </View>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        locations: state.dbReducer.locations,
        isError: state.dbReducer.isError,
        errorMessage: state.dbReducer.errorMessage
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        getLocations: () => dispatch(DBActions.getLocationFromFirebase()),
        saveLoaction: (location) => dispatch(DBActions.saveLocation(location)),
        getDate: () => dispatch(DBActions.getTime()),
        makeErrorFalse: () => dispatch(DBActions.makeisErrorFalse())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstScreen)


