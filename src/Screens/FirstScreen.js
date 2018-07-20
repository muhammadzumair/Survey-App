import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar, View, Dimensions } from 'react-native';

import { Container, Header, Title, Content, Button, Icon, Text, Right, Body, Left, Picker, Form, Item, Input, Label } from "native-base";
// const Item = Picker.Item;
const { height, width, fontScale, scale } = Dimensions.get("window");
export default class FirstScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { selected: undefined }
    }
    handler = (value) => {
        this.setState({ selected: value })
    }
    render() {
        return (

            <View style={{ flex: 1, alignItems: "center", justifyContent: "space-between",  }} >
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
                            <Picker.Item label="Tariq Road" value="tariq-road" />
                            <Picker.Item label="Gulshan e Iqbal" value="gulshan-e-iqbal" />
                            <Picker.Item label="Nazimabad" value="nazimabad" />
                            <Picker.Item label="Askari" value="askari" />
                            <Picker.Item label="Clifton" value="clifton" />
                        </Picker>
                    </Item>

                </View>
                <View style={{ flex: 0.4, width: width * 1 / 2,  justifyContent: "center" }} >
                    <Item  >

                        <Input placeholder="enter key" />
                    </Item>
                </View>
                <View style={{ flex: 0.2,  width: width * 1 / 2 }} >
                    <Button style={{ alignSelf: 'center', width: width * 1 / 2 }} full onPress={() => { }}>
                        <Text>Next</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

let mapStateToProps = (state) => {
    return {

    }
}
let mapDispatchToProps = (dispatch) => {
    return {

    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(FirstScreen)


