import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar, View } from 'react-native';

import { Container, Header, Title, Content, Button, Icon, Text, Right, Body, Left, Picker, Form, Item  as FormItem } from "native-base";
const Item = Picker.Item;

export default class FirstScreen extends Component {
    render() {
        return (

            <Container>
                <StatusBar hidden={true} />
                <Content contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Please Select Your Branch Location</Text>
                    <Form>
                        <Picker
                            style={{
                                color: '#616161',
                                backgroundColor: '#e2e2e2',
                                width: 250,
                                height: 50,
                                marginBottom:20,
                                marginTop:30
                            }}
                            iosHeader="Select one"
                            mode="dropdown"
                            // selectedValue={}
                            // onValueChange={value => this.props.locationUpdate({ prop: 'location', value })}
                        >
                            <Item label="Tariq Road" value="tariq-road" />
                            <Item label="Gulshan e Iqbal" value="gulshan-e-iqbal" />
                            <Item label="Nazimabad" value="nazimabad" />
                            <Item label="Askari" value="askari" />
                            <Item label="Clifton" value="clifton" />
                        </Picker>
                        <Button style={{alignSelf:'center'}} onPress={() => {}}>
                            <Text>Next</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
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


