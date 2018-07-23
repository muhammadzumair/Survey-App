import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar, View, Dimensions ,ToastAndroid} from 'react-native';
import Fire from '../Store/Firebase/firebaseDB';

import { Container, Header, Title, Content, Button, Icon, Text, Right, Body, Left, Picker, Form, Item, Input, Label } from "native-base";
import DBActions from '../Store/Actions/DBActions/DBActions';
// const Item = Picker.Item;
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
        if (this.state.key == this.state.inputText) {
            this.props.saveLoaction(this.state.selected);
            this.props.navigation.navigate('main');
        }else{
            ToastAndroid.show("wrong password",ToastAndroid.SHORT);
        }
    }


    render() {
        this.props.isError?ToastAndroid.show(this.props.errorMessage,ToastAndroid.SHORT): null
        
        return (

            <View style={{ flex: 1, alignItems: "center", justifyContent: "space-between", }} >
                <StatusBar hidden={true} />
                <View style={{ flex: 0.2, }} >
                    <Text style={{ fontSize: fontScale * 30, fontWeight: 'bold' }}>Please Select Your Branch Location</Text>
                </View>
                <View style={{ flex: 0.2, justifyContent: "center", width: width * 1 / 2 }} >
                    <Item picker>
                        <Picker
                            style={{
                                color: '#616161',
                                backgroundColor: '#fff',
                                height: height * 1 / 10,
                                width: width * 1 / 2
                            }}
                            iosHeader="Select one"
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
                            placeholder="Select your SIM"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"

                            selectedValue={this.state.selected}
                            onValueChange={value => { this.handler(value) }}
                        >
                            <Picker.Item label="none" value="none" />
                            <Picker.Item label="Tariq Road" value="Tariq Road" />
                            <Picker.Item label="Gulshan" value="Gulshan" />
                            <Picker.Item label="Nazimabad" value="Nazimabad" />
                            <Picker.Item label="Askari" value="Askari" />
                            <Picker.Item label="Clifton" value="Clifton" />
                        </Picker>
                    </Item>

                </View>
                <View style={{ flex: 0.4, width: width * 1 / 2, justifyContent: "center" }} >
                    <Item  >

                        <Input placeholder="enter key" value={this.state.inputText} onChangeText={(text) => { this.setState({ inputText: text }) }} />
                    </Item>
                </View>
                <View style={{ flex: 0.2, width: width * 1 / 2 }} >
                    <Button style={{ alignSelf: 'center', width: width * 1 / 2 }} full onPress={() => {this.buttonHandler() }}>
                        <Text>Next</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        locations: state.dbReducer.locations,
        isError:state.dbReducer.isError,
        errorMessage:state.dbReducer.errorMessage
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        getLocations: () => dispatch(DBActions.getLocationFromFirebase()),
        saveLoaction: (location) => dispatch(DBActions.saveLocation(location)),
        getDate: () => dispatch(DBActions.getTime())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstScreen)


