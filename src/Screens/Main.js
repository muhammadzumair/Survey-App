import React, { Component } from 'react';
import { View, StatusBar, Text, Dimensions, Animated, BackHandler, ToastAndroid, Image,PixelRatio } from 'react-native';
import { SmileyButton } from '../Components';
import { connect } from 'react-redux';
import Tts from 'react-native-tts';
import Modal from '../Components/Modal';
import AngryModal from '../Components/AngryModal';
import KeepAwake from 'react-native-keep-awake';
const { width, height, fontScale, scale } = Dimensions.get('window');


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            angryisVisible: false,
            image: '',
            text: '',
            audioText: '',
            userResponse: ''
        }
    }

    count = 0;
    timmerRef = {};
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    setDefault = () => {
        this.setState({ isVisible: false, angryisVisible: false });
        clearTimeout(this.timmerRef);

    }
    navigateToForm = () => {
        this.props.navigation.navigate("surveyForm");
    }

    setAngryisVisibleTrue = (image, text, audioText, userResponse) => {
        this.setState({ angryisVisible: true, image, text, audioText, userResponse });
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
    setisVisibleTrue = (image, text, audioText, userResponse) => {
        this.setState({ isVisible: true, image, text, audioText, userResponse });
        setTimeout(() => {
            this.setState({ isVisible: false, angryisVisible: false });
        }, 15000);
    }
    toggleisVisible = () => {
        this.setState({ isVisible: false, angryisVisible: false });
    }

    render() {
        this.props.isError ? ToastAndroid.show(this.props.errorMessage) : null
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
                {
                    this.state.angryisVisible ?
                        <AngryModal userResponse={this.state.userResponse} toggleisVisible={this.toggleisVisible} setDefault={this.setDefault} text={this.state.text} smilyeImage={this.state.image} audioText={this.state.audioText} navigateToForm={this.navigateToForm} />
                        :
                        this.state.isVisible ?
                            <Modal userResponse={this.state.userResponse} toggleisVisible={this.toggleisVisible} setDefault={this.setDefault} text={this.state.text} smilyeImage={this.state.image} audioText={this.state.audioText} navigateToForm={this.navigateToForm} />
                            :
                            null
                }
                <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'flex-start', width: width }}>
                    <View style={{ flex: 0.1 }}>
                    {
                            PixelRatio.get() === 1 ?
                                <Image width={width * 1 / 40} source={require("../../assets/ico/mdpi/icon.png")} />
                                :
                                PixelRatio.get() === 1.5 ?
                                    <Image width={width * 1 / 40} source={require("../../assets/ico/hdpi/icon.png")} />
                                    :
                                    PixelRatio.get() === 2 ?
                                        <Image width={width * 1 / 40} source={require("../../assets/ico/xhdpi/icon.png")} />
                                        :
                                        PixelRatio.get() === 3 ?
                                            <Image width={width * 1 / 40} source={require("../../assets/ico/xxhdpi/icon.png")} />
                                            :
                                            <Image width={width * 1 / 40} source={require("../../assets/ico/xxxhdpi/icon.png")} />
                        }
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.9 }}>
                        <Text style={{ fontFamily: 'Lato-BoldItalic', fontSize: fontScale * 30, color: '#000066', alignSelf: 'center' }}>Please Rate Our Service!!!</Text>
                    </View>
                </View>
                <View style={smilyeContainerStyle}>
                    <SmileyButton
                        onPress={() => this.setisVisibleTrue(
                            smilyeImages.happy,
                            'Thankyou for your response, we always wants our customers to be happy and more satisfied',
                            'Thankyou for your response, we always wants our customers to be happy and more satisfied',
                            'satisfied'
                        )}
                        smilyeImage={smilyeImages.happy}
                        text='Satisfied'

                    />

                    <SmileyButton
                        onPress={() => this.setisVisibleTrue(
                            smilyeImages.moderate,
                            'Thankyou for your response, next time you will be more satisfied then now.',
                            'Thankyou for your response, next time you will be more satisfied then now.',
                            'moderat'
                        )}
                        smilyeImage={smilyeImages.moderate}
                        text='Moderate'

                    />

                    <SmileyButton
                        onPress={() => this.setAngryisVisibleTrue(
                            smilyeImages.sad,
                            'Please submit the reason',
                            'Can You Please submit the reason for your dissatisfaction?',
                            'angry'
                        )}
                        smilyeImage={smilyeImages.sad}
                        text='Dissatisfied'

                    />
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
        backgroundColor: '#ecf0f1'
    },
    smilyeContainerStyle: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: height * 1 / 20
        // alignItems: 'center'
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
// export default Main;