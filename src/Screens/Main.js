import React, { Component } from 'react';
import { View, StatusBar, Text, Dimensions, Animated, BackHandler } from 'react-native';
import { SmileyButton } from '../Components';
import { connect } from 'react-redux';
import Tts from 'react-native-tts';
import  Modal  from '../Components/Modal';
import { AngryModal } from '../Components/AngryModal';
import KeepAwake from 'react-native-keep-awake';
const { width, height, fontScale, scale } = Dimensions.get('window');


class Main extends Component {
    state = {
        isVisible: false,
        angryisVisible: false,
        image: '',
        text: '',
        audioText: ''
    }
    count = 0;
    timmerRef = {};
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    setDefault = () =>{
        this.setState({isVisible: false, angryisVisible: false});
        clearTimeout(this.timmerRef);
        
    }

    setAngryisVisibleTrue = (image, text, audioText) => {
        this.setState({ angryisVisible: true, image, text, audioText });
        this.timmerRef = setTimeout(() => {
            this.setState({ isVisible: false, angryisVisible: false });
        }, 15000);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        return true;
    }
    setisVisibleTrue = (image, text, audioText) => {
        this.setState({ isVisible: true, image, text, audioText });
        setTimeout(() => {
            this.setState({ isVisible: false, angryisVisible: false });
        }, 15000);
    }
    toggleisVisible = () => {
        this.setState({ isVisible: false, angryisVisible: false });
    }

    render() {
        const { containerStyle, smilyeContainerStyle } = styles;
        const smilyeImages = {
            happy: require('../../assets/happy.png'),
            sad: require('../../assets/__sad.png'),
            moderate: require('../../assets/moderate.png'),
        }
        console.log(this.state.isModalVisible);
        return (
            <View style={containerStyle}>
                <KeepAwake />
                <StatusBar hidden />
                <KeepAwake />

                {
                    this.state.angryisVisible ?
                        <AngryModal toggleisVisible={this.toggleisVisible} setDefault = {this.setDefault} text={this.state.text} smilyeImage={this.state.image} audioText={this.state.audioText} />
                        :
                        this.state.isVisible ?
                            <Modal toggleisVisible={this.toggleisVisible} setDefault = {this.setDefault} text={this.state.text} smilyeImage={this.state.image} audioText={this.state.audioText} />
                            :
                            null
                }
                <View style={{ flex: 0.2, paddingTop: height * 1 / 30 }}>
                    <Text style={{ fontSize: fontScale * 30, color: '#000066', alignSelf: 'center' }}>Pleasure Or Displeasure</Text>
                </View>
                <View style={smilyeContainerStyle}>
                    <SmileyButton
                        onPress={() => this.setisVisibleTrue(
                            smilyeImages.happy,
                            'Thankyou for your response, we always wants our customers to be happy and more satisfied',
                            'Thankyou for your response, we always wants our customers to be happy and more satisfied'
                        )}
                        smilyeImage={smilyeImages.happy}
                        text='Satisfied'
                        
                    />

                    <SmileyButton
                        onPress={() => this.setisVisibleTrue(
                            smilyeImages.moderate,
                            'Thankyou for your response, next time you will be more satisfied then now.',
                            'Thankyou for your response, next time you will be more satisfied then now.'
                        )}
                        smilyeImage={smilyeImages.moderate}
                        text='Moderate'
                        
                    />

                    <SmileyButton
                        onPress={() => this.setAngryisVisibleTrue(
                            smilyeImages.sad,
                            'Can You Please submit the reason for your dissatisfaction?',
                            'Can You Please submit the reason for your dissatisfaction?'
                        )}
                        smilyeImage={smilyeImages.sad}
                        text='Sad'
                        
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