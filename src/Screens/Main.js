import React, { Component } from 'react';
import { View, StatusBar, Text, Dimensions, TouchableOpacity, Animated, BackHandler } from 'react-native';
import { SmileyButton } from '../Components';
import { connect } from 'react-redux';
import Modal from '../Components/Modal';
import AngryModal from '../Components/AngryModal';
import KeepAwake from 'react-native-keep-awake';
// import Modal from "react-native-modal";
// import {
//     smileyReaction
// } from '../actions';
// import { KeepAwake } from 'expo';
const { width, height, fontScale, scale } = Dimensions.get('window');

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { isModalVisible: false, image: null, text: "", angryModalVisible: false }
    }
    backHandler
    componentDidMount() {
        console.log("props: ", this.props)
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            // works best when the goBack is async
            return true;
        });
    }
    componentWillUnmount() {
        this.backHandler.remove();
    }
    setCounter = () => {
        setTimeout(() => {
            this.setState({ isModalVisible: false, angryModalVisible: false })
        }, 15000)
    }
    _toggleModal = (name, image, text) => {
        if (name === "sad")
            this.setState({ image: image, text: text, angryModalVisible: !this.state.angryModalVisible });
        else
            this.setState({ isModalVisible: !this.state.isModalVisible, image: image, text: text, });

    }
    render() {
        const { containerStyle, smilyeContainerStyle } = styles;
        const smilyeImages = {
            // veryHappy: require('../assets/veryHappy.gif'),
            happy: require('../../assets/happy.png'),
            sad: require('../../assets/__sad.png'),
            moderate: require('../../assets/moderate.png'),
        }
        console.log(this.state.isModalVisible);
        return (
            <View style={containerStyle}>
                <KeepAwake />
                <StatusBar hidden />
                {
                    this.state.isModalVisible ?
                        <Modal smilyeImage={this.state.image} text={this.state.text} toggleisVisible={this._toggleModal} />
                        : null
                }
                {
                    this.state.angryModalVisible ?
                        <AngryModal smilyeImage={this.state.image} text={this.state.text} toggleisVisible={this._toggleModal} /> : null

                }

                {/* <Modal  onRequestClose={()=>{this.setState({isModalVisible:false})}}  
                visible={this.state.isModalVisible}  style={{}}  
                > */}
                {/* {this.state.isModalVisible ?
                    <TouchableOpacity activeOpacity={1} style={{ minHeight: height * 4, width: width * 2, backgroundColor: "rgba(0,0,0,0.5)", position: "absolute", zIndex: 999, }}>
                        <View style={{ flex: 0.2, backgroundColor: "red", width: width * 0.5, alignSelf: "center" }}>
                            <Text>Hello!</Text>
                            <TouchableOpacity onPress={this._toggleModal}>
                                <Text>Hide me!</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    : <View />} */}
                {/* </Modal> */}
                {/* <KeepAwake /> */}
                <View style={{ flex: 0.2, paddingTop: height * 1 / 30 }}>
                    <Text style={{ fontSize: fontScale * 30, color: '#000066', alignSelf: 'center' }}>Pleasure Or Displeasure</Text>
                </View>
                <View style={smilyeContainerStyle}>

                    <SmileyButton

                        smilyeImage={smilyeImages.happy}
                        text='Satisfied'
                        onPress={() => {
                            this._toggleModal("satisfied", smilyeImages.happy, 'Thankyou for your response, we always wants our customer to be happy and more satisfied');
                            this.setCounter()
                        }}
                    />

                    <SmileyButton

                        smilyeImage={smilyeImages.moderate}
                        text='Moderate'
                        onPress={() => {
                            this._toggleModal("moderate", smilyeImages.moderate, 'Thankyou for your response, next time you will be more satisfied then now.');
                            this.setCounter()
                        }}
                    />

                    <SmileyButton

                        smilyeImage={smilyeImages.sad}
                        text='Sad'
                        onPress={() => {
                            this._toggleModal("sad", smilyeImages.sad, 'Can You Please submit the reason for your dissatisfaction?');
                            this.setCounter()
                        }}
                    />
                </View>
                <View style={{ flex: 0.2 }}>
                    <Text style={{ fontSize: fontScale * 20, color: '#0066ff', alignSelf: 'center', paddingTop: height * 1 / 20 }}>Please Rate Our Service!!!</Text>
                </View>
            </View >
        )

    }
}

const styles = {
    containerStyle: {
        // flex: 1,
        height,
        width,
        alignItems: 'center',
        // justifyContent: 'center',
        flexWrap: 'wrap',
        backgroundColor: '#e6ffff'
    },
    smilyeContainerStyle: {
        flex: 0.6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        aliginSelf: 'center',
        paddingRight: width * 1 / 30,
        paddingLeft: width * 1 / 30
    },
}

const mapStateToProps = (state) => {
    const { image, text, iconButton, loading } = state.smiley;
    return { image, text, iconButton, loading };
}

const mapDispatchToProps = (dispatch) => {
    // return{
    //     smileyReaction : () => dispatch(),
    // }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Main);
export default Main;